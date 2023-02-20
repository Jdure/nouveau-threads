import Link from "next/link";
import React from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { delCartItem, formatPrice, updateCartItem } from "../../utils/helpers";
import { deleteItem, updateItemQty } from "./cart-api";

interface CartItemProps {
  itemTitle: string;
  itemHandle: string;
  itemImg: string;
  itemPrice: string;
  itemId: string;
  itemQty: number;
  cartID: string | undefined;
  refetchItem: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult>;
}

export default function CartItem({
  itemTitle,
  itemHandle,
  itemImg,
  itemPrice,
  itemId,
  itemQty,
  cartID,
  refetchItem,
}: CartItemProps) {
  const delProduct = delCartItem();
  const updateProduct = updateCartItem();
  return (
    <li key={itemHandle} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={itemImg}
          alt={itemHandle}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <Link key={itemHandle} href={`/product/${itemHandle}`}>
              <h3>
                <a href="#">{itemTitle}</a>
              </h3>
            </Link>
            <p className="ml-4">{formatPrice(parseInt(itemPrice))}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">Product Colour</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="inline-flex">
            <button
              className="text-gray-500 font-bold py-0 px-4 rounded-l"
              onClick={(e) => {
                e.preventDefault();
                updateItemQty(cartID, itemId, itemQty + 1)
                // updateProduct.mutate(
                //   {
                //     id: cartID,
                //     variantId: itemId,
                //     quantity: itemQty + 1,
                //   },
                //   {
                //     onSuccess: () => refetchItem(),
                //   }
                // );
              }}
            >
              +
            </button>
            <p className="text-gray-500">Qty {itemQty}</p>
            <button
              className="text-gray-500 font-bold py-0 px-4 rounded-r"
              onClick={(e) => {
                e.preventDefault();
                updateItemQty(cartID, itemId, itemQty - 1)
                // updateProduct.mutate(
                //   {
                //     id: cartID,
                //     variantId: itemId,
                //     quantity: itemQty - 1,
                //   },
                //   {
                //     onSuccess: () => refetchItem(),
                //   }
                // );
              }}
            >
              -
            </button>
          </div>
          <div className="flex">
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteItem(cartID, itemId)
                // delProduct.mutate(
                //   {
                //     id: cartID,
                //     variantId: itemId,
                //   },
                //   {
                //     onSuccess: () => refetchItem(),
                //   }
                // );
              }}
              type="button"
              className="font-medium text-primary hover:text-hover"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
