import React from "react";
import { formatPrice } from "../../utils/helpers";
import Image from "next/image";
import { FeaturedImage } from "../../types/storefront";

export default function Card(props: {
  featuredImage: string;
  title: string;
  price: string;
  idx: React.Key;
}) {
  return (
    <div
      key={props.idx}
      className="card card-compact rounded-md w-60 bg-base-100"
    >
      <figure>
        <Image
          className="rounded-md object-cover object-center"
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
          <button className="btn btn-primary rounded-md btn-sm hover:animate-pulse">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
