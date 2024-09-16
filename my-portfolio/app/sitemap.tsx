import { NextApiRequest, NextApiResponse } from "next";

export default async function getServerSideProps(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const baseUrl = "https://localhost:3000";
  const pages = ["/", "/cv", "/contact"];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map((page) => {
        return `<url><loc>${baseUrl}${page}</loc></url>`;
      })
      .join("")}
  </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
