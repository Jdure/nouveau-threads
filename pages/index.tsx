import Head from 'next/head'
import Footer from "../components/Footer/footer";
import { useQuery } from 'react-query';
import { getStoreProducts } from '../utils/helpers'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-gray-600 body-font  bg-teal-50">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://source.unsplash.com/oat3l0iVwPs/600x800"
            />
          </div>
          <div className=" lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font font-heading sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Welcome to{" "}
              <span className="text-secondary">W.E Are Inspire!</span>
            </h1>
            <p className="font-heading text-secondary text-xl py-2">
              Let's animate your life!
            </p>
            <p className="mb-8 leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
              neque, ea maiores eveniet, impedit magnam expedita incidunt
              assumenda ducimus accusantium tempore eaque? Vel perferendis,
              facere voluptas quasi ullam quia ut!
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-hover rounded text-lg">
                Send A Request
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/* <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer> */}
    </div>
  );
}
