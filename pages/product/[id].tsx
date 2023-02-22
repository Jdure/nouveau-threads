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

interface IParams extends ParsedUrlQuery {
  id: string;
}

// TODO: Fix layout of item detail
//FIXME: when you add more than one quantity of an item they duplicate in the cart

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>{product.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <section className="text-neutral overflow-hidden">
          <div className="container px-1 py-52 mx-auto bg-slate-50 rounded-xl">
            <div className="lg:w-4/5 mx-auto flex flex-nowrap">
              <Image
                alt={product.title}
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded shadow-2xl"
                src={image}
                width={500}
                height={500}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-md title-font text-gray-500 tracking-widest">
                  COLLECTION
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.title}
                </h1>
                <p className="leading-relaxed text-xl">{product.description}</p>
                <div className="flex justify-center mt-6 items-center pb-5 border-b-2 border-gray-300 mb-5">
                  <div className="w-auto">
                    <span className="m-auto pr-2 text-xl">Quantity</span>
                  </div>
                  <div className="w-auto flex flex-row-reverse">
                    <button
                      onClick={() =>
                        quantity > 1 ? setQuantity(quantity - 1) : quantity
                      }
                      className="bg-primary text-white hover:bg-hover mx-1 my-1 px-4 rounded-lg"
                    >
                      <span className="m-auto text-xl">-</span>
                    </button>
                    <p className="text-center text-xl py-2 px-4">{quantity}</p>
                    <button
                      onClick={() =>
                        quantity < 20 ? setQuantity(quantity + 1) : quantity
                      }
                      className="bg-primary text-white hover:bg-hover mx-1 my-1 px-4 rounded-lg"
                    >
                      <span className="m-auto text-xl">+</span>
                    </button>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-black">
                    {formatPrice(parseInt(price.amount))}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAdd();
                    }}
                    className="flex ml-auto text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-hover rounded"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
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


