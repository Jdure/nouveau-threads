import React from "react";

export const Contact = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row bg-gradient-to-r from-gray-900 via-purple-900 to-violet-600 rounded-lg sm:mx-1 justify-center sm:justify-evenly items-center mt-16 py-12">
      <div className="flex flex-col text-base-100 space-y-4 font-bold">
        <h2 id="contact" className="text-2xl">
          Contact Us
        </h2>
        <p className="text-xl ">23 Thread Avenue</p>
        <p className="text-xl ">Ottawa, Ontario</p>
        <p className="text-xl ">Canada 🇨🇦</p>
        <p className="text-base ">1-800-555-1234</p>
      </div>
      <div className="flex flex-col text-center sm:text-justify sm:w-1/4 justify-evenly space-y-4 font-bold  pb-12 sm:pb-0">
        <h2 className="text-base-100 text-2xl">Subscribe</h2>
        <p className="text-base-100 text-xl ">Catch the latest releases</p>
        <div className="relative">
          <input
            type="email"
            placeholder="name@example.com"
            className="input input-bordered w-full pr-16 rounded-md"
          />
          <button className="btn btn-primary text-base absolute top-0 right-0 rounded-r-md rounded-l-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
