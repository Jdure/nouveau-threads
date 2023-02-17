import { useQuery } from "react-query";
import { formatPrice, getStoreProducts } from "../utils/helpers";
import Link from "next/link";
import Image from "next/image";
import { productsQuery } from "../utils/shopify-queries";
import { Edge, Products, Storefront } from "../types/storefront";
import { Key } from "react";

export default function Home() {
  const {
    data: data,
    isError,
    isLoading,
  } = useQuery<Storefront>("products", () => getStoreProducts(productsQuery), {
    staleTime: Infinity,
  });
  const products = data?.data.products;

  if (isLoading) return <div>Loading..</div>;

  if (isError) return <div>Error!</div>;

  return (
    <>
      <div className="hero h-96 bg-gradient-to-r from-gray-900 via-purple-900 to-violet-600">
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content flex flex-col text-center">
          <h1 className=" mb-2 text-4xl font-bold text-base-100">
            Nouveau Threads
          </h1>
          <p className="text-xl text-base-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </p>
          <p className="btn btn-secondary rounded-lg">Get yours today!</p>
          <div className="flex flex-row"></div>
        </div>
      </div>
      <div id="about" className="flex flex-col py-6 items-center">
        <p className="text-2xl text-center text-neutral w-4/5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente sit
          quaerat. 🎨
        </p>
      </div>
      <div className="flex flex-row justify-around sm:justify-between sm:mx-8">
        <h2 className="text-neutral text-xl font-bold">Top Sellers</h2>
        <Link href={"/product"}>
          <a className="btn btn-secondary btn-xs">View Products</a>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly items-center pt-6">
        {products?.edges
          .slice(0, 3)
          .map(
            (
              { node: { title, featuredImage, priceRange } }: Edge,
              idx: Key
            ) => {
              return (
                <div
                  key={idx}
                  className="card card-compact rounded-lg w-60 bg-base-100"
                >
                  <figure>
                    <Image
                      className="rounded-lg"
                      src={featuredImage.url}
                      alt={title}
                      width={1080}
                      height={1080}
                    />
                  </figure>
                  <div className="card-body items-center text-center sm:items-start">
                    <h2 className="card-title text-xl">{title}</h2>
                    <div className="flex flex-row space-x-8 pt-2">
                      <p className="text-base font-light">
                        {formatPrice(
                          parseInt(priceRange.minVariantPrice.amount)
                        )}
                      </p>
                      <button className="btn btn-primary btn-xs">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          )}
      </div>
      <div className="divider w-3/4 mx-auto"></div>
    </>
  );
}
