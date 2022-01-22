import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import { Data} from '../../storefront'
import {ProductData } from '../../detail'
import FetchStoreData from '../../utils/fetch'
import { productsQuery, header, formatPrice, productDetailQuery } from '../../utils/shopify'

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN || ''
const storeApi = process.env.SHOPIFY_STORE_API_URL || ''

interface IParams extends ParsedUrlQuery {
  id: string
}

export default function ProductDetail ({product}: ProductData){
  const {priceRange, featuredImage} = product
  const image = featuredImage.url
  const price = priceRange.minVariantPrice
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>{product.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt={product.title} className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={image} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">Name of the collection</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">{formatPrice(parseInt(price.amount))}</span>
                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Buy</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
      

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await FetchStoreData(storeDomain, storeApi, header, productsQuery)
  const  { products } : Data  = await response.data

  const paths = products.edges.map((value) => {
    return {
      params: {id: value.node.handle}
    }
  });

  return {
    paths, 
    fallback: false
  }

}

export const getStaticProps : GetStaticProps = async (context) => {
  const params = context.params as IParams
  const response = await FetchStoreData(storeDomain, storeApi, header, productDetailQuery, {handle: params.id})
  const { product }: ProductData  = await response.data

  return {
    props: {
      product
    }
  }
}