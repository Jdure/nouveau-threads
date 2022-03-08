const gql = String.raw

export const header = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
}

export function formatPrice(num: number ){
  return Intl.NumberFormat("en-CA", { style : "currency", currency: "CAD", minimumFractionDigits: 0}).format(num)
}

export const productDetailQuery = gql`
  query SingleProduct($handle: String) {
    product(handle: $handle) {
      id
      handle
      title
      description
      priceRange {
        minVariantPrice {
          amount
        }
      }
      featuredImage {
        url
        altText
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

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

export const createCartQuery = gql`
mutation cartCreate {
  cartCreate {
    cart {
      id
      updatedAt
      checkoutUrl
    }
    userErrors {
      code
      field
      message
    }
  }
}
`

export const retrieveCartQuery = gql`
  query RetrieveCart($cartId: ID!) {
    cart(id: $cartId) {
      createdAt
      updatedAt
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                product {
                  title
                  handle
                  featuredImage {
                    url
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
      estimatedCost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;
export const addCartItemQuery = gql`
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      lines(first:100) {
        edges{
          node{
          id
          quantity
					merchandise {
              ... on ProductVariant {
                product{
                  title
                  handle
                  featuredImage{
                    url
                  }
                }
            }
        }
      }
    }
  }
}
}
}
`