/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['page.tsx', 'page.ts'],
    images: {
        domains: ['img.29cm.co.kr']
    }
}

module.exports = nextConfig