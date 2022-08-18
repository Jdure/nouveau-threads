import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Footer from "../../components/Footer/footer";
import { Edge } from "../../types/storefront";
import { formatPrice, getStoreProducts } from "../../utils/helpers";
import { productsQuery } from "../../utils/shopify-queries";

export default function StoreProducts() {
  const { data } = useQuery("products", () => getStoreProducts(productsQuery), {
    staleTime: Infinity,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-start justify-center w-full flex-1 px-20 ">
        <div>
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-6xl font-bold my-2 font-heading">Products</h1>
            <p className="text-lg font-thin pb-6 text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit!
            </p>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {data.data.products.edges.map((item: Edge) => {
                const product = item.node;
                const image = product.featuredImage;
                const price = product.priceRange.minVariantPrice;
                return (
                  <Link
                    key={product.handle}
                    href={`/product/${product.handle}`}
                  >
                    <a className="group border-b-2 bg-teal-100 rounded-md hover:shadow">
                      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                        <img
                          src={image.url}
                          alt={product.title}
                          className="w-full h-full object-center object-cover group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-4 text-lg font-thin text-black">
                        {product.title}
                      </h3>
                      <p className="mt-1 text-lg font-body text-black">
                        {formatPrice(parseInt(price.amount))}
                      </p>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
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

