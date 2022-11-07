import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function BriefIntro(props) {
  return (
    <div className=" px-4 md:px-14 lg:px-20 py-9  md:py-12 ">
      <h1 className=" text-3xl md:text-4xl text-center tracking-wider font-semibold mb-3 ">
        What We Offer ?
      </h1>
      <div className=" mx-auto w-fit flex gap-x-3 mb-4">
        <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
        <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
        <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
        <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
        <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
        <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
        <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
      </div>
      <p className=" text-base md:text-lg w-[90%] max-w-2xl mx-auto text-center tracking-wide mb-7 opacity-90">
        Try the Apple Crisp Oatmilk Macchiato, now nondairy and with Artisan
        Blonde Espresso.
      </p>
      <div className=" lg:mx-3 grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-0 ">
        <LazyLoadImage
          className=" w-[85%] sm:w-[75%] mx-auto"
          src="/images/chef1.png"
          alt=""
        />
        <LazyLoadImage
          className="w-[85%] sm:w-[77%] mx-auto"
          src="/images/food-circle.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default BriefIntro;
