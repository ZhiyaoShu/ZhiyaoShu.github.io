/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://zhiyaoshu.github.io',
  generateRobotsTxt: true,
  trailingSlash: true,
  // Deployment time is not the last modification time of every page.
  autoLastmod: false,
  // Google ignores changefreq and priority; list the actual canonical URLs.
  transform: async (_config, path) => ({ loc: path }),
  outDir: 'out', // static export lands in out/, not .next/
};
