import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import { Data} from '../../types/storefront'
import {ProductData } from '../../types/detail'
import {
  formatPrice,
  getStoreProducts,
  useAddCartItem,
} from "../../utils/helpers";
import { productsQuery, productDetailQuery } from "../../utils/shopify-queries";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Image from "next/image";
import Link from "next/link";

interface IParams extends ParsedUrlQuery {
  id: string;
}

export default function ProductDetail({ product }: ProductData) {
  const cartData = useAppContext();
  const cartID = cartData?.id;
  const { priceRange, featuredImage, variants, handle } = product;
  const image = featuredImage.url;
  const price = priceRange.minVariantPrice;
  const [quantity, setQuantity] = useState(1);
  const variantID = variants.edges[0].node.id;
  const addItemToCart = useAddCartItem();

  const handleAdd = () => {
    addItemToCart({
      id: cartID,
      variantId: variantID,
      handle: handle,
      quantity: quantity,
    });
  };

  return (
    <>
      <div className="flex flex-1">
        <Link href={"/product"}>
          <a className="btn btn-link font-bold text-neutral">
            &larr; Back to products
          </a>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>{product.title}</title>
          <meta
            name="description"
            content="Demo Shopify site - Nouveau Threads eco-friendly clothing store"
          />
        </Head>

        <section className="text-neutral body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-col justify-center items-center sm:flex-row ">
              <div className="w-72 sm:w-full sm:basis-1/2">
                <Image
                  alt={product.title}
                  className="object-cover object-center rounded transition ease-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                  src={image}
                  height={1080}
                  width={1080}
                />
              </div>

              <div className="text-center sm:text-justify lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  Nouveau Threads
                </h2>
                <h1 className="text-neutral text-3xl title-font font-medium mb-1">
                  {product.title}
                </h1>
                <p className="leading-loose text-lg">{product.description}</p>
                <div className="flex justify-center mt-6 items-center pb-5 border-b-2 mb-5">
                  <div className="w-auto">
                    <span className="m-auto pr-2 text-xl">Quantity</span>
                  </div>
                  <div className="w-auto flex flex-row-reverse items-center">
                    <button
                      aria-label="decrease quantity"
                      onClick={() =>
                        quantity > 1 ? setQuantity(quantity - 1) : quantity
                      }
                      className="btn btn-ghost text-neutral mx-1 my-1 px-4 rounded-lg"
                    >
                      <span className="m-auto text-xl">-</span>
                    </button>
                    <p className="text-center text-xl py-2 px-4">{quantity}</p>
                    <button
                      aria-label="decrease quantity"
                      onClick={() =>
                        quantity < 20 ? setQuantity(quantity + 1) : quantity
                      }
                      className="btn btn-ghost text-neutral mx-1 my-1 px-4 rounded-lg"
                    >
                      <span className="m-auto text-xl">+</span>
                    </button>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-neutral">
                    {formatPrice(parseInt(price.amount))}
                  </span>
                  <button
                    aria-label="add to cart"
                    name="add to cart"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAdd();
                      setQuantity(1);
                    }}
                    className="flex ml-auto btn bg-cyan-800 hover:bg-cyan-900 rounded-md border-0 py-2 px-6"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getStoreProducts(productsQuery);

  const { products }: Data = await response.data;
  const paths = products.edges.map((value) => {
    return {
      params: { id: value.node.handle },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as IParams;
  const response = await getStoreProducts(productDetailQuery, {
    handle: params.id,
  });
  const { product } = await response.data;

  return {
    props: {
      product,
    },
  };
};


