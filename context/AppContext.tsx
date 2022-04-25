import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { createCartID } from "../components/Cart/cart-api";

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

// - [ ] Save Cart Session on page return from checkout if no purchase was made
//  - [X] Check if local storage is empty - doesn't have the cart ID
//  - [ ] If its not empty use the cartID instead of refetching for a new one
//  - [ ] If empty save the cartID in local storage

const AppContext = createContext<CartContextProps | undefined>(undefined);

export function AppWrapper({ children }: ContextProps) {
  const [localCart, setLocalCart] = useState<String | null>("");
  const { data } = getCartID();

  // useEffect(() => {
  //   localStorage.setItem("CART", JSON.stringify(data));
  // }, [data]);

  useEffect(() => {
    if (localCart == null) {
      localStorage.setItem("CART", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    const cartData = localStorage.getItem("CART");
    setLocalCart(cartData);
  }, []);

  const contextValue = useMemo(() => {
    return data;
  }, [data]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
