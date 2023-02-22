import Link from "next/link";
import Image from "next/image"
import { useReducer, useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQueryClient,
} from "react-query";
import {
  formatPrice,
  useUpdateCartItem,
  useDeleteCartItem,
} from "../../utils/helpers";

interface CartItemProps {
  itemTitle: string;
  itemHandle: string;
  itemImg: string;
  itemPrice: string;
  itemId: string;
  itemQty: number;
  cartID: string | undefined;
}

export default function CartItem({
  itemTitle,
  itemHandle,
  itemImg,
  itemPrice,
  itemId,
  itemQty,
  cartID,
}: CartItemProps) {
  const queryClient = useQueryClient();
  const deleteCartItem = useDeleteCartItem();
  const updateCartItem = useUpdateCartItem();
  const [updatedQuantity, setUpdatedQuantity] = useState(itemQty);

  const handleUpdate = (newQty: number) => {
    setUpdatedQuantity(newQty);
    updateCartItem({
      id: cartID,
      variantId: itemId,
      quantity: newQty,
    });
  };

  const handleDelete = () => {
    deleteCartItem(
      {
        id: cartID,
        variantId: itemId,
      },
      {
        onSuccess: () => queryClient.invalidateQueries(["cart-items", cartID]),
      }
    );
  };
  return (
    <li key={itemHandle} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={itemImg}
          alt={itemHandle}
          height={500}
          width={500}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="mx-2 flex flex-1 flex-col justify-around">
        <div className="flex justify-between text-base text-neutral">
          <Link key={itemHandle} href={`/product/${itemHandle}`}>
            <h3>
              <a href="#">{itemTitle}</a>
            </h3>
          </Link>
          <p>{formatPrice(parseInt(itemPrice))}</p>
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <div className="inline-flex space-x-3">
            <button
              className="btn rounded-md btn-outline btn-xs "
              onClick={(e) => {
                e.preventDefault();
                handleUpdate(updatedQuantity + 1);
              }}
            >
              +
            </button>
            <p className="text-neutral text-base">{itemQty}</p>
            <button
              className="btn rounded-md btn-outline btn-xs "
              onClick={(e) => {
                e.preventDefault();
                handleUpdate(updatedQuantity - 1);
              }}
            >
              -
            </button>
          </div>
          <div className="flex">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              type="button"
              className=" btn rounded-md btn-outline btn-primary btn-xs"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
