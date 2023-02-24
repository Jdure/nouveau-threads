import React from "react";
import Image from "next/image";

export const About = () => {
  return (
    <>
      <h1
        id="about"
        className="text-neutral text-center sm:text-justify text-2xl sm:pl-8 sm:pt-14"
      >
        About Us
      </h1>
      <div className="flex flex-col sm:flex-row sm:justify-evenly items-center text-center space-y-8">
        <div className="basis-1/2 flex flex-col items-center justify-between space-y-6">
          <h2 className="text-3xl">Our Mission</h2>
          <p className="w-2/3 text-lg font-light leading-loose">
            We are proud to produce fashionable clothes that come from 100% recycled materials
          </p>
        </div>
        <div className="w-72 sm:w-full sm:basis-1/2 ">
          <Image
            alt={"Clothes on a rack"}
            className="rounded-md object-cover object-center"
            src={"https://source.unsplash.com/WF0LSThlRmw/400x400"}
            width={400}
            height={400}
          />
        </div>
      </div>
    </>
  );
};
