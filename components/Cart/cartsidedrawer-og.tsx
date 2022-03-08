import { Edge, GetCart } from "../../types/cart-get";
import { formatPrice } from "../../utils/shopify";
import { getUserCart } from "../../utils/helpers";

interface CartProps {
  cartCheckout: string | undefined;
  cartIDNum: string | undefined;
}

export default function CartSideDrawer({ cartCheckout, cartIDNum }: CartProps) {
  const { data, isLoading, isError, error } = getUserCart(cartIDNum);
  const checkoutLink = cartCheckout;
  const shopCart = data;
  const cartItem = shopCart?.data.cart.lines;
  const price = shopCart?.data.cart.estimatedCost.totalAmount.amount;

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

  if (isLoading)
    return (
      <div className="relative h-full w-full ">
        <div className="absolute top-0 right-0 ">
          <div className="container bg-stone-100 rounded h-12 w-96 ">
            <div className="flex justify-center items-center">
              <div
                className="spinner-border text-slate-600 mt-2 animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="relative h-full w-full ">
      <div className="absolute top-0 right-0">
        <div className="container bg-stone-100 rounded h-auto w-96 shadow">
          <h1 className="flex flex-col pl-4 text-2xl text-black font-bold">
            Cart
          </h1>
          <div className="mt-10 px-6">
            <ul className="flex flex-col">
              {cartItem?.edges.map((item: Edge) => {
                const articles = item.node;
                const articleDetail = articles.merchandise.product;
                return (
                  <li
                    key={articleDetail.handle}
                    className="border-gray-400 flex flex-row mb-2"
                  >
                    <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                      <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                        <a href="#" className="block relative">
                          <img
                            alt={articleDetail.handle}
                            src={articleDetail.featuredImage.url}
                            className="mx-auto object-cover rounded-full h-10 w-10 "
                          />
                        </a>
                      </div>
                      <div className="flex-1 pl-1 md:mr-16">
                        <div className="font-medium dark:text-white">
                          {articleDetail.title}
                        </div>
                        <div className="text-gray-600 dark:text-gray-200 text-sm">
                          Quantity: {articles.quantity}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <button
                  type="button"
                  className="py-2 px-4 mb-3  bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 focus:ring-offset-slate-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  <a href={checkoutLink}>Checkout</a>
                </button>
              </div>
              <div>
                <p className="text-lg text-center ">Total</p>
                <p className="text-lg text-center">
                  {formatPrice(parseInt(price))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
