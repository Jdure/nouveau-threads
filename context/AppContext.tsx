import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { createCartID } from "../components/Cart/cart-api";
import Cookies from "js-cookie";

interface ContextProps {
  children: React.ReactNode;
}

interface CartContextProps {
  id: string | undefined;
  checkoutUrl: string | undefined;
}

const getCartID = () =>
  useQuery("create-cart", createCartID, {
    staleTime: 1000 * 3600,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

const setCartCookie = (
  cartData: { id: string; checkoutUrl: string } | undefined
) => {
  Cookies.set("CART", JSON.stringify(cartData), { expires: 1 / 48 });
};
const AppContext = createContext<CartContextProps | undefined>(undefined);

export function AppWrapper({ children }: ContextProps) {
  const getCartCookie = Cookies.get("CART");
  const [userCookie, setUserCookie] = useState("");
  const getCartQuery = getCartID();

  useEffect(() => {
    if (getCartQuery.isSuccess && userCookie == "") {
      setCartCookie(getCartQuery.data);
    }
  }, [getCartQuery.data]);

  useEffect(() => {
    if (getCartCookie !== undefined) {
      setUserCookie(getCartCookie!);
    }
  }, []);

  const contextValue = useMemo(() => {
    try {
      const value = JSON.parse(userCookie!);
      return value;
    } catch (err) {
      return err;
    }
  }, [getCartQuery.data]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
