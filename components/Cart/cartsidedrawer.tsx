import { useQuery } from 'react-query';
import { retrieveCart } from "../Cart/cart-create";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import { Edge, GetCart } from "../../types/cart-get";

export default function CartSideDrawer() {
  const cartData = useAppContext();
  const cartID = cartData?.id;
  const checkoutLink = cartData?.checkoutUrl;
  const [cart, setCart] = useState<GetCart>();
  const { data, isError, error, isLoading } = useQuery<GetCart>(
    ["cart-items", cartID],
    () => retrieveCart(cartID),
    {
      onSuccess: () => setCart(data),
    }
  );
  const userCart = cart?.data.cart;
  console.log(userCart);

  return (
    <div className="relative h-full w-full ">
      {isError ? (
        <div className="absolute top-0 right-0">
          'An error has occurred: ' + {error}
        </div>
      ) : (
        <div className="absolute top-0 right-0">
          <div className="container bg-stone-100 rounded h-screen w-96 shadow">
            <h1 className="flex flex-col pl-4 text-2xl text-black font-bold">
              Cart
            </h1>
            <div className="mt-10 px-6">
              <ul className="flex flex-col">
                {userCart?.lines.edges.map((item: Edge) => {
                  const articles = item.node;
                  const articleDetail = articles.merchandise.product;
                  return (
                    <li
                      key={articleDetail.handle}
                      className="border-gray-400 flex flex-row mb-2"
                    >
                      <div className="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
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
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



