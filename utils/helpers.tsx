import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  retrieveCart,
  addItem,
  deleteItem,
} from "../components/Cart/cart-create";

const axios = require("axios");

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
  });

// NOTE: Ignore warnings, known issue with Typescript and React Query 
export const delCartItem = (id?: string | undefined, variantId?: string) =>
  useMutation<Response, AxiosError, string, () => void>(
    ({ id, variantId }) => deleteItem(id, variantId),
    {
      onSuccess: (data) => console.log(data),
    }
  );

export const addCartItems = (
  id: string | undefined,
  handle: string,
  variantId: string,
  itemQty: number
) => useMutation(() => addItem(id, handle, variantId, itemQty));
