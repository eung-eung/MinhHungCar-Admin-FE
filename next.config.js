/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_ENDPOINT_PUBLIC: process.env.API_ENDPOINT,
    },
    reactStrictMode: false,
}

module.exports = nextConfig