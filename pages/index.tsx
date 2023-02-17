import Head from "next/head";
import { useQuery } from "react-query";
import { getStoreProducts } from "../utils/helpers";

export default function Home() {
  return (
    <>
      <div className="hero h-96 bg-gradient-to-br from-cyan-200 to-cyan-400">
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content flex flex-col text-center">
          <h1 className=" mb-2 text-4xl font-bold text-base-100">
            Welcome to Sticker World
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
      <div className="flex flex-row justify-around">
        <h2 className="text-neutral text-xl">Top Sellers</h2>
        <button className="btn btn-secondary btn-xs  rounded-lg">
          View Products
        </button>
      </div>
      <div className="flex flex-row"></div>
    </>
  );
}
