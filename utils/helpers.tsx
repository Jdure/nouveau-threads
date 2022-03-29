import { useMutation, useQuery, QueryClient } from "react-query";
import {
  retrieveCart,
  addItem,
  deleteItem,
  updateItemQty,
} from "../components/Cart/cart-api";

const axios = require("axios");

export const header = {
  "Content-Type": "application/json",
  "X-Shopify-Storefront-Access-Token":
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
};

export function formatPrice(num: number) {
  return Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
  }).format(num);
}

export default async function FetchStoreData(
  domain: string,
  api: string,
  config: object,
  query: object | string,
  variable?: object
) {
  const graphqlQuery = {
    query: query,
    variables: variable,
  };
  try {
    const response = await axios({
      method: "post",
      baseURL: domain,
      url: api,
      headers: config,
      data: graphqlQuery,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getUserCart = (id: string | undefined) =>
  useQuery(["cart-items", id], () => retrieveCart(id), {
    refetchIntervalInBackground: true,
    select: (data) => data.data.cart,
  });

export const delCartItem = (id?: string | undefined, variantId?: string) =>
  useMutation(async ({ id, variantId }) => await deleteItem(id, variantId));

export const addCartItems = (
  id: string | undefined,
  handle: string,
  variantId: string,
  quantity: number
) => useMutation(async () => await addItem(id, handle, variantId, quantity));

export const updateCartItem = (
  id?: string | undefined,
  variantId?: string,
  quantity?: number
) =>
  useMutation(
    async ({ id, variantId, quantity }) =>
      await updateItemQty(id, variantId, quantity)
  );