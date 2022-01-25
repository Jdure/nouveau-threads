import useSWR from "swr";
import FetchStoreData from "../../utils/helpers";
import { createCart, header } from "../../utils/shopify";
const storeDomain = process.env.SHOPIFY_STORE_DOMAIN || ''
const storeApi = process.env.SHOPIFY_STORE_API_URL || ''

// TODO: Fetch data with fetcher

export default async function CreateCart () {
const {data, error } = useSWR('createCart')

}

