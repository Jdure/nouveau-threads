import axios from "axios";
import { useQuery } from "react-query";
import { Data, CartCreate, Cart, FetchCart } from "../../types/cart-create";
import { createCartQuery, header, retrieveCartQuery } from "../../utils/shopify";
const storefrontDomain = process.env.SHOPIFY_STORE_DOMAIN || ''
const storefrontApi = process.env.SHOPIFY_STORE_API_URL || ''

 const shopifyCartInstance = axios.create({
    baseURL: storefrontDomain,
    headers: header
}) 

// Initialize cart with id and checkout URL
export async function createCartID() {
    try {
        const {data: {data: {cartCreate: {cart}} }}: {data: {data: {cartCreate: {cart: Cart}} }} = await shopifyCartInstance.post(storefrontApi,{query : createCartQuery});
        const {id, checkoutUrl} = cart
        return {id, checkoutUrl}
    } catch (error) {
        console.log(error);
    }

}

// Create a function to retrieve all cart items
export async function retrieveCart(cartID : string | undefined ){
    try {
        const response = await shopifyCartInstance.post(storefrontApi,{query : retrieveCartQuery, variables : {"cartID": cartID } });
        return response.data
    } catch (error) {
        console.log(error)
    }
}