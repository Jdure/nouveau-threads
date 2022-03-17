import axios from "axios";
import { Cart } from "../../types/cart-create";
import {
  addCartItemQuery,
  createCartQuery,
  retrieveCartQuery,
  removeCartItemQuery,
} from "../../utils/shopify-queries";

const storefrontDomain = process.env.SHOPIFY_STORE_DOMAIN || "";
const storefrontApi = process.env.SHOPIFY_STORE_API_URL || "";
const header = {
  "Content-Type": "application/json",
  "X-Shopify-Storefront-Access-Token":
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
};

const shopifyCartInstance = axios.create({
  baseURL: storefrontDomain,
  headers: header,
});

// Initialize cart with id and checkout URL
export async function createCartID() {
  try {
    const {
      data: {
        data: {
          cartCreate: { cart },
        },
      },
    }: { data: { data: { cartCreate: { cart: Cart } } } } =
      await shopifyCartInstance.post(storefrontApi, { query: createCartQuery });
    const { id, checkoutUrl } = cart;
    return { id, checkoutUrl };
  } catch (error) {
    console.log(error);
  }
}

// Create a function to retrieve all cart items
export async function retrieveCart(cartID: string | undefined) {
  try {
    const response = await shopifyCartInstance.post(storefrontApi, {
      query: retrieveCartQuery,
      variables: { cartId: cartID },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Create a function to add an item to the Cart
export async function addItem(
  cartID: string | undefined,
  handle: string,
  variantID: string,
  itemQuantity: number
) {
  let addItemVariables = {
    cartId: cartID,
    lines: {
      attributes: {
        key: handle,
        value: variantID,
      },
      merchandiseId: variantID,
      quantity: itemQuantity,
    },
  };
  try {
    const response = await shopifyCartInstance.post(storefrontApi, {
      query: addCartItemQuery,
      variables: addItemVariables,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Create a function to delete an item in the Cart
export async function deleteItem(
  cartID?: string | undefined,
  variantID?: string | undefined
) {
  let delItemVariables = {
    cartId: cartID,
    lineIds: variantID,
  };
  try {
    const response = await shopifyCartInstance.post(storefrontApi, {
      query: removeCartItemQuery,
      variables: delItemVariables,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}