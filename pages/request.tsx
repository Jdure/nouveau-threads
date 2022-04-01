import Head from 'next/head'

export default function Request (){
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Request</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <form className="flex w-full max-w-sm space-x-3">
            <div className="w-full max-w-2xl px-5 py-10 m-auto mt-10 bg-white rounded-lg shadow ">
              <div className="mb-6 text-3xl font-light text-center text-gray-800 ">
                Send a request
              </div>
              <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                <div className="col-span-2 lg:col-span-2">
                  <div className=" relative ">
                    <input
                      type="text"
                      id="contact-form-name"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-2">
                  <div className=" relative ">
                    <input
                      type="text"
                      id="contact-form-email"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-gray-700" htmlFor="name">
                    <textarea
                      className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      id="comment"
                      placeholder="Enter your description"
                      name="comment"
                      rows={5}
                      cols={40}
                      defaultValue={""}
                    />
                  </label>
                </div>
                <div className="col-span-2 lg:col-span-2">
                  <div className="relative ">
                    <input
                      type="file"
                      id="contact-form-file"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="upload"
                    />
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </form>
        </main>

        <footer className="flex items-center justify-center w-full h-24 border-t">
          <a
            className="flex items-center justify-center"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
          </a>
        </footer>
      </div>
    );
}