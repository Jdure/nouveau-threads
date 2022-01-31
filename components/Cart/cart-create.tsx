import axios from "axios";
import { useQuery } from "react-query";
import { Data, CartCreate, Cart, FetchCart } from "../../types/cart-create";
import { createCartQuery, header } from "../../utils/shopify";
const storefrontDomain = process.env.SHOPIFY_STORE_DOMAIN || ''
const storefrontApi = process.env.SHOPIFY_STORE_API_URL || ''

 const shopifyCartInstance = axios.create({
    baseURL: storefrontDomain,
    headers: header
}) 

export default async function createCartID() {
    try {
        const {data: {data: {cartCreate: {cart}} }}: {data: {data: {cartCreate: {cart: Cart}} }} = await shopifyCartInstance.post(storefrontApi,{query : createCartQuery});
        const {id, updatedAt, checkoutUrl, estimatedCost, lines} = cart
        return {id, updatedAt, checkoutUrl, estimatedCost, lines}
    } catch (error) {
        console.log(error);
    }

}
