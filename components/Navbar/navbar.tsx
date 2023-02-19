import Link from "next/link";
import { useState } from "react";
import CartToggleBtn from "../Cart/carttogglebtn";

interface NavProps {
  children?: React.ReactNode;
  toggleFunc: () => void;
}

export default function Navbar({ toggleFunc }: NavProps) {
  return (
    <div className="navbar bg-transparent">
      <div className="flex-1 px-2">
        <a href="/" className="normal-case text-xl text-neutral">
          Nouveau Threads 🧵
        </a>
      </div>
      <div className="flex flex-row justify-end items-center space-x-2 text-neutral">
        <Link href="/">
          <a className="btn btn-ghost rounded-sm hover:bg-base-200">Home</a>
        </Link>
        <Link href="/product">
          <a className=" btn btn-ghost rounded-sm hover:bg-base-200">
            Products
          </a>
        </Link>
        <CartToggleBtn onCartToggle={toggleFunc} />
      </div>
    </div>
  );
}
