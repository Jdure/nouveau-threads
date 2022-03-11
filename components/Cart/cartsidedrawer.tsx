/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Edge, GetCart } from "../../types/cart-get";
import { formatPrice } from "../../utils/shopify";
import { getUserCart, delCartItem } from "../../utils/helpers";
import { deleteItem, retrieveCart } from "./cart-create";
import { useMutation } from "react-query";

interface CartProps {
  cartCheckout: string | undefined;
  cartIDNum: string | undefined;
  cartOpenFunc: () => void;
  cartOpenBool: boolean;
}

// FIXME: ITEMS are disapearing from cart when navigating
export default function CartSideDrawer({
  cartCheckout,
  cartIDNum,
  cartOpenFunc,
  cartOpenBool,
}: CartProps) {
  const { data, isError, error } = getUserCart(cartIDNum);
  const checkoutLink = cartCheckout;
  const shopCart: GetCart = data;
  const cartItem = shopCart?.data.cart.lines;
  const subTotal = shopCart?.data.cart.estimatedCost.totalAmount.amount;
  // const delMutation = delCartItem(cartIDNum);

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
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
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
                          {cartItem?.edges.map((item: Edge) => {
                            const articles = item.node;
                            const articleDetail = articles.merchandise.product;
                            const articlePrice =
                              articleDetail.priceRange.minVariantPrice.amount;

                            return (
                              <li
                                key={articleDetail.handle}
                                className="flex py-6"
                              >
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={articleDetail.featuredImage.url}
                                    alt={articleDetail.handle}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#"> {articleDetail.title} </a>
                                      </h3>
                                      <p className="ml-4">
                                        {formatPrice(parseInt(articlePrice))}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      Product Colour
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {articles.quantity}
                                    </p>
                                    {/* TODO: Cart needs a refetch to delete item
                                     */}
                                    <div className="flex">
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          // Calling the query function instead of the mutation
                                          // FIXME: implement delete mutation
                                          deleteItem(cartIDNum, articles.id);
                                          console.log(
                                            "clicked: " + articles.id
                                          );
                                        }}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{formatPrice(parseInt(subTotal))}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <a
                        href={checkoutLink}
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
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
