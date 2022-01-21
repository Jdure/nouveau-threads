const gql = String.raw

export const header = {
    'Content-Type': 'application/graphql',
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
}

export function formatPrice(num: number | bigint){
  return Intl.NumberFormat("en-CA", { style : "currency", currency: "CAD", minimumFractionDigits: 0}).format(num)
}

export const productDetailQuery = gql`
query SingleProduct($handle: String) {
  product(handle: $handle) {
    id
    title
    description
    priceRange {
      minVariantPrice {
        amount
      }
    }
    featuredImage{
      url
      altText
    }
  }
}`

export const productsQuery = gql`
query Products {
  products(first:12){
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




            