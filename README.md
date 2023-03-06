![Nouveau Threads](https://res.cloudinary.com/dhfp2qscl/image/upload/v1678120378/portfolio/Nouveau_Threads_dn7hhe.png)

# Nouveau Threads
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/jdure/nouveau-threads)
![GitHub issues](https://img.shields.io/github/issues/Jdure/nouveau-threads)

An accessible custom e-commerce store template.

## Description

Nouveau threads is an e-commerce site I built with Next.js, Tailwind, and Shopify’s Storefront API. 

### Technologies

The website was built with the following tech stack

![Next.js](	https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)


With [Shopify's Storefront API](https://shopify.dev/docs/api/storefront) as the data layer for inventory management.

## Installation

Follow the instructions on [Getting started with the Storefront API](https://shopify.dev/docs/custom-storefronts/building-with-the-storefront-api/getting-started)

Clone the repository

```bash
git clone https://github.com/Jdure/nouveau-threads.git
```

Inside the root of the project create a env.local file, add the following Shopify API tokens

```bash
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-access-token
SHOPIFY_STORE_DOMAIN=your-shopify-domain
SHOPIFY_STORE_API_URL=your-api-url
```

In the terminal cd into the root of the repo enter npm install to install the dependencies

```bash
npm instal
```

Then npm run build, followed by npm run start to lunch the application

```bash
npm run build
npm run start
```

NOTE: **You will need to create your own content to display data from Shopify**


## Usage

To view the website visit [Nouveau Threads](https://nouveau-threads.vercel.app/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)