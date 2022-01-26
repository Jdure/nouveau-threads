import Link from "next/link"
import { useState } from "react";
import CartToggleBtn from "../Cart/carttogglebtn"

interface NavProps {
    children?: React.ReactNode
    toggleFunc: () => void;
}

export default function Navbar ({toggleFunc} : NavProps){

    return (
    // Nav title
<div data-theme="light" className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
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
 
    <div className="flex-none navbar-end">
            <CartToggleBtn onCartToggle={toggleFunc} />
    </div>
</div>
)
}