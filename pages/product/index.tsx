import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import FetchStoreData from '../../utils/fetch'
import { queryData, header } from '../../utils/shopify'

interface Data {
    data: {
      products: {
        edges: Array<object>
      }
    }
}

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN || ''
const storeApi = process.env.SHOPIFY_STORE_API_URL || ''

const staticProducts = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
]

export default function Products (storeData: object){
  console.log(storeData);
return (
<div className="flex flex-col items-center justify-center min-h-screen py-2">

  <Head>
    <title>Products</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>

  <ul>
      {storeData.map((item) => (
        <li>{post.title}</li>
      ))}
    </ul>

  {/* <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
  <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {storeData.map((item: { node: any }, idx: number) => { 
            const product = item.node
            // const image = product.featuredImage
            // const price = product.priceRange.minVariantPrice
            return (
            <Link key={product.handle} href={`/product/${product.handle}`}>
            <a  className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={image.url}
                  alt={image.altText}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{price.price}</p>
            </a>
            </Link>
          )})}
        </div>
      </div>
    </div>
  </main> */}
 

  <footer className="flex items-center justify-center w-full h-24 border-t">
    <a className="flex items-center justify-center"
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank" rel="noopener noreferrer">
      Powered by{' '}
      <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
    </a>
  </footer>
</div>
)
}



export const getStaticProps: GetStaticProps = async () => {

  const response: Data = await FetchStoreData(storeDomain, storeApi, header, queryData)
  const products = await response.data.products

  return {
    props: {
      storeData: products
    }
  }
}

