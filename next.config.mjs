/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
    },
    output: "export",
    distDir: "dist",
    transpilePackages: ['three'],
};

export default nextConfig;
