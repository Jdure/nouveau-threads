import { useState } from "react";
import createCartInstance from "./Cart/cart-create";
import CartSideDrawer from "./Cart/cartsidedrawer";
import Navbar from "./Navbar/navbar";

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout ({children} : LayoutProps){
    const [isCartOpen, setCart] = useState(false);
    const handleCartToggle = () => { setCart(!isCartOpen)}
    console.log(isCartOpen);
    createCartInstance()

    return (
        <><Navbar toggleFunc={handleCartToggle} />
        { isCartOpen ? (
            <><CartSideDrawer /><main>{children}</main></>
        ) : (
            <main>{children}</main>
        )}

        </>
    )
}