import { useState } from "react";
import { Transition } from "@headlessui/react";
import CartSideDrawer from "./Cart/cartsidedrawer";
import { ReactQueryDevtools } from "react-query/devtools";
import Navbar from "./Navbar/navbar";
import { getUserCart } from "../utils/helpers";
import { useAppContext } from "../context/AppContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isCartOpen, setCartOpen] = useState(false);
  const cartData = useAppContext();
  const cartID = cartData?.id;
  const url = cartData?.checkoutUrl;
  const handleCartToggle = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <>
      <Navbar toggleFunc={handleCartToggle} />
      <Transition
        show={isCartOpen}
        enter="transition-opacity duration-75"
        leave="transition-opacity duration-150"
      >
        <CartSideDrawer
          cartCheckout={url}
          cartIDNum={cartID}
          cartOpenFunc={handleCartToggle}
          cartOpenBool={isCartOpen}
        />
      </Transition>
      <main>{children}</main>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
