"use client";

import { useEffect, useState } from "react";
import { US_STATES_PATH } from "./usStates";
import { STOPS, POIS, ROUTE } from "./mapData";

export default function RouteMap() {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Highlight the markers of whichever section is currently in view.
  useEffect(() => {
    const sections = Array.from(new Set(STOPS.map((s) => s.target)))
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const jump = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox="0 0 975 610"
        role="img"
        aria-label="Map of the road trip route from Seattle to Fairfax with clickable stops"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <path d={US_STATES_PATH} fill="var(--surface-2)" stroke="var(--bg)" strokeWidth={1.1} />
        <polyline
          points={ROUTE.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2}
          strokeDasharray="7 5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.85}
        />
        {POIS.map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r={3} fill="var(--ink-3)">
              <title>{p.label}</title>
            </circle>
          </g>
        ))}
        {STOPS.map((s) => {
          const on = hovered === s.id || (hovered === null && active === s.target);
          return (
            <g
              key={s.id}
              onClick={() => jump(s.target)}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <title>{`${s.label}, ${s.st} — jump to this part of the trip`}</title>
              {/* invisible fat hit target so small circles are easy to click */}
              <circle cx={s.x} cy={s.y} r={16} fill="transparent" />
              <circle
                cx={s.x}
                cy={s.y}
                r={on ? 7 : 5}
                fill={on ? "var(--accent)" : "var(--bg)"}
                stroke="var(--accent)"
                strokeWidth={2}
                style={{ transition: "r .15s ease, fill .15s ease" }}
              />
              <text
                x={s.x + s.ldx}
                y={s.y + s.ldy}
                textAnchor={s.anchor}
                dominantBaseline="middle"
                fill={on ? "var(--ink)" : "var(--ink-2)"}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12.5,
                  fontWeight: on ? 600 : 400,
                  transition: "fill .15s ease",
                  paintOrder: "stroke",
                  stroke: "var(--bg)",
                  strokeWidth: 3,
                  strokeLinejoin: "round",
                }}
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--ink-3)",
          textAlign: "center",
          marginTop: 6,
        }}
      >
        click a stop to jump to it · small dots are detours
      </figcaption>
      {/* On narrow screens the map markers get tiny, so offer the stops as chips too. */}
      <nav className="rt-chips" aria-label="Trip stops">
        {STOPS.filter((s, i) => STOPS.findIndex((t) => t.target === s.target) === i).map((s) => (
          <button
            key={s.target}
            onClick={() => jump(s.target)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              padding: "5px 11px",
              borderRadius: 999,
              border: "1px solid var(--line)",
              background: active === s.target ? "var(--accent-soft)" : "var(--surface-2)",
              color: "var(--ink-2)",
              cursor: "pointer",
            }}
          >
            {s.label}
          </button>
        ))}
      </nav>
      <style>{`
        .rt-chips { display: none; }
        @media (max-width: 640px) {
          .rt-chips { display: flex; flex-wrap: wrap; gap: 7px; justify-content: center; margin-top: 14px; }
        }
      `}</style>
    </figure>
  );
}
