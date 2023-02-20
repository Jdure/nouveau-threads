import React from "react";
import { formatPrice } from "../../utils/helpers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";
import { addItem } from "../Cart/cart-api";

export default function Card(props: {
  featuredImage: string;
  title: string;
  price: string;
  handle?: string | undefined;
  variant?: string | undefined;
  idx: React.Key;
}) {
  const router = useRouter();
  const {id} = useAppContext();


  return (
    <div
      key={props.idx}
      className="card card-compact rounded-md w-60 bg-base-100 my-2 "
    >
      <figure>
        <Image
          className="rounded-md object-cover object-center transition ease-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
          src={props.featuredImage}
          alt={props.title}
          width={1080}
          height={1080}
        />
      </figure>
      <div className="card-body items-center text-center text-neutral">
        <h2 className="card-title text-lg">{props.title}</h2>
        <div className="flex flex-col space-y-4 pt-2">
          <p className="text-lg font-light">
            {formatPrice(parseInt(props.price))}
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(id, props.handle!, props.variant!, 1);
            }}
            className={`btn btn-primary rounded-md btn-sm hover:animate-pulse ${
              router.asPath != "/" ? "hidden" : ""
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
