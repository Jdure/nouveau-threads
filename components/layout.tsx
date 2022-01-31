import { useState } from "react";
import CartSideDrawer from "./Cart/cartsidedrawer";
import { ReactQueryDevtools } from 'react-query/devtools'
import Navbar from "./Navbar/navbar";
import { useQuery } from "react-query";
import createCartID from "./Cart/cart-create";

interface LayoutProps {
    children: React.ReactNode
}

export const getCartID = () => useQuery('create-cart', createCartID, {staleTime: Infinity} )

export default function Layout ({children} : LayoutProps){
    const [isCartOpen, setCartOpen] = useState(false);
    const handleCartToggle = () => { setCartOpen(!isCartOpen)}   
    const {data, isLoading, error} = getCartID()
    return (
        <><Navbar toggleFunc={handleCartToggle} />
        { isCartOpen ? (
            <><CartSideDrawer isLoading={isLoading} errorMsg={error} id={data?.id} /><main>{children}</main></>
        ) : (
            <main>{children}</main>
        )}
        <ReactQueryDevtools initialIsOpen={false} />
        </>
    )
}