/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: "dist",
    transpilePackages: ['three'],
};

export default nextConfig;
