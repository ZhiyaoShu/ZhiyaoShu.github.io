"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/* Apply Spectral serif as the display font across this page only. */
const PAPER_VARS = { "--font-display": "var(--font-serif)" } as CSSProperties;

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

const groups: Group[] = [
  {
    label: "Classification",
    rows: [
      { method: "PlaNet", backbone: "EfficientNet", time: "12 ms", v1: "24.5", v2: "53.1" },
      { method: "HGE", backbone: "EfficientNet", time: "15 ms", v1: "27.0", v2: "56.4" },
      { method: "CPlaNet", backbone: "EfficientNet", time: "17 ms", v1: "27.4", v2: "64.1" },
      { method: "D&C", backbone: "EfficientNet", time: "12 ms", v1: "61.0", v2: "79.1" },
      { method: "DAPR‑C", backbone: "EfficientNet", time: "—", timeMuted: true, v1: "67.2", v2: "84.1", variant: "dapr" },
      { method: "DAPR‑C", backbone: "ResNet101", time: "—", timeMuted: true, v1: "68.9", v2: "85.5", variant: "dapr", groupTop: true },
      { method: "DAPR‑C", backbone: "DINOv2", time: "—", timeMuted: true, v1: "86.4", v2: "91.1", variant: "dapr", groupTop: true },
    ],
  },
  {
    label: "Retrieval",
    rows: [
      { method: "NetVLAD", backbone: "VGG16", time: "12117 ms", v1: "40.0", v2: "71.1" },
      { method: "SFRS", backbone: "VGG16", time: "12117 ms", v1: "51.2", v2: "83.1" },
      { method: "GeM", backbone: "VGG16", time: "12117 ms", v1: "21.7", v2: "43.1" },
      { method: "CosPlace", backbone: "VGG16", time: "1514 ms", v1: "64.7", v2: "83.4" },
      { method: "CosPlace", backbone: "ResNet101", time: "1488 ms", v1: "70.9", v2: "81.9" },
      { method: "SALAD", backbone: "DINOv2", time: "4805 ms", v1: "87.6", v2: "93.5" },
      { method: <>SALAD{star}</>, backbone: "DINOv2", time: "4823 ms", v1: "88.0", v2: "94.5" },
      { method: "BoQ", backbone: "DINOv2", time: "21333 ms", v1: "83.7", v2: "92.8" },
      { method: <>BoQ{star}</>, backbone: "DINOv2", time: "21047 ms", v1: "88.8", v2: "93.7" },
    ],
  },
  {
    label: "Mixed pipeline",
    rows: [
      { method: "D&C + CosPlace", backbone: "EfficientNet", time: "30 ms", timeStrong: true, v1: "71.4", v2: "87.6" },
      { method: "DAPR‑M", backbone: "EfficientNet", time: "51 ms", v1: "74.5", v2: "88.1", variant: "dapr" },
      { method: "DAPR‑M", backbone: "ResNet101", time: "54 ms", v1: "76.3", v2: "88.0", variant: "dapr", groupTop: true },
      { method: "DAPR‑M", backbone: "DINOv2", time: "74 ms", v1: "89.7", v2: "94.3", variant: "best", groupTop: true },
    ],
  },
];

export default function PaperPage() {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The paper page has no dark mode; ensure the dark class is off here.
  useEffect(() => {
    document.documentElement.classList.remove("dark");
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
            <a href="https://github.com/ZhiyaoShu/ECCV_2026_VPR" target="_blank" rel="noopener noreferrer" style={heroBtn}>
              Code
            </a>
            <a href="#bibtex" style={heroBtn}>
              BibTeX
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
          />
          <div style={{ marginTop: 18 }}>
            <FigureCard
              src="/vpr/spatial.png"
              alt="Head, middle, and tail geographic classes across San Francisco"
              caption="Head, middle, and tail classes across San Francisco (SF-XL). Frequently photographed corridors dominate major roads, while residential and peripheral areas fall into the sparse tail."
            />
          </div>
        </section>

        {/* METHOD */}
        <section style={{ padding: "56px 0 0" }}>
          <h2 style={{ ...paperH2, margin: "0 0 8px", textAlign: "center" }}>DAPR — two plug-in modules</h2>
          <p style={{ ...subtitle }}>
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
            pad={22}
          />
        </section>

        {/* EXPERIMENTS */}
        <section style={{ padding: "56px 0 0" }}>
          <h2 style={{ ...paperH2, margin: "0 0 8px", textAlign: "center" }}>Experiment results</h2>
          <p style={{ ...subtitle }}>
            Results on SF-XL test v1 and v2 across three VPR types. SALAD<span style={{ color: "var(--accent)" }}>*</span>{" "}
            and BoQ<span style={{ color: "var(--accent)" }}>*</span> denote retraining with the proposed LB loss. DAPR-M
            is the mixed pipeline with LB Loss and CFD.
          </p>
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
            Bold figures mark the best mixed-pipeline result. DAPR-M (DINOv2) reaches 89.7 / 94.3 R@1 while staying over
            60× faster than full-database retrieval methods.
          </p>
        </section>

        {/* VIDEO */}
        <section style={{ padding: "56px 0 0" }}>
          <div
            style={{
              border: "1px solid var(--line)",
              borderRadius: 14,
              background: "#000",
              overflow: "hidden",
              aspectRatio: "16 / 9",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/l11jF5Jse-Y"
              title="Lost in the Tail — overview video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ display: "block", width: "100%", height: "100%", border: 0 }}
            />
          </div>
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

      <style>{`
        @media (max-width: 640px) {
          .module-grid { grid-template-columns: 1fr !important; }
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

function FigureCard({ src, alt, caption: cap, pad = 20 }: { src: string; alt: string; caption: string; pad?: number }) {
  return (
    <>
      <div style={{ border: "1px solid var(--line)", borderRadius: 14, background: "var(--surface)", padding: pad }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={{ display: "block", width: "100%", height: "auto", borderRadius: 6 }} />
      </div>
      <p style={caption}>{cap}</p>
    </>
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
  fontSize: 15,
  lineHeight: 1.65,
  color: "var(--ink-2)",
  margin: "0 auto 22px",
  maxWidth: 680,
  textAlign: "center",
};

const caption: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  color: "var(--ink-3)",
  margin: "14px 0 0",
  textAlign: "center",
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
