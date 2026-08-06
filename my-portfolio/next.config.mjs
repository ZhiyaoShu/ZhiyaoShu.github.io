import withVideos from 'next-videos';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',           // static HTML export for GitHub Pages
    trailingSlash: true,        // emit out/<route>/index.html so Pages serves nested routes
    images: { unoptimized: true }, // no server-side image optimizer on Pages
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'bib'], // Removed 'mdx'
    webpack(config, options) {
        if (!options.isServer) {
            config.resolve.fallback.fs = false; // Prevent 'fs' module errors on client side
        }
        return config;
    },
};

export default withVideos(nextConfig);
