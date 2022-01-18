

export const header = {
    'Content-Type': 'application/graphql',
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
}

export const queryData = `
query Products {
  products(first:9){
    edges {
      node {
        id
        handle
        title
        featuredImage {
          url
          altText
        }
        priceRange{
          minVariantPrice{
            amount
          }
        }
      }
    }
  }
}
            `