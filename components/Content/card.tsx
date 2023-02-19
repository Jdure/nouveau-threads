import React from "react";
import { formatPrice } from "../../utils/helpers";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Card(props: {
  featuredImage: string;
  title: string;
  price: string;
  idx: React.Key;
}) {
  const router = useRouter();

  return (
    <div
      key={props.idx}
      className="card card-compact rounded-md w-60 bg-base-100 my-2 transition ease-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
    >
      <figure>
        <Image
          className="rounded-md object-cover object-center "
          src={props.featuredImage}
          alt={props.title}
          width={1080}
          height={1080}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-lg">{props.title}</h2>
        <div className="flex flex-col space-y-4 pt-2">
          <p className="text-lg font-light">
            {formatPrice(parseInt(props.price))}
          </p>
          {/* TODO: Do I need this button on the product page? */}
          <button
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
