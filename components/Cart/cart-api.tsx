import { Cart } from "../../types/cart-create";
import { GetCart, Cart as Bag } from "../../types/cart-get";
import { shopifyCartInstance, storefrontApi } from "../../utils/helpers";
import {
  addCartItemQuery,
  createCartQuery,
  retrieveCartQuery,
  removeCartItemQuery,
  updateCartItemQuery,
} from "../../utils/shopify-queries";

// Initialize cart with id and checkout URL
export async function createCartID() {
  try {
    const {
      data: {
        data: {
          cartCreate: { cart },
        },
      },
    }: { data: { data: { cartCreate: { cart: Cart } } } } =
      await shopifyCartInstance.post(storefrontApi, { query: createCartQuery });
    const { id, checkoutUrl } = cart;
    return { id, checkoutUrl };
  } catch (error) {
    console.log(error);
  }
}

// Create a function to retrieve all cart items
export const retrieveCart = async (
  cartID: string | undefined
): Promise<GetCart> => {
  try {
    const response = await shopifyCartInstance.post(storefrontApi, {
      query: retrieveCartQuery,
      variables: { cartId: cartID },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Create a function to add an item to the Cart
export async function addItem(
  cartID: string | undefined,
  handle: string,
  variantID: string,
  itemQuantity: number
) {
  let addItemVariables = {
    cartId: cartID,
    lines: {
      attributes: {
        key: handle,
        value: variantID,
      },
      merchandiseId: variantID,
      quantity: itemQuantity,
    },
  };
  try {
    const {
      data: {
        data: {
          cartLinesAdd: { cart },
        },
      },
    }: { data: { data: { cartLinesAdd: { cart: Bag } } } } =
      await shopifyCartInstance.post(storefrontApi, {
        query: addCartItemQuery,
        variables: addItemVariables,
      });
    return cart;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteItem(
  cartID?: string | undefined,
  variantID?: string | undefined
) {
  let delItemVariables = {
    cartId: cartID,
    lineIds: variantID,
  };
  try {
    const {
      data: {
        data: {
          cartLinesRemove: { cart },
        },
      },
    }: { data: { data: { cartLinesRemove: { cart: Bag } } } } =
      await shopifyCartInstance.post(storefrontApi, {
        query: removeCartItemQuery,
        variables: delItemVariables,
      });
    return cart;
  } catch (error) {
    console.log(error);
  }
}

export async function updateItemQty(
  cartID?: string | undefined,
  variantID?: string,
  itemQuantity?: number
) {
  let updateItemVars = {
    cartId: cartID,
    lines: { id: variantID, quantity: itemQuantity },
  };
  try {
    const {
      data: {
        data: {
          cartLinesUpdate: { cart },
        },
      },
    }: { data: { data: { cartLinesUpdate: { cart: Bag } } } } =
      await shopifyCartInstance.post(storefrontApi, {
        query: updateCartItemQuery,
        variables: updateItemVars,
      });
    return cart;
  } catch (error) {
    console.log(error);
  }
}
