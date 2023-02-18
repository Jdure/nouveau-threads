/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com", "source.unsplash.com"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    SHOPIFY_STORE_API_URL: process.env.SHOPIFY_STORE_API_URL,
  },
};