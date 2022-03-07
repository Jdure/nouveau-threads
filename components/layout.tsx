import { useState } from "react";
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

  const initCart = getUserCart(cartID);

  if (initCart.isError) return <h1>There's an error initializing the Cart</h1>;

  return (
    <>
      <Navbar toggleFunc={handleCartToggle} />
      {isCartOpen ? (
        <>
          <CartSideDrawer cartCheckout={url} cartIDNum={cartID} />
          <main>{children}</main>
        </>
      ) : (
        <main>{children}</main>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
