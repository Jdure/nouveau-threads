import Head from 'next/head'
import { Jumbotron } from "../components/Content/jumbotron";
import Footer from "../components/Footer/footer";
import { MouseEvent, useState } from "react";
import axios from "axios";

const postHeaders = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
};

export default function Request() {
  const initValue = "";
  const [name, setName] = useState(initValue);
  const [email, setEmail] = useState(initValue);
  const [msg, setMsg] = useState(initValue);
  const [submit, setSubmit] = useState(false);

  let userReq = {
    name,
    email,
    msg,
  };

  // TODO: Refactor to React Query
  // TODO: Clear fields on submit

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    console.log("Sending");
    axios({
      method: "post",
      headers: postHeaders,
      url: "/api/request",
      data: userReq,
    }).then((res) => {
      console.log("Response received");
      if (res.status === 200) {
        console.log("Success");
        setName(initValue);
        setEmail(initValue);
        setMsg(initValue);
        setSubmit(true);
      }
    });
  };

  return (
    <div>
      <Head>
        <title>Request</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-start">
        <Jumbotron title="Get Custom Artwork" />
        <main className="text-gray-600 body-font relative w-full h-full">
          <div className="absolute inset-0 bg-gray-300">
            <iframe
              width="100%"
              height="100%"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              title="map"
              scrolling="no"
              src="https://source.unsplash.com/848z7lbCjoo/1600x900"
              style={{ filter: "grayscale(0.2) contrast(1.2) opacity(0.8)" }}
            />
          </div>
          <form className="container px-5 py-24 mx-auto flex">
            <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
              <h2 className="text-gray-900 text-2xl mb-1 font-medium title-font">
                Request
              </h2>
              <p className="leading-relaxed mb-5 text-gray-600">
                Send us your request
              </p>
              <div className="form-group relative mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="name"
                  id="name"
                  name="name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="form-group relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="form-group relative mb-4">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                  id="message"
                  name="message"
                  className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  defaultValue={""}
                />
              </div>
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                type="submit"
                className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-hover rounded text-lg"
              >
                Button
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}