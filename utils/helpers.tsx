import { AxiosError } from "axios";
import React from "react";
import { useMutation, useQuery, QueryClient } from "react-query";
import {
  retrieveCart,
  addItem,
  deleteItem,
} from "../components/Cart/cart-create";
import { Cart, Data, GetCart } from "../types/cart-get";

const axios = require("axios");
const queryClient = new QueryClient();

type Variables = {
  id: string;
  variantId: string;
};

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
  useQuery<GetCart, ErrorConstructor>(
    ["cart-items", id],
    () => retrieveCart(id),
    {
      refetchIntervalInBackground: true,
      refetchInterval: (data) =>
        data?.data.cart.lines.edges.length > 0 ? 2500 : undefined,
    }
  );

// NOTE: Ignore warnings, known issue with Typescript and React Query
export const delCartItem = (id?: string | undefined, variantId?: string) =>
  useMutation<Cart, ErrorConstructor, Variables, string>(
    ({ id, variantId }) => deleteItem(id, variantId),
    {
      onMutate: ({ id, variantId }) => {
        queryClient.invalidateQueries("cart-items");
      },
    }
  );

export const addCartItems = (
  id: string | undefined,
  handle: string,
  variantId: string,
  itemQty: number
) => useMutation(() => addItem(id, handle, variantId, itemQty));
