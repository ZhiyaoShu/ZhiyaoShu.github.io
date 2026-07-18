"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { CSSProperties } from "react";
import Footer from "../../components/footer";

const PAPER_VARS = { "--font-display": "var(--font-serif)" } as CSSProperties;

export default function Article({
  markdown,
  date,
  readTime,
  tags,
}: {
  markdown: string;
  date: string;
  readTime: string;
  tags: string[];
}) {
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
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "13px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 18,
          }}
        >
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", color: "var(--ink)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-3)" }}>←</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, letterSpacing: "-.01em" }}>
              Zoey Shu
            </span>
          </a>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)" }}>Writing</span>
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 96px" }}>
        {/* meta line */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", padding: "44px 0 0" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)" }}>{date}</span>
          <span style={{ color: "var(--line)" }}>·</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)" }}>{readTime} read</span>
        </div>

        <article className="post">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 30 }}>
          {tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: ".02em",
                padding: "4px 10px",
                borderRadius: 999,
                border: "1px solid var(--line)",
                background: "var(--surface-2)",
                color: "var(--ink-2)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <section style={{ padding: "40px 0 0", borderTop: "1px solid var(--line)", marginTop: 48 }}>
          <a href="/" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)", textDecoration: "none" }}>
            ← back to Zoey Shu
          </a>
        </section>
        <Footer />
      </main>

      <style>{`
        .post { font-size: 16.5px; line-height: 1.7; color: var(--ink-2); }
        .post h1 {
          font-family: var(--font-display); font-weight: 600; font-size: 36px;
          line-height: 1.15; letter-spacing: -.02em; color: var(--ink);
          margin: 14px 0 0; text-wrap: balance;
        }
        .post h2 {
          font-family: var(--font-display); font-weight: 600; font-size: 24px;
          letter-spacing: -.01em; color: var(--ink); margin: 44px 0 14px;
        }
        .post h3 {
          font-family: var(--font-display); font-weight: 600; font-size: 19px;
          color: var(--ink); margin: 30px 0 10px;
        }
        .post p { margin: 16px 0; }
        .post a { color: var(--ink); text-decoration: underline; text-decoration-color: var(--accent-border); text-underline-offset: 3px; }
        .post strong { color: var(--ink); font-weight: 600; }
        .post em { font-style: italic; }
        .post ul, .post ol { margin: 16px 0; padding-left: 22px; }
        .post li { margin: 7px 0; }
        .post li::marker { color: var(--ink-3); }
        .post hr { border: none; border-top: 1px solid var(--line); margin: 40px 0; }
        .post code {
          font-family: var(--font-mono); font-size: .86em;
          background: var(--surface-2); border: 1px solid var(--line);
          border-radius: 5px; padding: 1px 5px;
        }
        .post pre {
          background: var(--surface); border: 1px solid var(--line);
          border-radius: 12px; padding: 18px 20px; overflow: auto;
          margin: 20px 0; line-height: 1.6;
        }
        .post pre code {
          font-size: 12.8px; background: none; border: none; padding: 0;
          color: var(--ink-2); white-space: pre;
        }
        .post blockquote {
          margin: 22px 0; padding: 2px 0 2px 18px;
          border-left: 2px solid var(--accent-border); color: var(--ink-3);
        }
      `}</style>
    </div>
  );
}
