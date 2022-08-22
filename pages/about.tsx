import Head from 'next/head'
import { Team } from "../components/Content/team";
import Footer from "../components/Footer/footer";

// TODO: REDO Hero sectionH

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-gray-600 body-font flex flex-col items-start justify-center w-full flex-1 px-20">
        <div className="container px-5 pt-12 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-black">
                Our Story
              </h1>
              <div className="h-1 w-20 bg-secondary rounded" />
            </div>
            <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
              <img
                className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded shadow-md shadow-primary"
                alt="hero"
                src="https://dummyimage.com/720x600"
              />
              <div className="text-center lg:w-2/3 w-full bg-slate-50 shadow-md shadow-primary rounded-lg">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  Some title
                </h1>
                <p className="mb-8 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                  eligendi consectetur illo natus quia ratione assumenda
                  repellat error mollitia vel rem tempore ad nam, debitis dolor
                  cumque maxime consequatur quo! Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Nostrum ipsum itaque, autem
                  laboriosam repudiandae debitis officiis pariatur, consectetur
                  porro exercitationem rerum, quos expedita assumenda recusandae
                  molestias sequi ipsam voluptate quidem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Team />
      <Footer />
    </div>
  );
}