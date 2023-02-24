import { useQuery } from "react-query";
import { getStoreProducts } from "../utils/helpers";
import Link from "next/link";
import { productsQuery } from "../utils/shopify-queries";
import { Edge, Storefront } from "../types/storefront";
import Card from "../components/Content/card";
import dynamic from "next/dynamic";

const Hero = dynamic<{}>(
  () => import("../components/Content/hero").then((mod) => mod.Hero),
  {
    ssr: false,
  }
);
const About = dynamic<{}>(
  () => import("../components/Content/about").then((mod) => mod.About),
  {
    ssr: false,
  }
);
const Contact = dynamic<{}>(
  () => import("../components/Content/contact").then((mod) => mod.Contact),
  {
    ssr: false,
  }
);

export default function Home() {
  const { data: data, isError } = useQuery<Storefront>(
    "products",
    () => getStoreProducts(productsQuery),
    {
      staleTime: Infinity,
    }
  );
  const products = data?.data.products;

  if (isError)
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Unable to lead data!</span>
        </div>
      </div>
    );

  return (
    <main>
      <Hero />
      <div className="flex flex-row justify-around sm:justify-between sm:mx-8">
        <h2 className="text-neutral text-2xl">Top Sellers</h2>
        <Link href={"/product"}>
          <a className="btn btn-accent text-base btn-xs rounded-md hover:animate-pulse">
            View Products
          </a>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly items-center py-8">
        {products?.edges
          .slice(0, 3)
          .map(
            ({
              node: { title, featuredImage, priceRange, handle, variants },
            }: Edge) => {
              return (
                <Card
                  featuredImage={featuredImage.url}
                  title={title}
                  price={priceRange.minVariantPrice.amount}
                  handle={handle}
                  variant={variants.edges[0].node.id}
                  key={handle}
                />
              );
            }
          )}
      </div>
      <About />
      <Contact />
    </main>
  );
}
