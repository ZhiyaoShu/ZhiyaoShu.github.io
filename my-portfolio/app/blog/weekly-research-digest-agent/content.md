# Building a Weekly Research Digest Agent

In this AI era we could develop anything that fits into our own perference, This pipeline is suitable for you if you are relied on Claude and github during your workflow. And so far, my research  video temporal reasoning and intent inference for human-robot interaction, and collect 5 categories from arXiv to push something like 150–300 new papers a week. Maybe a dozen are worth my attention. The rest is noise I still have to wade through to find the dozen.

So I built an agent to do the wading. Every Monday morning it pulls the week's papers, scores each one against a written description of what I actually work on, and posts the top 20 to a Discord channel — ranked, one-line reason attached. No server. No daemon I have to babysit. It runs on GitHub Actions for free and emails me nothing, because the output lives where I already am.

This post is both the *what* and the *how it got there*. The architecture is simple; the interesting part is the dozen small decisions that turned a script that worked once into one that runs unattended every week without me thinking about it.

## The shape of it

Three moving parts, one direction of flow:

```
GitHub Actions (cron: Monday 13:00 UTC)
        │
        ▼
  fetch candidates  ──►  arXiv API (5 categories, last 7 days)
        │
        ▼
  score each paper  ──►  Groq (llama-3.3-70b) — 0-10 + one-line reason
        │
        ▼
  rank, take top 20
        │
        ▼
  post to Discord  ──►  channel webhook
```

The whole thing is one Python file (`scripts/research.py`, ~280 lines) and one workflow YAML. That's deliberate — the less infrastructure, the less there is to rot.

## Part 1 — Pulling candidates from arXiv

The [`arxiv`](https://pypi.org/project/arxiv/) library wraps the API and handles paging and retries. I pull the 30 most recent submissions per category, keep anything from the last 7 days, and dedupe across categories (a paper cross-listed in `cs.CV` and `cs.LG` should only cost me one score).

```python
CATEGORIES = ["cs.CV", "cs.LG", "cs.AI", "cs.RO", "cs.HC"]
CANDIDATES_PER_CATEGORY = 30
LOOKBACK_DAYS = 7

client = arxiv.Client(page_size=30, delay_seconds=5.0, num_retries=5)

for cat in CATEGORIES:
    search = arxiv.Search(
        query=f"cat:{cat}",
        max_results=CANDIDATES_PER_CATEGORY,
        sort_by=arxiv.SortCriterion.SubmittedDate,
        sort_order=arxiv.SortOrder.Descending,
    )
    try:
        results = list(client.results(search))
    except arxiv.HTTPError as e:
        failed.append(cat)   # log it, keep going
        continue
    ...
```

The one thing I'd flag here: **a single flaky category should not take down the run.** arXiv's API has bad afternoons — it'll happily 503 one category while serving the other four fine. Early versions raised and died on the first failure, which meant a transient arXiv hiccup cost me the entire week's digest. Now a failed category gets appended to a `failed` list, the run continues, and the failures get reported in the digest header ("4 of 5 categories, cs.RO skipped"). Partial signal beats no signal.

## Part 2 — Scoring with an LLM (the part worth thinking about)

The obvious approach is keyword filtering. It doesn't work for me, and the reason is instructive: my interests are *defined by their boundaries*. I want multimodal LLM video grounding, but not text-to-video generation. I want intent inference for HRI, but not end-to-end "VLM-as-everything" papers — those are the competing framing, not what I'm trying to build on. I want exocentric tabletop HRI, and specifically *not* egocentric (Ego4D / EPIC-Kitchens) work, which is a different setting entirely.

You cannot express "relevant unless it's the competitor's framing" in keywords. You can express it in a paragraph. So the scorer is an LLM with a long, opinionated prompt describing both what I want and — just as important — what to penalize:

```python
RESEARCH_AREAS = """
THREAD 1 — Video temporal reasoning
  - Multimodal LLM video grounding, temporal/moment localization
  - Long-video understanding, agentic strategies on top of video models
  - RL for video reasoning, RLHF/RLAIF on multimodal LLMs

THREAD 2 — Intent inference for human-robot interaction
  - Bayesian / probabilistic inference of human intent
  - Multimodal fusion of speech + gesture + gaze + scene
  - Active perception, affordance-conditioned action priors, ToM

DO NOT MARK AS RELEVANT (penalize hard):
  - Pure NLP / text-only with no video or embodiment angle
  - Diffusion / generative / text-to-video / 3D generation
  - End-to-end VLM-as-everything without calibration or Bayesian framing
  - Egocentric anticipation (Ego4D, EPIC-Kitchens) — wrong setting
  ...
"""
```

Each paper's title and abstract go in, and the model returns one line of JSON: a 0–10 score and a sub-120-character reason. I force the format hard and parse defensively, because free-tier open models *will* occasionally wrap their JSON in a markdown fence or add a sentence of preamble:

```python
text = (text.removeprefix("```json").removeprefix("```")
            .removesuffix("```").strip())
data = json.loads(text)
score = max(0, min(10, int(data["score"])))
```

The one-line reason is the feature that earns its keep. A bare score tells me nothing; "calibrated multimodal fusion for tabletop handover intent" tells me whether to open the PDF. The digest is scannable because every entry justifies itself in nine words.

### Why Groq

I started on Hugging Face Inference Providers. I moved to [Groq](https://groq.com/), and the commit that did it (`Switch from HF Inference Providers to Groq free tier`) was the single biggest reliability jump in the project. Reasons, in order of how much they mattered:

- **A genuinely free tier that fits the job.** `llama-3.3-70b-versatile` on Groq gives ~30 requests/min and ~14,400/day. Scoring ~150 abstracts is roughly 145K tokens — comfortably inside the free daily budget. The whole digest costs me nothing.
- **OpenAI-compatible API.** No vendor SDK. It's a `requests.post` to a chat-completions endpoint. If Groq ever disappoints, swapping providers is a URL and a model string.
- **Fast enough that pacing, not latency, is the constraint** (more on that below).

For a 70B-class model judging relevance from an abstract, the quality is more than fine. I'm not asking it to do the research — I'm asking it to triage, and triage is exactly what these models are good at.

## Part 3 — Delivering to Discord

Discord is where I already live, so the digest goes there via a channel webhook — no app to open, no inbox to manage. The webhook is a single POST:

```python
def post_to_discord(webhook_url, messages):
    for msg in messages:
        requests.post(webhook_url, json={"content": msg}, timeout=30).raise_for_status()
```

The subtlety is Discord's **2000-character cap per message**. Twenty papers blow past that, so the digest gets split — but split *between whole entries, never mid-entry*. I learned this the embarrassing way (commit: `Fix Discord chunking to never split mid-entry`): cutting through an entry leaves an unclosed `**` and Discord's markdown bleeds bold across the rest of the channel. The fix is to build messages entry-by-entry and start a new one before the next entry would overflow:

```python
current = header
for i, s in enumerate(top, 1):
    entry = format_entry(i, s)            # "**3. [8/10]** Title\n  · reason\n  · <url>"
    if len(current) + 2 + len(entry) > 2000:
        messages.append(current)
        current = entry
    else:
        current = f"{current}\n\n{entry}"
messages.append(current)
```

URLs go in angle brackets (`<https://...>`) to suppress Discord's link-preview embeds — twenty unfurled arXiv cards is unreadable.

## Part 4 — The GitHub Actions workflow

This is where "agent" becomes "agent that actually runs every week without me." The whole orchestration is one YAML file:

```yaml
name: Weekly Research Digest
on:
  schedule:
    - cron: "0 13 * * 1"   # Mondays 13:00 UTC = 9 AM EDT
  workflow_dispatch:        # so I can trigger it by hand
jobs:
  digest:
    runs-on: ubuntu-latest
    timeout-minutes: 25
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12", cache: "pip" }
      - run: pip install -r scripts/requirements.txt
      - name: Fetch arXiv, score with Groq, post to Discord
        env:
          GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}
          DISCORD_WEBHOOK_URL: ${{ secrets.DISCORD_WEBHOOK_URL }}
        run: python scripts/research.py
      - name: Upload digest artifacts
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: research-${{ github.run_id }}
          path: |
            research-digest.txt
            research-raw.json
            research-failures.txt
          retention-days: 30
```

Why this, instead of a cron job on a box somewhere? I *had* it on a local daemon. GitHub Actions won for three reasons:

1. **No machine to keep alive.** My laptop sleeps; cron on a laptop is a lie. Actions' scheduler doesn't.
2. **Secrets done right.** `GROQ_API_KEY` and `DISCORD_WEBHOOK_URL` live in repo secrets, injected as env vars at runtime, never in the source. Nothing sensitive touches the repo.
3. **Free observability.** Every run uploads three artifacts even on failure (`if: always()`): the rendered digest, the raw scored JSON, and a failures file. When something looks off, I download the JSON and see exactly what the model scored and why — no need to reproduce locally.

Two honest caveats about Actions' cron: it fires in UTC (so my "9 AM" drifts an hour at daylight-saving boundaries — I just accept it), and the scheduler can lag by several minutes under load. For a weekly digest, neither matters. `workflow_dispatch` is there for when I want to force a run.

## The development process — what the commit log actually looks like

The first version worked on the first try and was *useless in production*, because "works once on my machine" and "runs unattended for months" are different programs. The git history is an honest record of closing that gap:

- **`Add weekly research digest workflow`** — the naive version. Fetch, score, post.
- **`Fix model name + add startup probe + verbose HTTP errors`** — I was burning 15 minutes fetching and scoring only to fail at the *post* step on a bad model string. So now there's a one-shot probe at startup that fails loudly *before* any real work if the model or auth is wrong.
- **`Diagnostic: failure tally, sample dump, early abort, rate-limit pacing`** — the unglamorous core. Count every outcome by type (`ok` / `http_429` / `network` / `parse`), keep the first few failure samples, and **abort after 15 consecutive failures** instead of grinding through 150 doomed requests.
- **`Switch from HF Inference Providers to Groq free tier`** — the provider pivot. Reliability and cost, solved together.
- **`Fix Discord chunking to never split mid-entry`** — the markdown-bleed bug.
- **`Sharper RESEARCH_AREAS + pacing for longer prompt`** — better prompt, but the longer prompt pushed token-per-request up, which tightened the rate-limit math (below).
- **`Tolerate per-category arXiv failures`** — partial digest beats no digest.

If there's one lesson threaded through all of it: **the failure modes are the product.** The happy path took an afternoon. Everything since has been about what happens when arXiv is down, the model returns garbage, or I hit a rate limit at paper 90 of 150.

### The rate-limit math, made explicit

This is the constraint that shapes the whole run, so it's worth showing the arithmetic. Groq's free tier caps `llama-3.3-70b` at ~30 requests/min *and* ~12K tokens/min. My long prompt plus an abstract is ~1,200 tokens per request, so the **token** limit binds first: 12,000 ÷ 1,200 ≈ 10 requests/min → one every 6 seconds.

```python
INTER_REQUEST_DELAY_SEC = 6.0     # TPM, not RPM, is the binding constraint
```

150 papers × 6s ≈ 15 minutes, which is why the workflow timeout is 25 (margin for the arXiv fetch and a retry or two). When a 429 sneaks through anyway, I honor the `Retry-After` header once before giving up on that paper:

```python
if resp.status_code == 429:
    wait = float(resp.headers.get("retry-after", "3"))
    time.sleep(min(wait, 20.0))
    resp = _post()   # one retry, then move on
```

One paper isn't worth blocking the digest. Drop it, tally it, keep going.

## Where the Discord bot fits

The webhook above is one-way: agent → channel. But the same Discord channel is also wired to an interactive bot (I run a local Claude Code stack), and that two-way layer is what makes the whole thing feel less like cron and more like an assistant:

- **The digest channel is also a journal.** Between digests I just type into it — "todo: read the GR-1 paper," "done with the fusion baseline." A separate daily-briefing workflow reads those messages back via the Discord API and folds them into a morning brief. The channel I *receive* research in is the same channel I *think out loud* in.
- **The bot shares one session.** Heartbeat, cron jobs, Telegram, and Discord messages all run against a single Claude Code session, so context carries across surfaces.

The research digest doesn't strictly need the bot — the webhook is self-sufficient. But putting the automated output and my manual notes in the same place is what turns a feed into a workflow.
