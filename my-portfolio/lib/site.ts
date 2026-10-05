// Keep metadata URLs aligned with the canonical origin used by next-sitemap.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://zhiyaoshu.github.io"
).replace(/\/+$/, "");

export const homeTitle = "Zhiyao Shu (Zoey) | Computer Vision & Human–AI Collaboration";
export const homeDescription =
  "Zhiyao Shu (Zoey), PhD student at George Mason University, researches computer vision, visual place recognition, and human–AI collaboration. Publications and projects.";
