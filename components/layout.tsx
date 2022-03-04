import { useState } from "react";
import CartSideDrawer from "./Cart/cartsidedrawer";
import { ReactQueryDevtools } from "react-query/devtools";
import Navbar from "./Navbar/navbar";
import { useQuery } from "react-query";
import { useAppContext } from "../context/AppContext";
import { GetCart } from "../types/cart-get";
import { retrieveCart } from "./Cart/cart-create";

interface LayoutProps {
  children: React.ReactNode;
}

function initCart() {
  const cartData = useAppContext();
  const ID = cartData?.id;
  const url = cartData?.checkoutUrl;
  return [ID, url];
}

export default function Layout({ children }: LayoutProps) {
  const cartID = initCart()[0];
  const [isCartOpen, setCartOpen] = useState(false);
  const handleCartToggle = () => {
    setCartOpen(!isCartOpen);
  };

  const { data, isError, isLoading, error } = useQuery<GetCart>(
    ["cart-items", cartID],
    () => retrieveCart(cartID),
    {
      // refetchInterval: 5000,
    }
  );

  return (
    <>
      <Navbar toggleFunc={handleCartToggle} />
      {isCartOpen ? (
        <>
          <CartSideDrawer
            getCartFunc={data}
            cartCheckout={initCart()[1]}
            cartError={isError}
            cartLoading={isLoading}
            cartErrorMsg={error}
          />
          <main>{children}</main>
        </>
      ) : (
        <main>{children}</main>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
