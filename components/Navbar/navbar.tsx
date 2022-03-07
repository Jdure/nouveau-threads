import Link from "next/link";
import { useState } from "react";
import CartToggleBtn from "../Cart/carttogglebtn";

interface NavProps {
  children?: React.ReactNode;
  toggleFunc: () => void;
}

export default function Navbar({ toggleFunc }: NavProps) {
  return (
    // Nav title
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl">W.E Are Inspired</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/">
            <a className="mr-5 hover:text-gray-900">Home</a>
          </Link>
          <Link href="/product">
            <a className="mr-5 hover:text-gray-900">Product</a>
          </Link>
          <Link href="/about">
            <a className="mr-5 hover:text-gray-900">About</a>
          </Link>
          <Link href="/request">
            <a className="mr-5 hover:text-gray-900">Request</a>
          </Link>
        </nav>
        {/* Cart Toggle */}
        <CartToggleBtn onCartToggle={toggleFunc} />
      </div>
    </header>
  );
}
