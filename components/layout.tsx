import { useState } from "react";
import { Transition } from "@headlessui/react";
import CartSideDrawer from "./Cart/cartsidedrawer";
import Navbar from "./Navbar/navbar";
import { useAppContext } from "../context/AppContext";
import Footer from "./Footer/footer";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isCartOpen, setCartOpen] = useState(false);
  const cartContext = useAppContext();
  const cartID = cartContext?.id;
  const cartURL = cartContext?.checkoutUrl;
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
          cartCheckout={cartURL}
          cartIDNum={cartID}
          cartOpenFunc={handleCartToggle}
          cartOpenBool={isCartOpen}
        />
      </Transition>
      <Head>
        <title>Nouveau Threads</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <Footer />
    </>
  );
}
