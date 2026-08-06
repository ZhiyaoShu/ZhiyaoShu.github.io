/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://zhiyaoshu.github.io',
  generateRobotsTxt: true,
  outDir: 'out', // static export lands in out/, not .next/
}