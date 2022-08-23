import Head from 'next/head'
import { Jumbotron } from "../components/Content/jumbotron";
import { Team } from "../components/Content/team";
import Footer from "../components/Footer/footer";

// TODO: REDO Hero sectionH

export default function About() {
  const title = "Our Mission";
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Jumbotron title={title} />
      <div className="flex flex-col items-center justify-center">
        <main className="text-black body-font flex flex-col items-start justify-start w-5/6 flex-1 px-20 py-8 bg-slate-100 rounded-lg shadow-md">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Call To Action
          </h1>
          <p className="mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eligendi
            consectetur illo natus quia ratione assumenda repellat error
            mollitia vel rem tempore ad nam, debitis dolor cumque maxime
            consequatur quo! Lorem ipsum dolor sit, amet consectetur adipisicing
            elit.
          </p>
        </main>
        <Team />
      </div>
      <Footer />
    </div>
  );
}