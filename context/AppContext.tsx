import { createContext, useContext, useMemo, useState } from "react";
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

const AppContext = createContext<CartContextProps | undefined>(undefined);

export function AppWrapper({ children }: ContextProps) {
  const { data } = getCartID();

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
