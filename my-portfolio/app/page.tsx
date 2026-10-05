import type { Metadata } from "next";
import Home from "./Home";
import { homeDescription, homeTitle, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: `${siteUrl}/` },
  authors: [{ name: "Zhiyao Shu", url: `${siteUrl}/` }],
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: `${siteUrl}/`,
    siteName: "Zoey's Research",
    locale: "en_US",
    type: "profile",
    firstName: "Zhiyao",
    lastName: "Shu",
    images: [{ url: "/avatar.jpg", alt: "Zhiyao Shu (Zoey)" }],
  },
  twitter: {
    card: "summary",
    title: homeTitle,
    description: homeDescription,
    images: ["/avatar.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Zoey's Research",
      alternateName: "Zhiyao Shu",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: `${siteUrl}/`,
      name: homeTitle,
      description: homeDescription,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Zhiyao Shu",
        alternateName: ["Zoey Shu", "Zoey (Zhiyao) Shu", "Zhiyao Shu (Zoey)"],
        givenName: "Zhiyao",
        familyName: "Shu",
        url: `${siteUrl}/`,
        image: `${siteUrl}/avatar.jpg`,
        description: homeDescription,
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: "George Mason University",
          url: "https://www.gmu.edu/",
        },
        sameAs: [
          "https://scholar.google.com/citations?user=IpJSNlAAAAAJ",
          "https://github.com/ZhiyaoShu",
          "https://www.linkedin.com/in/zhiyao-shu-4b4b0016b/",
        ],
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Home />
    </>
  );
}
