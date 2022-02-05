import { useState } from "react";
import CartSideDrawer from "./Cart/cartsidedrawer";
import { ReactQueryDevtools } from "react-query/devtools";
import Navbar from "./Navbar/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isCartOpen, setCartOpen] = useState(false);
  const handleCartToggle = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <>
      <Navbar toggleFunc={handleCartToggle} />
      {isCartOpen ? (
        <>
          <CartSideDrawer />
          <main>{children}</main>
        </>
      ) : (
        <main>{children}</main>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
