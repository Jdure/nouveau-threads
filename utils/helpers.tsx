import { useMutation, useQuery, QueryClient } from "react-query";
import axios from "axios";
import {
  retrieveCart,
  addItem,
  deleteItem,
  updateItemQty,
} from "../components/Cart/cart-api";
import { productsQuery } from "./shopify-queries";
// TODO: Export this object as its used in multiple places
const storefrontDomain = process.env.SHOPIFY_STORE_DOMAIN || "";
const storefrontApi = process.env.SHOPIFY_STORE_API_URL || "";
// TODO: Export this object as its used in multiple places
export const header = {
  "Content-Type": "application/json",
  "X-Shopify-Storefront-Access-Token":
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
};
// TODO: Export this object as its used in multiple places
const shopifyCartInstance = axios.create({
  baseURL: storefrontDomain,
  headers: header,
});


export function formatPrice(num: number) {
  return Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
  }).format(num);
}

//FIXME: Broken Individual Items Page - need to adjust with React Query
//TODO: Look into getStaticPaths and React Query

export const getStoreProducts = async () => {
    try {
      const response = await shopifyCartInstance.post(storefrontApi, {query: productsQuery});
      console.log(response.data);
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }; 

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