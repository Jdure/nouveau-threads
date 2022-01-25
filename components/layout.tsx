import CartSideDrawer from "./Cart/cartsidedrawer";
import Navbar from "./Navbar/navbar";

interface LayoutProps {
    children: any
}

export default function Layout ({children} : LayoutProps){
    return (
    <>
        <Navbar/>
        <CartSideDrawer/>
        <main>{children}</main>
    </>
    )
}