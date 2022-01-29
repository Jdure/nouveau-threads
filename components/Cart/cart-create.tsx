import { useQuery } from "react-query";
import { FetchCart } from "../../types/cart-create";
import FetchStoreData from "../../utils/helpers";
import { createCartQuery, header } from "../../utils/shopify";
const storeDomain = process.env.SHOPIFY_STORE_DOMAIN || ''
const storeApi = process.env.SHOPIFY_STORE_API_URL || ''

// 1. TODO: Create cart instance
// FIXME: Use react-query with axios

const fetchCartInstance = FetchStoreData(storeDomain, storeApi, header, createCartQuery)

export default async function createCartInstance () {
    const {isLoading, isSuccess, isError, data, error, refetch} = useQuery<FetchCart, Error>('myCart', fetchCartInstance )
}

