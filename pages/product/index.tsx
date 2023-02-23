import { GetStaticProps } from 'next'
import Link from "next/link";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Edge, Storefront } from "../../types/storefront";
import { getStoreProducts } from "../../utils/helpers";
import { productsQuery } from "../../utils/shopify-queries";
import Card from "../../components/Content/card";
import { Key } from "react";

export default function StoreProducts() {
  const { data: data } = useQuery<Storefront>("products", () => getStoreProducts(productsQuery), {
    staleTime: Infinity,
  });
  const products = data?.data.products;

  return (
    <div>
      <h1 className="text-4xl font-bold text-neutral text-center py-4">
        Products
      </h1>
      <div className="flex flex-row flex-wrap justify-evenly items-center mx-6 py-6">
        {products?.edges.map(
          (
            { node: { handle, featuredImage, priceRange, title, id } }: Edge,
            idx: Key
          ) => {
            return (
              <Link href={`/product/${handle}`}>
                <a>
                  <Card
                    featuredImage={featuredImage.url}
                    title={title}
                    price={priceRange.minVariantPrice.amount}
                    key={handle}
                    handle={handle}
                    variant={id}
                  />
                </a>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}



export const getStaticProps: GetStaticProps = async () => {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('products', () => getStoreProducts(productsQuery));

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

