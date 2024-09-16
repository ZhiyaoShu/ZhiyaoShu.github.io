interface Page {
  url: string;
  lastModified: string;
}

export const baseUrl = "https://localhost:3000";

export default async function sitemap() {
  const pages: Page[] = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
    },
  ];

  const sitemapContent = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page: Page) => {
          return `
          <url>
            <loc>${page.url}</loc>
            <lastmod>${page.lastModified}</lastmod>
          </url>`;
        })
        .join("")}
    </urlset>
  `;

  return new Response(sitemapContent, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
