import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

const title =
  "Lost in the Tail: Addressing Geographic Imbalance in Urban Visual Place Recognition";
const description =
  "Official ECCV 2026 project page for Lost in the Tail by Zhiyao Shu et al. Distribution-Aware Place Recognition (DAPR) tackles geographic imbalance in urban VPR.";
const url = `${siteUrl}/lost-in-the-tail/`;
const authors = [
  { name: "Zhiyao Shu", url: `${siteUrl}/` },
  { name: "Jiacheng Yang", url: "https://jia-cheng-yang.github.io/" },
  { name: "Yang Lu", url: "https://jasonyanglu.github.io/" },
  { name: "Waishan Qiu", url: "https://scholar.google.com/citations?user=nrS-PX4AAAAJ&hl=en" },
  { name: "Chuan Li", url: "https://scholar.google.com/citations?user=hoZesOwAAAAJ&hl=en" },
  { name: "Da Chen", url: "https://dachen.net/" },
];

export const metadata: Metadata = {
  title: { absolute: `${title} | ECCV 2026` },
  description,
  alternates: { canonical: url },
  authors,
  openGraph: {
    title,
    description,
    url,
    siteName: "Zoey's Research",
    locale: "en_US",
    type: "article",
    authors: authors.map((author) => author.url),
    images: [{
      url: "/vpr/teaser_fig.png",
      alt: "Geographic imbalance in urban visual place recognition: Lost in the Tail",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/vpr/teaser_fig.png"],
  },
  other: {
    citation_title: title,
    citation_author: authors.map((author) => author.name),
    citation_publication_date: "2026",
    citation_conference_title: "European Conference on Computer Vision (ECCV)",
    citation_abstract_html_url: url,
    citation_arxiv_id: "2607.00090",
    citation_language: "en",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "@id": `${url}#article`,
  headline: title,
  name: title,
  description,
  url,
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  inLanguage: "en",
  image: `${siteUrl}/vpr/teaser_fig.png`,
  author: authors.map((author, index) => ({
    "@type": "Person",
    ...(index === 0 ? { "@id": `${siteUrl}/#person` } : {}),
    ...author,
  })),
  isPartOf: {
    "@type": "CreativeWork",
    name: "Proceedings of the European Conference on Computer Vision (ECCV), 2026",
  },
  sameAs: "https://arxiv.org/abs/2607.00090",
  encoding: {
    "@type": "MediaObject",
    contentUrl: "https://arxiv.org/pdf/2607.00090",
    encodingFormat: "application/pdf",
  },
};

export default function PaperLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
