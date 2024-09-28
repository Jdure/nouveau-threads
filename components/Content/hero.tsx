import React from "react";

export const Hero = () => {
  return (
    <>
      <div
        className="hero h-96"
        style={{
          backgroundImage: `url("clothes_banner.jpg")`,
        }}
      >
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content flex flex-col text-center">
          <h1 className=" mb-2 text-4xl font-bold text-base-100">
            Nouveau Threads
          </h1>
          <p className="text-xl text-base-100">Eco-friendly clothing company</p>
        </div>
      </div>
      <div id="about" className="flex flex-col pt-16 pb-6 items-center">
        <p className="text-2xl font-light text-center text-neutral w-4/5">
          Our clothes are made from 100% renewable fabrics
        </p>
      </div>
    </>
  );
};
