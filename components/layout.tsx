import { useState } from "react";
import CartSideDrawer from "./Cart/cartsidedrawer";
import Navbar from "./Navbar/navbar";


//TODO: Set up layout properly
interface LayoutProps {
    children: React.ReactNode
    prevState?: boolean
}

export default function Layout ({children, prevState} : LayoutProps){


    return (
        <><Navbar prevState={false} /><CartSideDrawer /><main>{children}</main></>
    )
}