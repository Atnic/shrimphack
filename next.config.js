/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "strapi.jala.tech",
      "app.jala.tech",
      "v5.airtableusercontent.com",
      "lh3.google.com",
      "firebasestorage.googleapis.com",
      "shrimphack.com",
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
