import Link from "next/link";
import { useReducer } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import {
  formatPrice,
  useUpdateCartItem,
  useDeleteCartItem
} from "../../utils/helpers";
import { deleteItem } from "./cart-api";

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

const reducer = (state: { quantity: number; }, action: { type: string }) => {
  switch(action.type) {
    case "increment_qty": {
      return {
        quantity: state.quantity + 1
      };
    }
    case "decrement_qty": {
        return {
          quantity: state.quantity - 1
        };
    }
  }
  throw Error("Unknown action: " + action.type)
}

export const CartItem = ({
  itemTitle,
  itemHandle,
  itemImg,
  itemPrice,
  itemId,
  itemQty,
  cartID,
  refetchItem,
}: CartItemProps) => {
  const deleteCartItem = useDeleteCartItem();
  const updateCartItem = useUpdateCartItem();
  const [state, dispatch] = useReducer(reducer, {quantity: itemQty})

  const handleUpdate = () => {
    updateCartItem(
      {
        id: cartID,
        variantId: itemId,
        quantity: state.quantity,
      },
      {
        onSuccess: () => refetchItem(),
      }
    );
  };

  const handleDelete = () => {
      deleteCartItem(
        {
          id: cartID,
          variantId: itemId
        }, 
        {
          onSuccess: () => refetchItem(),
        }
      );
  };

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
              className="btn btn-outline btn-neutral btn-sm"
              onClick={(e) => {
                e.preventDefault();
                handleUpdate();
                dispatch({type: "increment_qty"})
              }}
            >
              +
            </button>
            <p className="text-neutral">Qty {itemQty}</p>
            <button
              className="btn btn-outline btn-neutral btn-sm"
              onClick={(e) => {
                e.preventDefault();
                handleUpdate()
                dispatch({type: "decrement_qty"})
              }}
            >
              -
            </button>
          </div>
          <div className="flex">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete()
              }}
              type="button"
              className=" btn btn-outline btn-primary btn-sm"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
