import Link from "next/link"
import CartToggleBtn from "../Cart/carttogglebtn"

export default function Navbar (){

    return (
    // Nav title
<div data-theme="wireframe" className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
    <div className="flex-none px-2 mx-2">
        <span className="text-lg font-bold">
            W.E Are Inspired
        </span>
    </div>
    {/* Nav Links */}
    <div className="flex-1 px-2 mx-2">
        <div className="items-stretch hidden lg:flex">
            <Link href="/" >
            <a className="btn btn-ghost btn-sm rounded-btn">
                Home
            </a>
            </Link>
            <Link href="/product">
            <a className="btn btn-ghost btn-sm rounded-btn">
                Product
            </a>
            </Link>
            <Link href="/about">
            <a className="btn btn-ghost btn-sm rounded-btn">
                About
            </a>
            </Link>
            <Link href="/request">
            <a className="btn btn-ghost btn-sm rounded-btn">
                Request
            </a>
            </Link>
        </div>
    </div>
    {/* Cart Btn */}
    <div className="flex-none navbar-end">
            <CartToggleBtn />
    </div>
</div>
)
}