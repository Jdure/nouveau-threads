/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Edge } from "../../types/cart-get";
import { getUserCart, formatPrice } from "../../utils/helpers";
import CartItem from "./cartitem";

interface CartProps {
  cartCheckout: string | undefined;
  cartIDNum: string | undefined;
  cartOpenFunc: () => void;
  cartOpenBool: boolean;
}
export default function CartSideDrawer({
  cartCheckout,
  cartIDNum,
  cartOpenFunc,
  cartOpenBool,
}: CartProps) {
  const { data, isError, error, refetch } = getUserCart(cartIDNum);
  const cartItem = data?.lines;
  const subTotal = data?.estimatedCost.totalAmount.amount;

  if (isError)
    return (
      <div className="relative h-full w-full ">
        <div className="absolute top-0 right-0">
          <div className="container bg-white rounded h-auto w-96 shadow-xl">
            'An error has occurred: ' + {error instanceof Error}
          </div>
        </div>
      </div>
    );

  return (
    <Transition.Root show={cartOpenBool} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={cartOpenFunc}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-teal-50 shadow-xl">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-neutral">
                        {" "}
                        Shopping cart{" "}
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={cartOpenFunc}
                        >
                          <span className="sr-only">Close panel</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cartItem?.edges.map(({ node: { id, quantity, merchandise: { product: {priceRange, handle, title, featuredImage}} }}: Edge) => {
                            return (
                              <CartItem
                                key={handle}
                                itemTitle={title}
                                itemHandle={handle}
                                itemId={id}
                                itemImg={featuredImage.url}
                                itemPrice={priceRange.minVariantPrice.amount}
                                itemQty={quantity}
                                cartID={cartIDNum}
                                refetchItem={refetch}
                              />
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-neutral">
                      <p>Subtotal</p>
                      <p>{formatPrice(parseInt(subTotal as string))}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout
                    </p>
                    <div className="mt-6">
                      <a
                        href={cartCheckout}
                        className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-hover"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-neutral">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="font-medium text-primary hover:text-hover"
                          onClick={cartOpenFunc}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
