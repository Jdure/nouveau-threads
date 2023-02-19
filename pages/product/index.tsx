import { GetStaticProps } from 'next'
import Link from "next/link";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Jumbotron } from "../../components/Content/jumbotron";
import Footer from "../../components/Footer/footer";
import { Edge } from "../../types/storefront";
import { formatPrice, getStoreProducts } from "../../utils/helpers";
import { productsQuery } from "../../utils/shopify-queries";
import Card from "../../components/Content/card";
import { Key } from "react";

export default function StoreProducts() {
  const { data } = useQuery("products", () => getStoreProducts(productsQuery), {
    staleTime: Infinity,
  });

  return (
    <div>
      <h1 className="text-4xl font-bold text-neutral text-center py-4">
        Products
      </h1>
      <div className="flex flex-row flex-wrap justify-evenly items-center mx-6 py-6">
        {data.data.products.edges.map((item: Edge, idx: Key) => {
          const product = item.node;
          const image = product.featuredImage;
          const price = product.priceRange.minVariantPrice;
          return (
            <Link key={product.handle} href={`/product/${product.handle}`}>
              <a>
                <Card
                  featuredImage={image.url}
                  title={product.title}
                  price={price.amount}
                  idx={idx}
                />
              </a>
            </Link>
          );
        })}
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

