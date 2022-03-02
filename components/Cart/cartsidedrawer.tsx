import { useQuery } from 'react-query';
import { retrieveCart } from "../Cart/cart-create";
import { useAppContext } from "../../context/AppContext";
import { Edge, GetCart } from "../../types/cart-get";

export default function CartSideDrawer() {
  const cartData = useAppContext();
  const cartID = cartData?.id;
  const checkoutLink = cartData?.checkoutUrl;
  const { data, isError, error, isLoading, isSuccess } = useQuery<GetCart>(
    ["cart-items", cartID],
    () => retrieveCart(cartID),
    {
      refetchInterval: 4000,
    }
  );

  const userCart = data?.data.cart;
  console.log(userCart);

  return (
    <div className="relative h-full w-full ">
      {isError ? (
        <div className="absolute top-0 right-0">
          'An error has occurred: ' + {error}
        </div>
      ) : (
        <div className="absolute top-0 right-0">
          <div className="container bg-stone-100 rounded h-auto w-96 shadow">
            <h1 className="flex flex-col pl-4 text-2xl text-black font-bold">
              Cart
            </h1>
            <div className="mt-10 px-6">
              {isLoading ? (
                <p className="flex flex-col pl-4 text-2xl text-black font-bold">
                  Loading Cart...
                </p>
              ) : (
                <ul className="flex flex-col">
                  {userCart?.lines.edges.map((item: Edge) => {
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
              )}
              {isSuccess && userCart!.lines.edges.length <= 0 ? (
                <p className="flex flex-col pl-4 text-xl text-black font-light">
                  Sorry your cart is empty
                </p>
              ) : (
                <button
                  type="button"
                  className="py-2 px-4 mb-3  bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 focus:ring-offset-slate-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  <a href={checkoutLink}>Checkout</a>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



