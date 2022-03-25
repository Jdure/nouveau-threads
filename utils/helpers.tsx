import { AxiosError } from "axios";
import React from "react";
import { useMutation, useQuery, QueryClient, QueryCache } from "react-query";
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

export const getUserCart = (id: string | undefined, openCart?: boolean) =>
  useQuery(["cart-items", id], () => retrieveCart(id), {
    refetchIntervalInBackground: true,
    select: (data) => data.data.cart,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: ["data"],
    // enabled: openCart,
  });

// NOTE: Ignore warnings, known issue with Typescript and React Query
// export const delCartItem = (id?: string | undefined, variantId?: string) =>
//   useMutation<Cart, ErrorConstructor, Variables, string>(
//     ({ id, variantId }) => deleteItem(id, variantId),
//     {
//       // onMutate: async ({ id, variantId }) => {
//       //   queryClient.invalidateQueries("cart-items");
//       // },
//       onSuccess: async (data) => {
//         queryClient.setQueryData(["cart-items", id], data);
//         console.log(data);
//       },
//     }
//   );

// export const delCartItem = (id?: string | undefined, variantId?: string) =>
//   useMutation(({ id, variantId }) => deleteItem(id, variantId), {
//     onMutate: async (cart: Variables) => {
//       await queryClient.cancelQueries("cart-items");
//       const previousCart = queryClient.getQueryData<Variables>("cart-items");

//       if (previousCart != undefined)
//         queryClient.setQueryData("cart-items", {
//           ...previousCart,
//           lines: [...previousCart],
//         });
//       console.log(cart);
//       return { previousCart };
//     },

//     onError: (err, variables, context) => {
//       if (context?.previousCart) {
//         queryClient.setQueryData("cart-items", context.previousCart);
//       }
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries("cart-items");
//     },
//   });

export const delCartItem = (id?: string | undefined, variantId?: string) =>
  useMutation(async ({ id, variantId }) => await deleteItem(id, variantId), {
    onSuccess: (data: Cart) => {
      queryClient.setQueryData(["cart-items", id], data);
      console.log(data);
    },
  });

export const addCartItems = (
  id: string | undefined,
  handle: string,
  variantId: string,
  itemQty: number
) => useMutation(async () => await addItem(id, handle, variantId, itemQty));
