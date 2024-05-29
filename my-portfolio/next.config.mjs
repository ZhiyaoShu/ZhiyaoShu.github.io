import withVideos from 'next-videos';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
        return config;
    }
};

export default withVideos(nextConfig);

