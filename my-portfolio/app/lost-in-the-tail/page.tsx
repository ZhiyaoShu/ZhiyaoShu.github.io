"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/* Apply Spectral serif as the display font and a custom page background across this page only. */
const PAPER_VARS = { "--font-display": "var(--font-serif)", "--bg": "#f5f7fa" } as CSSProperties;

const BIBTEX = `@inproceedings{shu2026lost,
  author    = {Zhiyao Shu and Jiacheng Yang and Yang Lu and Waishan Qiu and Chuan Li and Da Chen},
  title     = {Lost in the Tail: Addressing Geographic Imbalance in Urban Visual Place Recognition},
  booktitle = {Proceedings of the European Conference on Computer Vision (ECCV)},
  year      = {2026}
}`;

type Row = {
  method: ReactNode;
  backbone: string;
  time: string;
  timeMuted?: boolean;
  timeStrong?: boolean;
  v1: string;
  v2: string;
  variant?: "dapr" | "best";
  groupTop?: boolean; // accent-border top instead of surface-2
};

type Group = { label: string; rows: Row[] };

const star = <span style={{ color: "var(--accent)" }}>*</span>;

// Table 1, trimmed to the rows that carry the story. Full 20-row comparison lives in the paper.
const groups: Group[] = [
  {
    label: "Classification",
    rows: [
      { method: "D&C", backbone: "EfficientNet", time: "12 ms", v1: "61.0", v2: "79.1" },
      { method: "DAPR‑C", backbone: "DINOv2", time: "—", timeMuted: true, v1: "86.4", v2: "91.1", variant: "dapr", groupTop: true },
    ],
  },
  {
    label: "Retrieval",
    rows: [
      { method: "SALAD", backbone: "DINOv2", time: "4805 ms", v1: "87.6", v2: "93.5" },
      { method: <>SALAD{star}</>, backbone: "DINOv2", time: "4823 ms", v1: "88.0", v2: "94.5", variant: "dapr" },
      { method: "BoQ", backbone: "DINOv2", time: "21333 ms", v1: "83.7", v2: "92.8" },
      { method: <>BoQ{star}</>, backbone: "DINOv2", time: "21047 ms", v1: "88.8", v2: "93.7", variant: "dapr" },
    ],
  },
  {
    label: "Mixed pipeline",
    rows: [
      { method: "D&C + CosPlace", backbone: "EfficientNet", time: "30 ms", timeStrong: true, v1: "71.4", v2: "87.6" },
      { method: "DAPR‑M", backbone: "DINOv2", time: "74 ms", v1: "89.7", v2: "94.3", variant: "best", groupTop: true },
    ],
  },
];

/* Table 3 — generalization of LB loss across cities and seasons (R@1, %). */
type StatRow = { method: ReactNode; backbone: string; cells: string[]; hi?: boolean };

const generalizationCols = ["MSLS", "Pitts30k", "Nordland"];
const generalizationRows: StatRow[] = [
  { method: "CosPlace", backbone: "ResNet101", cells: ["81.7", "86.7", "41.1"] },
  { method: <>CosPlace{star}</>, backbone: "ResNet101", cells: ["82.2", "89.4", "44.6"], hi: true },
  { method: "SALAD", backbone: "DINOv2", cells: ["91.9", "92.3", "76.0"] },
  { method: <>SALAD{star}</>, backbone: "DINOv2", cells: ["92.6", "92.7", "76.6"], hi: true },
  { method: "BoQ", backbone: "DINOv2", cells: ["91.2", "92.6", "81.3"] },
  { method: <>BoQ{star}</>, backbone: "DINOv2", cells: ["93.7", "92.9", "83.7"], hi: true },
];

/* Table 4 — tail-class R@1 on the sparsely-sampled, safety-critical zones. */
type TailRow = { method: ReactNode; msls: string; pitts: string; mslsUp?: string; pittsUp?: string; hi?: boolean };
const tailRows: TailRow[] = [
  { method: "SALAD", msls: "86.49", pitts: "90.56" },
  { method: <>SALAD{star}</>, msls: "87.39", pitts: "91.19", mslsUp: "+0.90", pittsUp: "+0.63", hi: true },
  { method: "BoQ", msls: "89.64", pitts: "89.19" },
  { method: <>BoQ{star}</>, msls: "91.44", pitts: "92.56", mslsUp: "+1.80", pittsUp: "+3.37", hi: true },
];

export default function PaperPage() {
  const [toast, setToast] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The paper page has no dark mode; ensure the dark class is off here.
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  // Reveal the back-to-top button once the reader has scrolled past the hero.
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const showToast = useCallback((m: string) => {
    setToast(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 1800);
  }, []);

  const copyBib = useCallback(() => {
    try {
      navigator.clipboard
        .writeText(BIBTEX)
        .then(() => showToast("BibTeX copied"))
        .catch(() => showToast("Copy failed"));
    } catch {
      showToast("Copy failed");
    }
  }, [showToast]);

  return (
    <div
      style={{
        ...PAPER_VARS,
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--ink)",
        fontFamily: "var(--font-body)",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "color-mix(in srgb, var(--bg) 80%, transparent)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, padding: "13px 24px" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", color: "var(--ink)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-3)" }}>←</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, letterSpacing: "-.01em" }}>
              Zoey Shu
            </span>
          </a>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)" }}>ECCV 2026</span>
        </div>
      </header>

      <main style={{ ...wrap, padding: "0 24px 96px" }}>
        {/* HERO */}
        <section style={{ padding: "56px 0 8px", textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 34,
              lineHeight: 1.18,
              letterSpacing: "-.015em",
              margin: "0 auto 22px",
              maxWidth: 760,
              textWrap: "balance",
            } as CSSProperties}
          >
            Lost in the Tail: Addressing Geographic Imbalance in Urban Visual Place Recognition
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-2)", margin: "0 auto 6px", maxWidth: 760 }}>
            <Author href="https://github.com/ZhiyaoShu" name="Zhiyao Shu" n={1} />,{" "}
            <Author href="https://jia-cheng-yang.github.io/" name="Jiacheng Yang" n={2} />,{" "}
            <Author href="https://jasonyanglu.github.io/" name="Yang Lu" n={2} />,{" "}
            <Author href="https://scholar.google.com/citations?user=nrS-PX4AAAAJ&hl=en" name="Waishan Qiu" n={3} />,{" "}
            <Author href="https://scholar.google.com/citations?user=hoZesOwAAAAJ&hl=en" name="Chuan Li" n={4} />,{" "}
            <Author href="https://dachen.net/" name="Da Chen" n={5} />
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--ink-3)", margin: "0 auto 16px", maxWidth: 680 }}>
            <Aff n={1} /> George Mason University, USA &nbsp;·&nbsp; <Aff n={2} /> Xiamen University, China &nbsp;·&nbsp;{" "}
            <Aff n={3} /> University of Hong Kong, China &nbsp;·&nbsp; <Aff n={4} /> Lambda, USA &nbsp;·&nbsp;{" "}
            <Aff n={5} /> University of Bath, UK
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)", margin: "0 0 26px" }}>
            European Conference on Computer Vision (ECCV), 2026
          </p>
          <div style={{ display: "flex", gap: 9, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#" style={heroBtn}>
              Paper
            </a>
            {/* Repo still in progress — restore this link once the code is public:
            <a href="https://github.com/ZhiyaoShu/Distribution-Aware-Place-Recognition-DAPR" target="_blank" rel="noopener noreferrer" style={heroBtn}>
              Code
            </a> */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showToast("Code coming soon");
              }}
              style={heroBtn}
            >
              Code
            </a>
            <a href="https://www.youtube.com/watch?v=l11jF5Jse-Y" target="_blank" rel="noopener noreferrer" style={heroBtn}>
              Video
            </a>
          </div>
        </section>

        {/* ABSTRACT */}
        <section style={{ padding: "56px 0 0" }}>
          <h2 style={{ ...paperH2, textAlign: "center" }}>Abstract</h2>
          <p style={{ fontSize: 16, lineHeight: 1.72, color: "var(--ink-2)", margin: 0 }}>
            Urban-scale Visual Place Recognition (VPR) aims to identify the geographic location of a query image by
            matching it against a geo-tagged database. While recent methods achieve impressive performance, they
            overlook a serious long-tailed problem hidden in urban-scale datasets, which biases the model toward
            locations with abundant images and ignores less-visited areas — causing models to systematically favor
            frequently photographed locations while failing in sparsely covered ones. We systematically characterize
            this imbalance and propose <B>Distribution-Aware Place Recognition (DAPR)</B>, a model-agnostic plug-in
            framework that rebalances gradient contributions across head and tail classes. Within
            classification-retrieval pipelines, DAPR further applies a multi-scale distance search that computes
            per-class distributional compactness, providing complementary gains at the retrieval stage. On the
            large-scale SF-XL benchmark, our framework outperforms the previous classification-retrieval baseline by{" "}
            <B>18.3%</B> on test set v1 and <B>6.7%</B> on test set v2, with consistent improvements across
            representative VPR methods on SF-XL, MSLS, and Pitts30k.
          </p>
        </section>

        {/* BACKGROUND */}
        <section style={{ padding: "56px 0 0" }}>
          <h2 style={{ ...paperH2, textAlign: "center" }}>The long-tail problem in VPR</h2>
          <p style={{ fontSize: 16, lineHeight: 1.72, color: "var(--ink-2)", margin: "0 0 26px" }}>
            Visual Place Recognition (VPR) locates a query image by matching it against a geo-tagged database, either
            via global-descriptor similarity search or by framing the map as discrete classification cells — with mixed
            pipelines (e.g. D&amp;C) combining both for efficiency. Yet these methods ignore a severe long-tailed
            distribution in urban datasets: because image density tracks traffic and photographer frequency rather than
            visual richness, distinctive residential streets and low-traffic corridors stay sparsely covered. Ranking
            SF-XL classes by image count into head (top 30%), middle (40%), and tail (bottom 30%) exposes a{" "}
            <B>~300:1 imbalance</B> — head classes hold 3,000+ images while tail classes have as few as 12. Per-class
            Recall@1 falls sharply toward the tail: the classes hardest to recognize receive the least supervision.
          </p>
          <FigureCard
            src="/vpr/teaser_fig.png"
            alt="Geographic classes ranked by sample count with intra-class feature diversity and per-class Recall@1"
            caption="Geographic classes ranked by sample count (head / medium / tail). As samples drop toward the tail, intra-class feature diversity widens while per-class Recall@1 falls sharply."
            maxW={600}
          />
          <div style={{ marginTop: 18 }}>
            <FigureCard
              src="/vpr/spatial.png"
              alt="Head, middle, and tail geographic classes across San Francisco"
              caption="Head, middle, and tail classes across San Francisco (SF-XL). Frequently photographed corridors dominate major roads, while residential and peripheral areas fall into the sparse tail."
              maxW={600}
            />
          </div>
        </section>

        {/* METHOD */}
        <section style={{ padding: "56px 0 0" }}>
          <h2 style={{ ...paperH2, margin: "0 0 8px", textAlign: "center" }}>DAPR — two plug-in modules</h2>
          <p style={{ ...subtitle, textAlign: "center" }}>
            Model-agnostic: DAPR drops into existing VPR pipelines without architectural changes.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="module-grid">
            <ModuleCard
              eyebrow="Training"
              title="Low-visit Bias Loss"
              body="Rebalances gradient contributions across head and tail classes so the model stops over-fitting frequently photographed locations and learns the under-sampled ones. A drop-in replacement that needs no change to the backbone."
            />
            <ModuleCard
              eyebrow="Retrieval"
              title="Characteristic Function Distance"
              body="A multi-scale distance search that adapts similarity to each class's distributional compactness, giving complementary gains at the retrieval stage of classification-retrieval pipelines."
            />
          </div>
        </section>

        {/* FRAMEWORK */}
        <section style={{ padding: "34px 0 0" }}>
          <FigureCard
            src="/vpr/framework.png"
            alt="DAPR framework: DINO-v2 backbone with Low-visit Bias loss and multi-scale distance mixed-pipeline search"
            caption="The DAPR framework. A DINO-v2 backbone is trained with the Low-visit Bias loss across retrieval and classification heads; at inference, a multi-scale distance mixed-pipeline search re-ranks candidates with characteristic functions to return the top-K images."
            pad={18}
          />
        </section>

        {/* EXPERIMENTS — MAIN */}
        <section style={{ padding: "56px 0 0" }}>
          <h2 style={{ ...paperH2, margin: "0 0 8px", textAlign: "center" }}>Experiment results</h2>
          <p style={{ ...subtitle }}>
            On the large-scale SF-XL benchmark, DAPR-M reaches the best accuracy at a fraction of the retrieval cost,
            while the Low-visit Bias loss lifts strong VPR methods as a drop-in plug-in. SALAD
            <span style={{ color: "var(--accent)" }}>*</span> and BoQ<span style={{ color: "var(--accent)" }}>*</span>{" "}
            denote retraining with the LB loss.
          </p>

          <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <TableTag n="Table 1">Main comparison on SF-XL, test v1 / v2</TableTag>
          <div style={{ border: "1px solid var(--line)", borderRadius: 14, background: "var(--surface)", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 560, fontSize: "13.5px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)" }}>
                    <th style={{ ...th, textAlign: "left", padding: "13px 18px" }}>Method</th>
                    <th style={{ ...th, textAlign: "left" }}>Backbone</th>
                    <th style={{ ...th, textAlign: "right" }}>Infer. Time</th>
                    <th style={{ ...th, textAlign: "right" }}>R@1 v1</th>
                    <th style={{ ...th, textAlign: "right", padding: "13px 18px" }}>R@1 v2</th>
                  </tr>
                </thead>
                <tbody style={{ fontFamily: "var(--font-mono)", color: "var(--ink-2)" }}>
                  {groups.map((g, gi) => (
                    <ResultGroup key={g.label} group={g} firstGroup={gi === 0} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={caption}>
            Representative rows from the paper&rsquo;s 20-method comparison. DAPR-M (DINOv2) reaches{" "}
            <B>89.7 / 94.3</B> R@1 at 74 ms per query, over <B>60× faster</B> than full-database retrieval.
          </p>
          </div>
        </section>

        {/* EXPERIMENTS — GENERALIZATION */}
        <section style={{ padding: "56px 0 0" }}>
          <h2 style={{ ...paperH2, margin: "0 0 8px", textAlign: "center" }}>Generalization &amp; tail-class gains</h2>
          <p style={{ ...subtitle }}>
            The LB loss is method-agnostic. Dropped into CosPlace, SALAD, and BoQ, it generalizes beyond San Francisco to
            global cities, Pittsburgh, and extreme seasonal change, with the largest gains on tail classes.
          </p>

          <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <TableTag n="Table 3">Generalization across cities and seasons · R@1</TableTag>
          <StatTable cols={generalizationCols} rows={generalizationRows} />
          <p style={caption}>
            Each method retrained with the LB loss (<span style={{ color: "var(--accent)" }}>*</span>) improves on every
            benchmark. Gains are sharpest under seasonal shift on Nordland: CosPlace +3.5 and BoQ +2.4 R@1.
          </p>
          </div>

          <div style={{ marginTop: 30, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            <TableTag n="Table 4">Tail-class R@1 on small-scale benchmarks</TableTag>
            <TailTable rows={tailRows} />
            <p style={caption}>
              Recall on the sparse tail classes, the locations existing models miss most. The gains here exceed the
              overall improvement, with BoQ<span style={{ color: "var(--accent)" }}>*</span> up <B>+3.37</B> R@1 on
              Pitts30k.
            </p>
          </div>

          <div style={{ maxWidth: 600, margin: "0 auto" }}>
          {/* Two analysis plots, normalized to identical canvases, share one frame. */}
          <div
            style={{
              marginTop: 38,
              border: "1px solid var(--line)",
              borderRadius: 14,
              background: "var(--surface)",
              padding: 16,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "center" }} className="figrow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/vpr/class_gains_pair.png"
                alt="Recall gains of DAPR over D&C across head, middle, and tail classes at R@1 and R@5"
                style={{ display: "block", width: "100%", height: "auto", borderRadius: 6 }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/vpr/cfd_comparison_pair.png"
                alt="Characteristic Function Distance versus L2 retrieval across R@1, R@5, R@10 for SF-XL test v1 and v2"
                style={{ display: "block", width: "100%", height: "auto", borderRadius: 6 }}
              />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="figrow">
            <p style={caption}>
              DAPR lifts every group, but most at the sparse tail: +7.35% R@5 on tail versus +1.72% on head.
            </p>
            <p style={caption}>
              The Characteristic Function Distance lifts recall at every cutoff on both SF-XL test sets, with no extra
              training.
            </p>
          </div>
          </div>
        </section>

        {/* CONCLUSION */}
        <section style={{ padding: "56px 0 0" }}>
          <h2 style={{ ...paperH2, textAlign: "center" }}>Conclusion</h2>
          <p style={{ fontSize: 16, lineHeight: 1.72, color: "var(--ink-2)", margin: 0 }}>
            We identify and address a long-tail problem baked into urban VPR, where geographic classes follow a roughly
            300:1 image imbalance and existing models systematically fail on the under-sampled tail. DAPR answers it with
            two plug-and-play modules: a Low-visit Bias loss that rebalances gradient contributions during training, and a
            Characteristic Function Distance that adapts the retrieval metric to each class&rsquo;s distribution. Across
            SF-XL, MSLS, Pitts30k, and Nordland, DAPR drops into existing VPR pipelines and holds across backbones,
            lifting the sparse tail with no architectural changes. A natural next step is the feature-level long tail,
            where class difficulty is set by intra-class feature coherence rather than raw sample count.
          </p>
        </section>

        {/* BIBTEX */}
        <section id="bibtex" style={{ padding: "56px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={paperH2}>BibTeX</h2>
            <button onClick={copyBib} style={copyBtn}>
              Copy
            </button>
          </div>
          <pre
            style={{
              margin: 0,
              fontFamily: "var(--font-mono)",
              fontSize: "12.5px",
              lineHeight: 1.7,
              color: "var(--ink-2)",
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: "20px 22px",
              overflow: "auto",
              whiteSpace: "pre",
            }}
          >
            {BIBTEX}
          </pre>
        </section>

        <section style={{ padding: "48px 0 0", borderTop: "1px solid var(--line)", marginTop: 54 }}>
          <a href="/" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)", textDecoration: "none" }}>
            ← back to Zoey Shu
          </a>
        </section>
      </main>

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

      {/* Back to top — fades in after scrolling past the hero. */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: 26,
          right: 26,
          zIndex: 80,
          width: 42,
          height: 42,
          borderRadius: 999,
          border: "1px solid var(--line)",
          background: "color-mix(in srgb, var(--surface) 86%, transparent)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          color: "var(--ink-2)",
          fontSize: 17,
          lineHeight: 1,
          cursor: "pointer",
          boxShadow: "0 10px 26px -12px rgba(0,0,0,.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0)" : "translateY(8px)",
          pointerEvents: showTop ? "auto" : "none",
          transition: "opacity .2s ease, transform .2s ease",
        }}
      >
        ↑
      </button>

      <style>{`
        @media (max-width: 640px) {
          .module-grid { grid-template-columns: 1fr !important; }
          .figrow { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────── Sub-components ─────────────────────────── */

function Author({ href, name, n }: { href: string; name: string; n: number }) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "var(--ink)",
          textDecoration: "underline",
          textDecorationColor: "var(--accent-border)",
          textUnderlineOffset: "3px",
          fontWeight: 500,
        }}
      >
        {name}
      </a>
      <sup style={{ fontSize: ".68em", color: "var(--accent)", fontWeight: 600, marginLeft: 1 }}>{n}</sup>
    </>
  );
}

function Aff({ n }: { n: number }) {
  return <sup style={{ color: "var(--accent)", fontWeight: 600 }}>{n}</sup>;
}

function B({ children }: { children: ReactNode }) {
  return <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{children}</strong>;
}

function FigureCard({
  src,
  alt,
  caption: cap,
  pad = 20,
  maxW,
}: {
  src: string;
  alt: string;
  caption: string;
  pad?: number;
  maxW?: number; // cap the figure width and center it; omit for full-width
}) {
  return (
    <div style={{ maxWidth: maxW, margin: maxW ? "0 auto" : undefined }}>
      <div style={{ border: "1px solid var(--line)", borderRadius: 14, background: "var(--surface)", padding: pad }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={{ display: "block", width: "100%", height: "auto", borderRadius: 6 }} />
      </div>
      <p style={caption}>{cap}</p>
    </div>
  );
}

function ModuleCard({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 14, background: "var(--surface)", padding: 24 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: ".04em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 10,
        }}
      >
        {eyebrow}
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, margin: "0 0 10px", color: "var(--ink)" }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.62, color: "var(--ink-2)", margin: 0 }}>{body}</p>
    </div>
  );
}

const GAIN_GREEN = "#2f9e5f";

function TableTag({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 9, margin: "0 0 10px", flexWrap: "wrap" }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: ".04em",
          textTransform: "uppercase",
          color: "var(--accent)",
          border: "1px solid var(--accent-border)",
          background: "var(--accent-soft)",
          padding: "3px 8px",
          borderRadius: 6,
          whiteSpace: "nowrap",
        }}
      >
        {n}
      </span>
      <span style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.4 }}>{children}</span>
    </div>
  );
}

function StatTable({ cols, rows }: { cols: string[]; rows: StatRow[] }) {
  const last = cols.length - 1;
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 14, background: "var(--surface)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 480, fontSize: "13.5px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--line)" }}>
              <th style={{ ...th, textAlign: "left", padding: "13px 18px" }}>Method</th>
              <th style={{ ...th, textAlign: "left" }}>Backbone</th>
              {cols.map((c, j) => (
                <th key={c} style={{ ...th, textAlign: "right", padding: `13px ${j === last ? 18 : 14}px` }}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ fontFamily: "var(--font-mono)", color: "var(--ink-2)" }}>
            {rows.map((r, i) => {
              const ink = r.hi ? "var(--ink)" : undefined;
              const weight = r.hi ? 600 : undefined;
              return (
                <tr key={i} style={{ borderTop: "1px solid var(--surface-2)", background: r.hi ? "var(--accent-soft)" : undefined }}>
                  <td style={{ padding: "9px 18px", color: ink, fontWeight: weight }}>{r.method}</td>
                  <td style={{ padding: "9px 14px", color: ink, fontWeight: weight }}>{r.backbone}</td>
                  {r.cells.map((c, j) => (
                    <td key={j} style={{ padding: `9px ${j === last ? 18 : 14}px`, textAlign: "right", color: ink, fontWeight: weight }}>
                      {c}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TailTable({ rows }: { rows: TailRow[] }) {
  const numCell = (v: string, up: string | undefined, hi: boolean | undefined, rightPad: number) => (
    <td style={{ padding: `9px ${rightPad}px`, textAlign: "right", color: hi ? "var(--ink)" : undefined, fontWeight: hi ? 600 : undefined }}>
      {v}
      {up && <span style={{ color: GAIN_GREEN, fontWeight: 600, marginLeft: 6, fontSize: "0.84em" }}>{up}</span>}
    </td>
  );
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 14, background: "var(--surface)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 420, fontSize: "13.5px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--line)" }}>
              <th style={{ ...th, textAlign: "left", padding: "13px 18px" }}>Method</th>
              <th style={{ ...th, textAlign: "right" }}>MSLS&nbsp;R@1</th>
              <th style={{ ...th, textAlign: "right", padding: "13px 18px" }}>Pitts30k&nbsp;R@1</th>
            </tr>
          </thead>
          <tbody style={{ fontFamily: "var(--font-mono)", color: "var(--ink-2)" }}>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid var(--surface-2)", background: r.hi ? "var(--accent-soft)" : undefined }}>
                <td style={{ padding: "9px 18px", color: r.hi ? "var(--ink)" : undefined, fontWeight: r.hi ? 600 : undefined }}>{r.method}</td>
                {numCell(r.msls, r.mslsUp, r.hi, 14)}
                {numCell(r.pitts, r.pittsUp, r.hi, 18)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ResultGroup({ group, firstGroup }: { group: Group; firstGroup: boolean }) {
  return (
    <>
      <tr>
        <td
          colSpan={5}
          style={{
            padding: firstGroup ? "11px 18px 5px" : "14px 18px 5px",
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontWeight: 500,
            color: "var(--ink-3)",
            fontSize: 12,
            letterSpacing: ".02em",
            textTransform: "uppercase",
            borderTop: firstGroup ? undefined : "1px solid var(--line)",
          }}
        >
          {group.label}
        </td>
      </tr>
      {group.rows.map((r, i) => {
        const isBest = r.variant === "best";
        const bg =
          r.variant === "best"
            ? "color-mix(in srgb, var(--accent-soft) 60%, var(--accent) 8%)"
            : r.variant === "dapr"
            ? "var(--accent-soft)"
            : undefined;
        const borderTop = "1px solid " + (r.groupTop ? "var(--accent-border)" : "var(--surface-2)");
        const cellPad = isBest ? "11px" : "9px";
        const isDapr = r.variant === "dapr" || isBest;
        const inkColor = isDapr ? "var(--ink)" : undefined;
        const weight = isBest ? 600 : undefined;
        return (
          <tr key={i} style={{ borderTop, background: bg }}>
            <td style={{ padding: `${cellPad} 18px`, color: inkColor, fontWeight: weight }}>{r.method}</td>
            <td style={{ padding: `${cellPad} 14px`, color: inkColor, fontWeight: weight }}>{r.backbone}</td>
            <td
              style={{
                padding: `${cellPad} 14px`,
                textAlign: "right",
                color: r.timeMuted ? "var(--ink-3)" : isBest ? "var(--ink)" : r.timeStrong ? "var(--ink)" : inkColor,
                fontWeight: isBest ? 600 : r.timeStrong ? 500 : weight,
              }}
            >
              {r.time}
            </td>
            <td
              style={{
                padding: `${cellPad} 14px`,
                textAlign: "right",
                color: isBest ? "var(--accent)" : inkColor,
                fontWeight: isBest ? 700 : weight,
              }}
            >
              {r.v1}
            </td>
            <td
              style={{
                padding: `${cellPad} 18px`,
                textAlign: "right",
                color: isBest ? "var(--accent)" : inkColor,
                fontWeight: isBest ? 700 : weight,
              }}
            >
              {r.v2}
            </td>
          </tr>
        );
      })}
    </>
  );
}

/* ─────────────────────────── Style constants ─────────────────────────── */

const wrap: CSSProperties = { maxWidth: 780, margin: "0 auto" };

const paperH2: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  fontSize: 24,
  letterSpacing: "-.01em",
  margin: "0 0 16px",
};

const subtitle: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.72,
  color: "var(--ink-2)",
  margin: "0 0 24px",
};

const caption: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  color: "var(--ink-3)",
  margin: "14px 0 0",
  textAlign: "left",
};

const heroBtn: CSSProperties = {
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 500,
  color: "var(--ink)",
  border: "1px solid var(--line)",
  background: "var(--surface)",
  padding: "9px 16px",
  borderRadius: 9,
};

const th: CSSProperties = {
  padding: "13px 14px",
  fontFamily: "var(--font-body)",
  fontWeight: 600,
  color: "var(--ink)",
  fontSize: "12.5px",
};

const copyBtn: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "12.5px",
  fontWeight: 500,
  color: "var(--ink)",
  padding: "7px 14px",
  borderRadius: 8,
  border: "1px solid var(--line)",
  background: "var(--surface-2)",
  cursor: "pointer",
};
