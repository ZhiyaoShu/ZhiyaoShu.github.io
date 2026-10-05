This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Search indexing

The production site is exported to GitHub Pages by `.github/workflows/nextjs.yml`.
The canonical origin is `https://zhiyaoshu.github.io`; keep `NEXT_PUBLIC_SITE_URL`
aligned with it in metadata and `next-sitemap.config.js`. The home page's metadata
and profile structured data live in `app/page.tsx`, with the interactive view in
`app/Home.tsx`. Paper metadata and citation tags live in
`app/lost-in-the-tail/layout.tsx`.

After deploying:

1. Add the **URL-prefix** property `https://zhiyaoshu.github.io/` to
   [Google Search Console](https://search.google.com/search-console/).
   For HTML-file verification, place the downloaded `google*.html` file in
   `public/` with its filename and content unchanged. The repository root is not
   published. After deployment, confirm the file is accessible at the site's
   root URL before clicking Verify; retain it in `public/` after verification.
2. If using HTML-tag verification, copy just the tag's `content` value to the
   repository's Actions variable `GOOGLE_SITE_VERIFICATION`, then rerun the Pages
   workflow and finish verification. `BING_SITE_VERIFICATION` similarly supplies
   Bing Webmaster Tools' `msvalidate.01` tag. No placeholder verification tags are
   emitted when these variables are unset.
3. Submit `https://zhiyaoshu.github.io/sitemap.xml` and use URL Inspection to request
   indexing for `/` and `/lost-in-the-tail/`.
4. Link the homepage from the author's Google Scholar, GitHub, and LinkedIn
   profiles. Link the project page from the paper's arXiv record and public code
   repository when available.

Verify the exported `out/index.html` and `out/lost-in-the-tail/index.html` have
distinct titles, descriptions, self-referencing canonical URLs, and JSON-LD.
The paper should have six separate `citation_author` tags. Both canonical URLs
must appear in the generated sitemap. Do not give unrelated pages the homepage's
canonical URL. Citation metadata and structured data help describe the content;
they do not guarantee indexing, rich results, or any search ranking.
