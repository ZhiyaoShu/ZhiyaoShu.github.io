"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

/* ─────────────────────────── Content / data layer ───────────────────────────
   Ported verbatim from the design handoff. Edit here to update the site. */

type Publication = {
  id: number;
  title: string;
  authors: string;
  year: number;
  month: number;
  venue: string;
  venueType: "Conference" | "Workshop" | "Pre-print" | "Journal";
  status?: string;
  url?: string;
  tags: string[];
  abstract?: string;
};

type Project = {
  id: number;
  name: string;
  date: string;
  year: number;
  url?: string;
  tags: string[];
  desc: string;
};

const pubsData: Publication[] = [
  {
    id: 2,
    title:
      "Lost in the Tail: Addressing Geographic Imbalance in Urban Visual Place Recognition",
    authors:
      "Zhiyao Shu, Jiacheng Yang, Yang Lu, Waishan Qiu, Chuan Li, Da Chen",
    year: 2026,
    month: 6,
    venue: "ECCV 2026",
    venueType: "Conference",
    status: "Accepted",
    url: "/lost-in-the-tail",
    tags: ["computer vision", "visual place recognition", "long-tailed", "retrieval"],
    abstract:
      "Urban-scale Visual Place Recognition (VPR) aims to identify the geographic location of a query image by matching it against a geo-tagged database. While recent methods achieve impressive performance, they overlook a serious long-tailed problem hidden in urban-scale datasets, which biases the model towards locations with abundant images and ignores less-visited areas, causing models to systematically favor frequently photographed locations while failing in sparsely covered areas. In this paper, we systematically characterize this imbalance challenge and propose Distribution-Aware Place Recognition (DAPR), a model-agnostic plug-in framework that rebalances gradient contributions across head and tail classes. Additionally, within classification-retrieval pipelines, DAPR applies a multi-scale distance search mechanism to compute per-class distributional compactness, providing complementary gains at the retrieval stage. On the large-scale SF-XL benchmark, our framework outperforms the previous classification-retrieval baseline by 18.3% on test set v1, and 6.7% on test set v2. As a plug-in module, it achieves consistent improvements across representative VPR methods on SF-XL, MSLS, and Pitts30k, demonstrating broad generalizability across different methods and benchmarks.",
  },
  {
    id: 4,
    title:
      "When LLM Meets Hypergraph: A Sociological Analysis on Personality via Online Social Networks",
    authors: "Zhiyao Shu, Xiangguo Sun, Hong Cheng",
    year: 2024,
    month: 5,
    venue: "CIKM 2024",
    venueType: "Conference",
    url: "https://arxiv.org/abs/2407.03568",
    tags: ["hypergraph", "social network"],
    abstract:
      "Individual personalities significantly influence our perceptions, decisions, and social interactions, which is particularly crucial for gaining insights into human behavior patterns in online social network analysis. Many psychological studies have observed that personalities are strongly reflected in their social behaviors and social environments. In light of these problems, this paper proposes a sociological analysis framework for one’s personality in an environment-based view instead of individual-level data mining. Specifically, to comprehensively understand an individual’s behavior from low-quality records, we leverage the powerful associative ability of LLMs by designing an effective prompt. In this way, LLMs can integrate various scattered information with their external knowledge to generate higher-quality profiles, which can significantly improve the personality analysis performance. To explore the interactive mechanism behind the users and their online environments, we design an effective hypergraph neural network where the hypergraph nodes are users and the hyperedges in the hypergraph are social environments. We offer a useful dataset with user profile data, personality traits, and several detected environments from the real-world social platform. To the best of our knowledge, this is the first network-based dataset containing both hypergraph structure and social information, which could push forward future research in this area further. By employing the framework on this dataset, we can effectively capture the nuances of individual personalities and their online behaviors, leading to a deeper understanding of human interactions in the digital world.",
  },
  {
    id: 5,
    title:
      "Efficiency with Rigor! A Trustworthy LLM-powered Workflow for Qualitative Data Analysis",
    authors:
      "Jie Gao, Alok Prakash, Zhiyao Shu, Shun Yi Yeo, Chien-Ming Huang, Ziang Xiao, Mark Dredze",
    year: 2025,
    month: 1,
    venue: "arXiv",
    venueType: "Pre-print",
    url: "https://arxiv.org/abs/2501.00775",
    tags: ["qualitative analysis", "human-AI collaboration"],
    abstract:
      "Qualitative data analysis (QDA) emphasizes trustworthiness, requiring sustained human engagement and reflexivity. Recently, large language models (LLMs) have been applied in QDA to improve efficiency. However, their use raises concerns about unvalidated automation and displaced sensemaking, which can undermine trustworthiness. To address these issues, we employed two strategies: transparency and human involvement. Through a literature review and formative interviews, we identified six design requirements for transparent automation and meaningful human involvement. Guided by these requirements, we developed MindCoder, an LLM-powered workflow that delegates mechanical tasks, such as grouping and validation, to the system, while enabling humans to conduct meaningful interpretation. MindCoder also maintains comprehensive logs of users' step-by-step interactions to ensure transparency and support trustworthy results. In an evaluation with 12 users and two external evaluators, MindCoder supported active interpretation, offered flexible control, and produced more trustworthy codebooks. We further discuss design implications for building human-AI collaborative QDA workflows.",
  },
];

const projectsData: Project[] = [
  {
    id: 1,
    name: "Multimodal Plan Inference for Human–Robot Interaction",
    date: "May 2026",
    year: 2026,
    url: "https://drive.google.com/drive/home",
    tags: ["HRI", "multimodal", "plan inference", "computer vision"],
    desc: "A Bayesian framework that infers the intended plan of a person from multimodal cues — speech, pointing gestures, and facial expressions — so robots can interpret and act on human intent during collaborative interaction.",
  },
  {
    id: 2,
    name: "MindCoder — LLM-Supported Qualitative Analysis",
    date: "Apr 2025",
    year: 2025,
    url: "https://mindcoder.ai/",
    tags: ["full-stack", "LLM", "chain-of-thought", "HCI"],
    desc: "A full-stack tool for flexible, structured inductive qualitative analysis. Automates open coding, axial coding, and concept development with GPT-5, producing one-click reports to support insight presentation.",
  },
];

const hiddenFilterTags = new Set([
  "LLM",
  "plan inference",
  "chain-of-thought",
  "full-stack",
  "HRI",
]);

/* ─────────────────────────── Citation formatting ─────────────────────────── */

type CiteFmt = "APA" | "MLA" | "BibTeX";

function formatCite(p: Publication, fmt: CiteFmt): string {
  const url = p.url ? " " + p.url : "";
  if (fmt === "APA")
    return `${p.authors} (${p.year}). ${p.title}. ${p.venue}.${url}`;
  if (fmt === "MLA")
    return `${p.authors}. “${p.title}.” ${p.venue}, ${p.year}.${url}`;
  const last = (p.authors.split(",")[0] || "ref").trim().split(" ").pop();
  const key = (last || "ref") + p.year;
  return `@inproceedings{${key},\n  author    = {${p.authors}},\n  title     = {${p.title}},\n  booktitle = {${p.venue}},\n  year      = {${p.year}}\n}`;
}

/* ─────────────────────────── Shared style helpers ─────────────────────────── */

const chipStyle = (active: boolean): CSSProperties => ({
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  letterSpacing: ".02em",
  padding: "4px 10px",
  borderRadius: "999px",
  cursor: "pointer",
  transition: "all .15s ease",
  border: "1px solid " + (active ? "var(--accent)" : "var(--line)"),
  background: active ? "var(--accent-soft)" : "var(--surface-2)",
  color: active ? "var(--accent)" : "var(--ink-2)",
});

/* ───────────────────────────────── Page ───────────────────────────────── */

export default function Page() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [pubYear, setPubYear] = useState("");
  const [pubVenue, setPubVenue] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [citeOpenId, setCiteOpenId] = useState<number | null>(null);
  const [expandedPubId, setExpandedPubId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // theme: read persisted choice on mount, apply `dark` class to <html>
  useEffect(() => {
    let t: string | null = null;
    try {
      t = localStorage.getItem("zs_theme");
    } catch {}
    if (t === "dark" || t === "light") setTheme(t);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((s) => {
      const t = s === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("zs_theme", t);
      } catch {}
      return t;
    });
  }, []);

  // close cite popover on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (citeOpenId != null && (!target || !target.closest("article")))
        setCiteOpenId(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [citeOpenId]);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1900);
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
  };
  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const toggleTag = (tag: string) =>
    setActiveTag((s) => (s === tag ? null : tag));

  const copyCite = useCallback(
    (p: Publication, fmt: CiteFmt) => {
      const txt = formatCite(p, fmt);
      const ok = () => showToast("Citation copied · " + fmt);
      const fallback = () => {
        try {
          const ta = document.createElement("textarea");
          ta.value = txt;
          ta.style.position = "fixed";
          ta.style.top = "-9999px";
          ta.setAttribute("readonly", "");
          document.body.appendChild(ta);
          ta.select();
          const done = document.execCommand("copy");
          document.body.removeChild(ta);
          done ? ok() : showToast("Copy failed");
        } catch {
          showToast("Copy failed");
        }
      };
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(txt).then(ok).catch(fallback);
      } else {
        fallback();
      }
      setCiteOpenId(null);
    },
    [showToast]
  );

  /* ── derived ── */
  const pubs = useMemo(() => {
    const filtered = pubsData.filter(
      (p) =>
        (!pubYear || String(p.year) === pubYear) &&
        (!pubVenue || p.venueType === pubVenue) &&
        (!activeTag || p.tags.includes(activeTag))
    );
    return [...filtered].sort((a, b) =>
      sort === "newest"
        ? b.year - a.year || (b.month || 0) - (a.month || 0)
        : a.year - b.year || (a.month || 0) - (b.month || 0)
    );
  }, [pubYear, pubVenue, activeTag, sort]);

  const projects = useMemo(
    () => projectsData.filter((pr) => !activeTag || pr.tags.includes(activeTag)),
    [activeTag]
  );

  const years = useMemo(
    () =>
      Array.from(new Set(pubsData.map((p) => p.year)))
        .sort((a, b) => b - a)
        .map((y) => String(y)),
    []
  );

  const venues = useMemo(() => {
    const order = ["Conference", "Workshop", "Pre-print", "Journal"];
    const present = new Set(pubsData.map((p) => p.venueType));
    return order.filter((v) => present.has(v as Publication["venueType"]));
  }, []);

  const allTags = useMemo(() => {
    const tagCount: Record<string, number> = {};
    pubsData.forEach((p) =>
      p.tags.forEach((t) => (tagCount[t] = (tagCount[t] || 0) + 1))
    );
    projectsData.forEach((pr) =>
      pr.tags.forEach((t) => (tagCount[t] = (tagCount[t] || 0) + 1))
    );
    return Object.keys(tagCount)
      .filter((t) => !hiddenFilterTags.has(t))
      .sort((a, b) => tagCount[b] - tagCount[a] || a.localeCompare(b));
  }, []);

  const sortLabel = sort === "newest" ? "Newest first" : "Oldest first";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--ink)",
        fontFamily: "var(--font-body)",
        WebkitFontSmoothing: "antialiased",
        transition: "background .3s ease, color .3s ease",
      }}
    >
      {/* ── HEADER ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "color-mix(in srgb, var(--bg) 80%, transparent)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            maxWidth: 940,
            margin: "0 auto",
            padding: "13px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 18,
          }}
        >
          <button onClick={goTop} style={wordmarkBtn}>
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 3,
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "-.01em",
              }}
            >
              Zoey's Research
            </span>
          </button>
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button onClick={() => scrollToId("publications")} style={navBtn}>
              Publications
            </button>
            <button onClick={() => scrollToId("projects")} style={navBtn}>
              Projects
            </button>
            <button onClick={() => scrollToId("writing")} style={navBtn}>
              Writing
            </button>
            <a
              href="/Zoey-Shu-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--accent)",
                border: "1px solid var(--accent-border)",
                background: "var(--accent-soft)",
                padding: "7px 13px",
                borderRadius: 8,
                marginLeft: 6,
              }}
            >
              CV ↗
            </a>
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--line)",
                cursor: "pointer",
                fontSize: 14,
                color: "var(--ink)",
                width: 34,
                height: 34,
                borderRadius: 8,
                marginLeft: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 940, margin: "0 auto", padding: "0 24px 96px" }}>
        {/* ── HERO ── */}
        <section style={{ padding: "58px 0 8px" }}>
          <div
            style={{
              display: "flex",
              gap: 34,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.jpg"
              alt="Zoey Shu"
              style={{
                width: 130,
                height: 130,
                flex: "none",
                borderRadius: 22,
                objectFit: "cover",
                display: "block",
              }}
            />
            <div style={{ flex: 1, minWidth: 300 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11.5px",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: 12,
                }}
              >
                PhD · Information Science &amp; Technology
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 600,
                  fontSize: 42,
                  lineHeight: 1.05,
                  letterSpacing: "-.02em",
                  margin: "0 0 12px",
                }}
              >
                Zoey (Zhiyao) Shu
              </h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "var(--ink-3)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Fairfax, VA
                </span>
                <span style={{ color: "var(--line)" }}>·</span>
                <span style={metaPill}>Computer Vision</span>
                <span style={metaPill}>Human–Robot Interaction</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a
                  href="https://scholar.google.com/citations?user=IpJSNlAAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={outlinePill}
                >
                  Google Scholar <span style={{ color: "var(--ink-3)" }}>↗</span>
                </a>
                <a
                  href="https://github.com/ZhiyaoShu"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={outlinePill}
                >
                  GitHub <span style={{ color: "var(--ink-3)" }}>↗</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/zhiyao-shu-4b4b0016b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={outlinePill}
                >
                  LinkedIn <span style={{ color: "var(--ink-3)" }}>↗</span>
                </a>
                <a href="mailto:zshu2@gmu.edu" style={outlinePill}>
                  Email <span style={{ color: "var(--ink-3)" }}>↗</span>
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 34,
              display: "grid",
              gridTemplateColumns: "1.55fr 1fr",
              gap: 30,
              alignItems: "start",
            }}
            className="hero-grid"
          >
            <div>
              <p style={{ fontSize: "16.5px", lineHeight: 1.62, color: "var(--ink-2)", margin: 0 }}>
                I am a Ph.D. student in Information Science &amp; Technology at{" "}
                <a href="https://www.gmu.edu/" target="_blank" rel="noopener noreferrer" style={bioLink}>
                  George Mason University
                </a>
                , advised by{" "}
                <a href="https://alignment.lab.gmu.edu/" target="_blank" rel="noopener noreferrer" style={bioLink}>
                  Sungsoo Ray Hong
                </a>
                .
              </p>
              <p style={{ fontSize: "16.5px", lineHeight: 1.62, color: "var(--ink-2)", margin: "14px 0 0" }}>
                I work on{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>computer vision</strong> and{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>human–AI collaboration</strong>, building
                interactive systems that help autonomous agents understand and reason about what they sense and
                respond reliably in messy real-world scenarios.
              </p>
            </div>
            <div style={{ borderLeft: "2px solid var(--accent-border)", padding: "2px 0 2px 18px" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10.5px",
                  letterSpacing: ".09em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  marginBottom: 12,
                }}
              >
                Current focus
              </div>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                }}
              >
                <li style={focusItem}>
                  Multimodal reasoning and reverse plan inference in human-robot interaction
                </li>
                <li style={focusItem}>Video grounding and image retrieval</li>
                <li style={focusItem}>
                  LLM systems for collaborative sensemaking &amp; qualitative analysis
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── ACTIVE FILTER BANNER ── */}
        {activeTag && (
          <div
            style={{
              position: "sticky",
              top: 60,
              zIndex: 40,
              margin: "30px 0 -8px",
              display: "flex",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "var(--accent-soft)",
                border: "1px solid var(--accent-border)",
                color: "var(--accent)",
                padding: "7px 8px 7px 14px",
                borderRadius: 999,
                fontSize: 13,
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
                filtering · {activeTag}
              </span>
              <button
                onClick={() => setActiveTag(null)}
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  fontSize: 12,
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* ── NEWS ── */}
        <section id="news" style={{ padding: "54px 0 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
            <h2 style={sectionH2}>Recent News</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={newsRow}>
              <span style={newsDate}>Jun 2026</span>
              <p style={newsText}>
                🎉 Our paper{" "}
                <em style={{ color: "var(--ink)", fontStyle: "normal", fontWeight: 500 }}>
                  “Lost in the Tail: Addressing Geographic Imbalance in Urban Visual Place Recognition”
                </em>{" "}
                was accepted to{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>ECCV 2026</strong>.
              </p>
            </div>
            <div style={newsRow}>
              <span style={newsDate}>Aug 2025</span>
              <p style={newsText}>
                Began my PhD in Information Science &amp; Technology at George Mason University.
              </p>
            </div>
            <div style={{ ...newsRow, borderBottom: "1px solid var(--line)" }}>
              <span style={newsDate}>Mar 2025</span>
              <p style={newsText}>
                Released <strong style={{ color: "var(--ink)", fontWeight: 600 }}>MindCoder v2</strong> — generate
                full reports in one click. Try it at{" "}
                <a
                  href="https://mindcoder.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: 2 }}
                >
                  mindcoder.ai
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ── PUBLICATIONS ── */}
        <section id="publications" style={{ padding: "54px 0 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18 }}>
            <h2 style={sectionH2}>Publications</h2>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <button onClick={() => setSort((s) => (s === "newest" ? "oldest" : "newest"))} style={sortBtn}>
              <span style={{ color: "var(--ink-3)" }}>↕</span>
              {sortLabel}
            </button>
            <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
              <select value={pubYear} onChange={(e) => setPubYear(e.target.value)} style={selectStyle}>
                <option value="">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <span style={selectChevron}>▼</span>
            </div>
            <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
              <select value={pubVenue} onChange={(e) => setPubVenue(e.target.value)} style={selectStyle}>
                <option value="">All venues</option>
                {venues.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <span style={selectChevron}>▼</span>
            </div>
            <div style={{ flexBasis: "100%", height: 0 }} />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                justifyContent: "flex-start",
                width: "100%",
                marginTop: 2,
              }}
            >
              {allTags.map((t) => (
                <button key={t} onClick={() => toggleTag(t)} style={chipStyle(t === activeTag)}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {pubs.map((p) => {
              const hasVenue = !!p.venue && p.venueType !== "Pre-print";
              const urlTarget = "_blank";
              const expanded = expandedPubId === p.id;
              const citeOpen = citeOpenId === p.id;
              return (
                <article key={p.id} style={pubCard}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      marginBottom: 11,
                      flexWrap: "wrap",
                    }}
                  >
                    {hasVenue && <span style={venueBadge}>{p.venue}</span>}
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: "var(--ink-3)",
                        marginLeft: "auto",
                      }}
                    >
                      {p.year}
                    </span>
                  </div>
                  <h3 style={pubTitle}>{p.title}</h3>
                  <p style={{ fontSize: "13.5px", lineHeight: 1.5, color: "var(--ink-2)", margin: "0 0 14px" }}>
                    {p.authors}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                    {p.tags.map((t) => (
                      <button key={t} onClick={() => toggleTag(t)} style={chipStyle(t === activeTag)}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
                    {p.url && (
                      <a href={p.url} target={urlTarget} rel="noopener noreferrer" style={viewLink}>
                        View ↗
                      </a>
                    )}
                    <button onClick={() => setCiteOpenId((s) => (s === p.id ? null : p.id))} style={citeBtn}>
                      Cite
                    </button>
                    {p.abstract && (
                      <button
                        onClick={() => setExpandedPubId((s) => (s === p.id ? null : p.id))}
                        style={abstractBtn}
                      >
                        {expanded ? "Hide abstract" : "Abstract"}
                      </button>
                    )}
                    {citeOpen && (
                      <div style={citePopover}>
                        <button onClick={() => copyCite(p, "APA")} style={citeItem}>
                          APA
                        </button>
                        <button onClick={() => copyCite(p, "MLA")} style={citeItem}>
                          MLA
                        </button>
                        <button onClick={() => copyCite(p, "BibTeX")} style={citeItem}>
                          BibTeX
                        </button>
                      </div>
                    )}
                  </div>
                  {expanded && p.abstract && (
                    <p
                      style={{
                        margin: "15px 0 0",
                        paddingTop: 15,
                        borderTop: "1px solid var(--line)",
                        fontSize: "13.5px",
                        lineHeight: 1.62,
                        color: "var(--ink-2)",
                      }}
                    >
                      {p.abstract}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ padding: "54px 0 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
            <h2 style={sectionH2}>Projects</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: 14,
            }}
          >
            {projects.map((pr) => (
              <article key={pr.id} style={{ ...pubCard, display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", color: "var(--ink-3)" }}>
                    {pr.date}
                  </span>
                  {pr.url && (
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", fontSize: 12, color: "var(--accent)" }}
                    >
                      Visit ↗
                    </a>
                  )}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 18,
                    lineHeight: 1.3,
                    margin: "0 0 10px",
                    color: "var(--ink)",
                  }}
                >
                  {pr.name}
                </h3>
                <p style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--ink-2)", margin: "0 0 14px" }}>
                  {pr.desc}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto" }}>
                  {pr.tags.map((t) => (
                    <button key={t} onClick={() => toggleTag(t)} style={chipStyle(t === activeTag)}>
                      {t}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── WRITING ── */}
        <section id="writing" style={{ padding: "54px 0 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
            <h2 style={sectionH2}>Blogs</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <a
              href="/blog/weekly-research-digest-agent"
              style={{
                ...blogRow,
                borderBottom: "1px solid var(--line)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span style={blogDate}>Apr 2026</span>
              <div style={{ flex: 1 }}>
                <h3 style={blogTitle}>Building a Weekly Research Digest Agent</h3>
                <p style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--ink-2)", margin: 0 }}>
                  A couple hundred new arXiv papers land in my categories every week, and maybe a dozen are worth my
                  time. So I built an agent to find them — it scores each paper against my actual research and posts
                  the 20 best to my Discord every Monday. Serverless, and free.
                </p>
              </div>
              <span style={blogRead}>12 min</span>
            </a>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section style={{ padding: "64px 0 0" }}>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 18,
              padding: "38px 36px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 24,
                  margin: "0 0 8px",
                  color: "var(--ink)",
                }}
              >
                Let's connect
              </h2>
              <p style={{ fontSize: "14.5px", lineHeight: 1.55, color: "var(--ink-2)", margin: 0, maxWidth: 380 }}>
                Open to research collaborations.
              </p>
            </div>
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
              <a
                href="mailto:zshu2@gmu.edu"
                style={{
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#fff",
                  background: "var(--accent)",
                  padding: "10px 16px",
                  borderRadius: 9,
                }}
              >
                Email me
              </a>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 26,
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", color: "var(--ink-3)" }}>
              © 2026 Content copyrighted by Zoey (Zhiyao) Shu · All rights reserved.
            </span>
            <button
              onClick={goTop}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "11.5px",
                color: "var(--ink-3)",
              }}
            >
              back to top ↑
            </button>
          </div>
        </section>
      </main>

      {/* ── TOAST ── */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 90,
            background: "var(--ink)",
            color: "var(--bg)",
            fontSize: "13.5px",
            fontWeight: 500,
            padding: "11px 20px",
            borderRadius: 999,
            boxShadow: "0 14px 36px -12px rgba(0,0,0,.5)",
            animation: "toastUp .25s cubic-bezier(.16,.84,.44,1)",
          }}
        >
          {toast}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────── Inline style constants ─────────────────────────── */

const wordmarkBtn: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 9,
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  color: "var(--ink)",
};

const navBtn: CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: "13.5px",
  color: "var(--ink-2)",
  padding: "7px 11px",
  borderRadius: 8,
};

const metaPill: CSSProperties = {
  fontSize: 13,
  padding: "3px 10px",
  borderRadius: 999,
  background: "var(--surface-2)",
  border: "1px solid var(--line)",
  color: "var(--ink-2)",
};

const outlinePill: CSSProperties = {
  textDecoration: "none",
  fontSize: 13,
  color: "var(--ink)",
  padding: "6px 12px",
  borderRadius: 8,
  border: "1px solid var(--line)",
  background: "var(--surface)",
};

const bioLink: CSSProperties = {
  color: "var(--ink)",
  textDecorationLine: "underline",
  textDecorationColor: "var(--accent-border)",
  textUnderlineOffset: "3px",
};

const focusItem: CSSProperties = {
  fontSize: "13.5px",
  lineHeight: 1.45,
  color: "var(--ink-2)",
};

const sectionH2: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  fontSize: 26,
  letterSpacing: "-.01em",
  margin: 0,
};

const newsRow: CSSProperties = {
  display: "flex",
  gap: 20,
  padding: "14px 0",
  borderTop: "1px solid var(--line)",
};

const newsDate: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  color: "var(--accent)",
  minWidth: 84,
  paddingTop: 1,
};

const newsText: CSSProperties = {
  margin: 0,
  fontSize: "14.5px",
  lineHeight: 1.5,
  color: "var(--ink-2)",
};

const sortBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  background: "var(--surface)",
  border: "1px solid var(--line)",
  color: "var(--ink)",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: 13,
  padding: "8px 13px",
  borderRadius: 9,
};

const selectStyle: CSSProperties = {
  fontFamily: "inherit",
  fontSize: 13,
  color: "var(--ink)",
  background: "var(--surface)",
  border: "1px solid var(--line)",
  padding: "8px 30px 8px 13px",
  borderRadius: 9,
  cursor: "pointer",
  WebkitAppearance: "none",
  appearance: "none",
};

const selectChevron: CSSProperties = {
  position: "absolute",
  right: 11,
  pointerEvents: "none",
  color: "var(--ink-3)",
  fontSize: 10,
};

const pubCard: CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--line)",
  borderRadius: 14,
  padding: "20px 22px",
};

const venueBadge: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: ".03em",
  padding: "3px 9px",
  borderRadius: 6,
  background: "var(--accent-soft)",
  color: "var(--accent)",
  border: "1px solid var(--accent-border)",
};

const pubTitle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 500,
  fontSize: 19,
  lineHeight: 1.3,
  letterSpacing: "-.01em",
  margin: "0 0 8px",
  color: "var(--ink)",
};

const viewLink: CSSProperties = {
  textDecoration: "none",
  fontSize: "12.5px",
  fontWeight: 500,
  color: "var(--ink)",
  padding: "6px 13px",
  borderRadius: 8,
  border: "1px solid var(--line)",
  background: "var(--surface-2)",
};

const citeBtn: CSSProperties = {
  fontFamily: "inherit",
  fontSize: "12.5px",
  fontWeight: 500,
  color: "var(--ink)",
  padding: "6px 13px",
  borderRadius: 8,
  border: "1px solid var(--line)",
  background: "var(--surface-2)",
  cursor: "pointer",
};

const abstractBtn: CSSProperties = {
  fontFamily: "inherit",
  fontSize: "12.5px",
  fontWeight: 500,
  color: "var(--ink-2)",
  padding: "6px 13px",
  borderRadius: 8,
  border: "1px solid transparent",
  background: "none",
  cursor: "pointer",
};

const citePopover: CSSProperties = {
  position: "absolute",
  top: 42,
  left: 0,
  zIndex: 20,
  background: "var(--surface)",
  border: "1px solid var(--line)",
  borderRadius: 10,
  boxShadow: "0 16px 40px -14px rgba(0,0,0,.35)",
  padding: 5,
  minWidth: 140,
  display: "flex",
  flexDirection: "column",
};

const citeItem: CSSProperties = {
  textAlign: "left",
  fontFamily: "inherit",
  fontSize: 13,
  color: "var(--ink)",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "8px 11px",
  borderRadius: 7,
};

const blogRow: CSSProperties = {
  display: "flex",
  gap: 18,
  alignItems: "baseline",
  padding: "16px 0",
  borderTop: "1px solid var(--line)",
};

const blogDate: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  color: "var(--ink-3)",
  minWidth: 96,
};

const blogTitle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 500,
  fontSize: 17,
  margin: "0 0 5px",
  color: "var(--ink)",
};

const blogRead: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11.5px",
  color: "var(--ink-3)",
  whiteSpace: "nowrap",
};
