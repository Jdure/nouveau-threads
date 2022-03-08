import { useMutation, useQuery, useQueryClient } from "react-query";
import { retrieveCart, deleteCartItem } from "../components/Cart/cart-create";

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
    staleTime: 1000 * 30,
  });

export const delCartItem = (
  id: string | undefined,
  variantId: string | undefined
) =>
  useMutation(() => deleteCartItem(id, variantId), {
    onSuccess: () => useQueryClient().invalidateQueries(["cart-items", id]),
  }).mutate();
