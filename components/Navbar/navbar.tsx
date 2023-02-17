import Link from "next/link";
import { useState } from "react";
import CartToggleBtn from "../Cart/carttogglebtn";

interface NavProps {
  children?: React.ReactNode;
  toggleFunc: () => void;
}

export default function Navbar({ toggleFunc }: NavProps) {
  return (
    <div className="navbar bg-neutral">
      <div className="flex-1 px-2">
        <a href="/" className="normal-case text-xl text-base-100">
          Nouveau Threads 🧵
        </a>
      </div>
      <div className="flex flex-row justify-end items-center space-x-2 text-base-100">
        <Link href="/request">
          <a className=" btn btn-ghost rounded-sm hover:bg-purple-800">
            Request
          </a>
        </Link>
        <Link href="/about">
          <a className="btn btn-ghost rounded-sm hover:hover:bg-purple-800">
            About
          </a>
        </Link>
        <CartToggleBtn onCartToggle={toggleFunc} />
      </div>
    </div>

    // Nav title
    // <header className="text-gray-600 body-font bg-primary">
    //   <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    //     <a className="flex title-font font-medium items-center text-hover mb-4 md:mb-0">
    //       <span className="ml-3 font-heading text-xl text-white">
    //         W.E Are Inspired
    //       </span>
    //     </a>
    //     <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
    //       <Link href="/">
    //         <a className="mr-5 text-white font-heading text-xl hover:text-hover">
    //           Home
    //         </a>
    //       </Link>
    //       <Link href="0">
    //         <a className="mr-5 text-white font-heading text-xl hover:text-hover">
    //           Product
    //         </a>
    //       </Link>
    //       <Link href="/about">
    //         <a className="mr-5 text-white font-heading text-xl hover:text-hover">
    //           About
    //         </a>
    //       </Link>
    //       <Link href="/request">
    //         <a className="mr-5 text-white font-heading text-xl hover:text-hover">
    //           Request
    //         </a>
    //       </Link>
    //     </nav>
    //     {/* Cart Toggle */}
    //     <CartToggleBtn onCartToggle={toggleFunc} />
    //   </div>
    // </header>
  );
}
