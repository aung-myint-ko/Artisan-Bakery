import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Process(props) {
  return (
    <>
      <div className="grid gap-y-8">
        <div className=" flex flex-col md:grid md:grid-cols-2 ">
          <div className=" h-60 md:h-auto">
            <LazyLoadImage
              className=" w-full h-full bg-slate-50"
              src="/images/process1.jpg"
              alt=""
            />
          </div>

          <div className=" py-7 px-5 bg-[#9c4c12] text-white flex flex-col justify-center items-center">
            <h1 className=" text-2xl md:text-4xl mb-3 md:mb-4 font-semibold text-center  tracking-wider ">
              Art of mixing with ratio
            </h1>
            <p className=" text-base md:text-lg text-center leading-relaxed tracking-wide opacity-90">
              Mixing is one of the most critical and important operations in a
              bakery. Perfect mixing make delicious cake.
            </p>
          </div>
        </div>
        <div className=" flex flex-col-reverse md:grid md:grid-cols-2  ">
          <div className=" py-7 px-5 bg-[#9c4c12] text-white flex flex-col justify-center items-center">
            <h1 className="text-2xl md:text-4xl mb-3 md:mb-4 font-semibold text-center tracking-wider ">
              Hygenic kitchen
            </h1>
            <p className=" text-base md:text-lg text-center leading-relaxed tracking-wide opacity-95">
              Kitchen hygiene practices can reduce this contamination of food
              and the transmission of disease.
            </p>
          </div>
          <div className=" h-60 md:h-auto">
            <LazyLoadImage
              className="w-full h-full bg-slate-50"
              src="/images/process2.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <p className=" py-8 md:py-10 text-sm md:text-base mx-auto w-[90%] max-w-2xl leading-relaxed text-center opacity-95">
        *Menu limited. Restricted delivery area. Available in participating
        locations only. Fees subject to change. Prices for Starbucks® items
        purchased through Uber Eats may be higher than posted in stores or as
        marked. See the Uber Eats app for details.
      </p>
    </>
  );
}

export default Process;
