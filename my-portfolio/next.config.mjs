import withVideos from 'next-videos';
import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
        if (!options.isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx', 'bib'],
};

export default withVideos(withMDX(nextConfig));


