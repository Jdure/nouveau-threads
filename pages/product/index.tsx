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
      <div className="flex flex-col items-center justify-center">
        <div>
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {data.data.products.edges.map((item: Edge, idx: Key) => {
                const product = item.node;
                const image = product.featuredImage;
                const price = product.priceRange.minVariantPrice;
                return (
                  <Link
                    key={product.handle}
                    href={`/product/${product.handle}`}
                  >
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
        </div>
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

