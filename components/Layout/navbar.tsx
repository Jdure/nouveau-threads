import Link from "next/link"

export default function Navbar (){
return (
<div data-theme="wireframe" className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
    <div className="flex-none px-2 mx-2">
        <span className="text-lg font-bold">
            W.E Are Inspired
        </span>
    </div>
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
    <div className="flex-none">
        <Link href="/cart">
        <button className="btn btn-square btn-ghost">

            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        </button>
        </Link>
    </div>
</div>
)
}