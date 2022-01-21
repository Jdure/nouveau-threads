import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import { Data, Edge, } from '../../storefront'
import { Product, ProductData } from '../../detail'
import FetchStoreData from '../../utils/fetch'
import { productsQuery, header, formatPrice, productDetailQuery } from '../../utils/shopify'

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN || ''
const storeApi = process.env.SHOPIFY_STORE_API_URL || ''

interface IParams extends ParsedUrlQuery {
  id: string
}

export default function ProductDetail ({product}: ProductData){
  console.log(product);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Product Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg" />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">Collection Name</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">The Catcher in the Rye</h1>
              <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Button</button>
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
  // console.log(paths);

  return {
    paths, 
    fallback: false
  }

}

// FIXME: Params are working but can't add variable to query
export const getStaticProps : GetStaticProps = async (context) => {
  const params = context.params as IParams
  console.log(params);
  const response = await FetchStoreData(storeDomain, storeApi, header, productDetailQuery, {handle: params.id})
  // console.log(response);
  const product = await response

  return {
    props: {
      product
    }
  }
}