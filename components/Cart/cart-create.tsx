import axios from "axios";
import { useQuery } from "react-query";
import { Data, CartCreate, Cart, FetchCart } from "../../types/cart-create";
import { createCartQuery, header } from "../../utils/shopify";
const storefrontDomain = process.env.SHOPIFY_STORE_DOMAIN || ''
const storefrontApi = process.env.SHOPIFY_STORE_API_URL || ''

// 1. TODO: Create cart instance
// FIXME: Use react-query with axios


/*** 
 * TODO: 
 * 
 * 1. Create Axios instance - use react query to cache cart id
 * 2. Create a function to create a Cart
 * 3. Create a function to retrieve the Cart items
 * 4. Create a function to add an item to the Cart
 * 
 * ****/

 const shopifyCartInstance = axios.create({
    baseURL: storefrontDomain,
    headers: header
}) 

export default async function createCartID() {
    try {
        const {data: {data: {cartCreate: {cart}} }}: {data: {data: {cartCreate: {cart: Cart}} }} = await shopifyCartInstance.post(storefrontApi,{query : createCartQuery});
        const cartID = cart.id
        console.log(cartID)
        return cartID
    } catch (error) {
        console.log(error);
    }

}

// const response = await shopifyCartInstance.post(storefrontApi,{query : createCartQuery});
//         if(!response.data) {
//             throw new Error("Problem initiating cart")
//         }
//         const initCart = await response.data.data
//         console.log(initCart)
//         return initCart


