import withVideos from 'next-videos';

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'bib'], // Removed 'mdx'
    webpack(config, options) {
        if (!options.isServer) {
            config.resolve.fallback.fs = false; // Prevent 'fs' module errors on client side
        }
        return config;
    },
};

export default withVideos(nextConfig);
