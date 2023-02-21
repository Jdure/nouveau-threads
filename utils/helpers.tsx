import { useQueryClient, useMutation, useQuery } from "react-query";
import axios from "axios";
import {
  retrieveCart,
  addItem,
  deleteItem,
  updateItemQty,
} from "../components/Cart/cart-api";
import { GetCart } from "../types/cart-get";

export const storefrontDomain = process.env.SHOPIFY_STORE_DOMAIN || "";
export const storefrontApi = process.env.SHOPIFY_STORE_API_URL || "";

export const header = {
  "Content-Type": "application/json",
  "X-Shopify-Storefront-Access-Token":
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
};

export const shopifyCartInstance = axios.create({
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

export const getStoreProducts = async (queries: string, variable?: object) => {
  try {
    const response = await shopifyCartInstance.post(storefrontApi, {
      query: queries,
      variables: variable,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserCart = (id: string | undefined) =>
  useQuery(["cart-items", id], () => retrieveCart(id), {
    refetchIntervalInBackground: true,
    select: (data) => data.data.cart,
  });

// export const delCartItem = (id?: string | undefined, variantId?: string) =>
//   useMutation(async ({ id, variantId }) => await deleteItem(id, variantId));

export const useDeleteCartItem = () =>  {
  const mutation = useMutation(async (params: {
    id: string | undefined;
    variantId: string;
  }) => {
    const {id, variantId} = params;
    await deleteItem(id, variantId);
  }
  )
  return mutation.mutate
}

export const addCartItems = (
  id: string | undefined,
  handle: string,
  variantId: string,
  quantity: number
) => useMutation(async () => await addItem(id, handle, variantId, quantity));


export const useUpdateCartItem = () => {
  const mutation = useMutation(
    async (params: {
      id: string | undefined;
      variantId: string;
      quantity: number;
    }) => {
      const { id, variantId, quantity } = params;
      await updateItemQty(id, variantId, quantity);
    }
  );

  return mutation.mutate;
};
