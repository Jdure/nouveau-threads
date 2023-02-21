import { useQuery } from "react-query";
import { getStoreProducts } from "../utils/helpers";
import Link from "next/link";
import Image from "next/image";
import { productsQuery } from "../utils/shopify-queries";
import { Edge, Storefront } from "../types/storefront";
import { Key } from "react";
import Card from "../components/Content/card";

export default function Home() {
  const { data: data, isError } = useQuery<Storefront>(
    "products",
    () => getStoreProducts(productsQuery),
    {
      staleTime: Infinity,
    }
  );
  const products = data?.data.products;

  if (isError)
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Unable to lead data!</span>
        </div>
      </div>
    );

  return (
    <main>
      <div
        className="hero h-96"
        style={{
          backgroundImage: `url("https://source.unsplash.com/7YwWjgS7aJs/1280x720")`,
        }}
      >
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content flex flex-col text-center">
          <h1 className=" mb-2 text-4xl font-bold text-base-100">
            Nouveau Threads
          </h1>
          <p className="text-xl text-base-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit!
          </p>
        </div>
      </div>
      <div id="about" className="flex flex-col pt-16 pb-6 items-center">
        <p className="text-2xl font-light text-center text-neutral w-4/5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente sit
          quaerat.
        </p>
      </div>
      <div className="flex flex-row justify-around sm:justify-between sm:mx-8">
        <h2 className="text-neutral text-2xl">Top Sellers</h2>
        <Link href={"/product"}>
          <a className="btn btn-outline btn-accent btn-xs rounded-md hover:animate-pulse">
            View Products
          </a>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly items-center py-8">
        {products?.edges
          .slice(0, 3)
          .map(
            (
              {
                node: { title, featuredImage, priceRange, handle, variants },
              }: Edge,
              idx: Key
            ) => {
              return (
                <Card
                  featuredImage={featuredImage.url}
                  title={title}
                  price={priceRange.minVariantPrice.amount}
                  idx={idx}
                  handle={handle}
                  variant={variants.edges[0].node.id}
                />
              );
            }
          )}
      </div>
      <h1 id="about" className="text-neutral text-2xl pl-8 pt-14">
        About Us
      </h1>
      <div className="flex flex-row justify-evenly items-center text-center">
        <div className="basis-1/2 flex flex-col items-center justify-between space-y-6">
          <h2 className="text-3xl">Our Mission</h2>
          <p className="w-2/3 text-lg font-light leading-loose">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni saepe
            quas ut quod corporis dicta minima, ipsum ratione maiores
          </p>
        </div>
        <div className="basis-1/2 ">
          <Image
            className="rounded-md object-cover object-center"
            src={"https://source.unsplash.com/WF0LSThlRmw/400x400"}
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className="flex flex-row bg-gradient-to-r from-gray-900 via-purple-900 to-violet-600 rounded-lg mx-1 justify-evenly items-center mt-16 py-12">
        <div className="flex flex-col text-base-100 space-y-4 font-bold">
          <h2 id="contact" className="text-2xl">
            Contact Us
          </h2>
          <p className="text-xl ">23 Thread Avenue</p>
          <p className="text-xl ">Ottawa, Ontario</p>
          <p className="text-xl ">Canada 🇨🇦</p>
          <p className="text-base ">1-800-555-1234</p>
        </div>
        <div className="flex flex-col w-1/4 justify-evenly space-y-4 font-bold">
          <h2 className="text-base-100 text-2xl">Subscribe</h2>
          <p className="text-base-100 text-xl ">Catch the latest releases</p>
          <div className="relative">
            <input
              type="email"
              placeholder="name@example.com"
              className="input input-bordered w-full pr-16 rounded-md"
            />
            <button className="btn btn-primary absolute top-0 right-0 rounded-r-md rounded-l-md">
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
