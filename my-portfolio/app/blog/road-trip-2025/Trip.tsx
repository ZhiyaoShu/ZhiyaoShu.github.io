"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Footer from "../../components/footer";
import RouteMap from "./RouteMap";

const PAPER_VARS = { "--font-display": "var(--font-serif)" } as CSSProperties;
const IMG_BASE = "/blog/road-trip-2025";

type Photo = { src: string; caption: string; alt: string; pos?: string };

type Section = {
  id: string;
  title: string;
  dates: string;
  paras: string[];
  photos: Photo[];
};

const SECTIONS: Section[] = [
  {
    id: "seattle-to-spokane",
    title: "Eastern Washington: Seattle to Spokane",
    dates: "Jun 20",
    paras: [
      "The first day was all eastern Washington. At Vantage the interstate drops into the Columbia River gorge, and a line of steel horses runs along the ridge above the water. Spokane was the first night's stop.",
    ],
    photos: [
      { src: "img_0180", caption: "Wild Horses Monument, Vantage", alt: "Steel horse sculptures running along a ridge against a blue sky", pos: "center bottom" },
      { src: "img_0183", caption: "Steel ponies over the Columbia", alt: "Rusted steel horse sculptures on a bluff above the Columbia River and the Vantage bridge", pos: "center bottom" },
    ],
  },
  {
    id: "montana",
    title: "Across Montana: Missoula and Bozeman",
    dates: "Jun 21–22",
    paras: [
      "I crossed Montana by way of Missoula and stopped in Bozeman, where the Cannery District keeps its old water tower.",
      "My motel was the Sapphire, a motor lodge the same family has run for fifty years. The lounge has a vintage TV and a Rock 'Em Sock 'Em set, and a framed newspaper on the wall tells the family's whole story.",
    ],
    photos: [
      { src: "img_0250", caption: "Cannery District, Bozeman", alt: "A water tower labeled Bozeman above a brick building" },
      { src: "img_0257", caption: "The Sapphire's own newspaper", alt: "A framed newspaper page about the family that has run the Sapphire Motel for fifty years" },
      { src: "img_0258", caption: "Motel lounge", alt: "A motel lounge with a vintage TV and a Rock 'Em Sock 'Em Robots game on the table" },
    ],
  },
  {
    id: "devils-tower",
    title: "Devils Tower",
    dates: "Jun 22",
    paras: [
      "Devils Tower rises out of the Wyoming grassland like something set down from another world. Bison graze in the meadow below it, and the prairie dog town along the entrance road was busier than the trail. Up close the rock splits into giant columns, with birds riding the updraft along the wall.",
    ],
    photos: [
      { src: "406e455f-01ba-4637-9e53-7d6782c8be10", caption: "Bison under the Tower", alt: "Devils Tower on the horizon with bison grazing in a green meadow" },
      { src: "img_0277", caption: "Riding the updraft", alt: "A bird soaring beside the columned rock face of Devils Tower" },
      { src: "img_0294", caption: "The local welcome committee", alt: "A prairie dog standing upright in the grass" },
    ],
  },
  {
    id: "black-hills",
    title: "The Black Hills: Deadwood, Rushmore, Crazy Horse",
    dates: "Jun 22–23",
    paras: [
      "I came into the Black Hills through Deadwood, the old gold rush town that still wears its 1870s storefronts. Mount Rushmore the next morning, first the famous view and then the trail underneath, where Washington shows up through a gap in the rocks. The gift shop sells vanilla ice cream from Thomas Jefferson's own recipe, which felt like a required purchase.",
      "A few miles away the Crazy Horse Memorial has been under carving since 1948. From the visitor center the white scale model lines up with the unfinished mountain behind it.",
    ],
    photos: [
      { src: "img_0339", caption: "The faces and the flags", alt: "Mount Rushmore behind the Avenue of Flags" },
    ],
  },
  {
    id: "badlands",
    title: "Badlands",
    dates: "Jun 23",
    paras: [
      "The Badlands loop road winds between banded rock and green prairie, and bison graze right at the roadside. The sky stayed hazy all day, which softened the whole place into pastels.",
    ],
    photos: [
      { src: "img_0403", caption: "The loop road", alt: "A road curving through eroded Badlands formations" },
      { src: "img_0409", caption: "Yellow Mounds", alt: "Banded yellow and red hills in Badlands National Park" },
      { src: "img_0376", caption: "Roadside local", alt: "A bison grazing on green prairie" },
    ],
  },
  {
    id: "corn-belt",
    title: "Into the Corn Belt: Sioux Falls to Des Moines to Peoria",
    dates: "Jun 24–25",
    paras: [
      "From Sioux Falls I followed the Missouri River down to Sioux City for coffee, then bent south to Winterset to see the covered bridges of Madison County before rolling into Des Moines.",
      "Des Moines was a surprise. The Pappajohn Sculpture Park sits right downtown, and the State Capitol looks over the city from its hill under a gold dome that is even better from the inside. East of the city I stopped in Kalona, an Amish town with hand built rocking chairs lined up on the store porch, and pushed on to Peoria for the night.",
    ],
    photos: [
      { src: "img_0419", caption: "Coffee stop, Sioux City", alt: "A cafe interior with vintage sofas and mural wallpaper" },
      { src: "c882bad4-1cb0-4aa1-b248-bd66062c7867", caption: "Covered bridge, Madison County", alt: "A red covered bridge outside Winterset, Iowa" },
      { src: "59376673-705d-4187-8bbd-45bf9eff31b1", caption: "Iowa State Capitol", alt: "The gold dome of the Iowa State Capitol behind a pioneer statue" },
      { src: "img_0467", caption: "Inside the dome", alt: "The painted interior of the Iowa State Capitol dome seen from below" },
      { src: "img_0447", caption: "Pappajohn Sculpture Park", alt: "Two carved stone head sculptures on a lawn in the sculpture park" },
    ],
  },
  {
    id: "columbus-indiana",
    title: "Columbus, Indiana",
    dates: "Jun 26–27",
    paras: [
      "Columbus, Indiana is a town of forty thousand people with an absurd concentration of modern architecture. Eliel Saarinen's First Christian Church and its brick clock tower stand across from I.M. Pei's library, and his son Eero's Miller House keeps its Alexander Girard interior intact, conversation pit and all, behind Dan Kiley's ruler straight allée of honey locusts. I spent two days just walking from one building to the next.",
    ],
    photos: [
      { src: "8c8d503b-c653-428c-b6bd-c0ce35fd315e", caption: "First Christian Church, Eliel Saarinen", alt: "A tall rectangular brick clock tower against clouds" },
      { src: "img_0526", caption: "Cleo Rogers Memorial Library", alt: "Brick wall and angled skylight inside the library" },
      { src: "img_0538", caption: "Miller House, Eero Saarinen", alt: "A low flat-roofed glass pavilion behind a hedge" },
      { src: "img_0550", caption: "The conversation pit", alt: "The Miller House sunken conversation pit with colorful pillows" },
      { src: "img_0564", caption: "Dan Kiley's allée", alt: "A straight double row of honey locust trees over a gravel path" },
      { src: "img_0573", caption: "Vines on the Cummins pergola", alt: "A vine-covered pergola casting grid shadows on a walkway" },
    ],
  },
  {
    id: "fallingwater",
    title: "Fallingwater",
    dates: "Jun 28",
    paras: [
      "I broke the long drive east with a night in Columbus, Ohio, then climbed into the Laurel Highlands of Pennsylvania for Fallingwater. Photos of the terraces do not prepare you for how low and close the rooms feel inside, stone floors and built in furniture pushing you out toward the water. After the tour I just stood at the overlook for a while, listening to Bear Run under the house.",
    ],
    photos: [
      { src: "img_0665", caption: "Fallingwater over Bear Run", alt: "Fallingwater's cantilevered terraces above the waterfall" },
      { src: "img_0658", caption: "First glimpse through the trees", alt: "Fallingwater seen through green woods from the trail" },
      { src: "img_0622", caption: "A desk with a view", alt: "A built-in desk and bookshelves beside banded windows inside Fallingwater" },
    ],
  },
  {
    id: "home",
    title: "Home: Fairfax",
    dates: "Jun 29",
    paras: [
      "A final run across the Appalachians brought me home to Fairfax. Ten days, fourteen stops, just over three thousand miles.",
    ],
    photos: [
      { src: "dmv", caption: "Back in the DMV", alt: "A small white cottage with a gray roof under tall trees" },
    ],
  },
];

export default function Trip() {
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

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
            maxWidth: 860,
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
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)" }}>Travel</span>
        </div>
      </header>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 96px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", padding: "44px 0 0" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)" }}>Summer 2025</span>
          <span style={{ color: "var(--line)" }}>·</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)" }}>Seattle → Fairfax</span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 38,
            lineHeight: 1.12,
            letterSpacing: "-.02em",
            margin: "14px 0 0",
            textWrap: "balance",
          }}
        >
          Ten Days Across the Country
        </h1>

        <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", margin: "18px 0 0" }}>
          On June 20, 2025 I set out from Seattle alone and drove to Fairfax, Virginia. Ten days,
          fourteen stops, just over three thousand miles of interstate, prairie, and detours that
          turned out to be the whole point.
        </p>

        {/* MAP */}
        <section style={{ margin: "36px 0 8px" }}>
          <RouteMap />
        </section>

        {/* SECTIONS */}
        {SECTIONS.map((sec) => (
          <section key={sec.id} id={sec.id} style={{ paddingTop: 48, scrollMarginTop: 70 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 25,
                  letterSpacing: "-.01em",
                  margin: 0,
                }}
              >
                {sec.title}
              </h2>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)" }}>{sec.dates}</span>
            </div>
            {sec.paras.map((p, i) => (
              <p key={i} style={{ fontSize: 16.5, lineHeight: 1.7, color: "var(--ink-2)", margin: "14px 0" }}>
                {p}
              </p>
            ))}
            {sec.photos.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                  gap: 14,
                  marginTop: 20,
                }}
              >
                {sec.photos.map((ph) => (
                  <figure key={ph.src} style={{ margin: 0 }}>
                    <img
                      src={`${IMG_BASE}/${ph.src}.jpg`}
                      alt={ph.alt}
                      loading="lazy"
                      onClick={() => setLightbox(ph)}
                      style={{
                        width: "100%",
                        aspectRatio: "4 / 3.2",
                        objectFit: "cover",
                        objectPosition: ph.pos ?? "center",
                        borderRadius: 12,
                        border: "1px solid var(--line)",
                        display: "block",
                        background: "var(--surface-2)",
                        cursor: "zoom-in",
                      }}
                    />
                    <figcaption
                      style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-3)", marginTop: 6 }}
                    >
                      {ph.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </section>
        ))}

        <section style={{ padding: "48px 0 0", borderTop: "1px solid var(--line)", marginTop: 56 }}>
          <a href="/" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)", textDecoration: "none" }}>
            ← back to Zoey Shu
          </a>
        </section>
        <Footer />
      </main>

      {/* LIGHTBOX — click anywhere (or Esc) to close */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label={lightbox.caption}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(6, 8, 12, .88)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: 24,
            cursor: "zoom-out",
          }}
        >
          <img
            src={`${IMG_BASE}/${lightbox.src}.jpg`}
            alt={lightbox.alt}
            style={{ maxWidth: "100%", maxHeight: "88vh", objectFit: "contain", borderRadius: 8 }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "#c8ccd4" }}>{lightbox.caption}</span>
        </div>
      )}
    </div>
  );
}
