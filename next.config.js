/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_ENDPOINT_PUBLIC: process.env.API_ENDPOINT,
        WEB_HOST_PUBLIC: process.env.WEB_HOST
    },
    reactStrictMode: false,
}

module.exports = nextConfig