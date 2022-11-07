import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Story(props) {
  return (
    <div className="px-4 md:px-14 lg:px-20">
      <div className="gap-y-10 md:gap-y-0 grid grid-cols-1 md:grid-cols-2 py-10 md:py-12 border-b border-gray-400">
        <div className=" md:px-5 ">
          <h1 className=" text-3xl md:text-4xl tracking-wider font-semibold mb-3 ">
            About Artisan
          </h1>
          <div className="w-fit flex gap-x-3 mb-5">
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
          </div>
          <div className="text-sm sm:text-base flex flex-col gap-y-4 opacity-90 ">
            <p>
              It's just a moment in time - just one hand reaching over the
              counter to present a cup to another outstretched hand.
            </p>
            <p>
              We make sure everything we do honors that connection - from our
              commitment to the highest quality coffee in the world, to the way
              we engage with our customers and communities to do business
              responsibly.
            </p>
            <p>
              From our beginnings as a single store nearly forty years ago, in
              every place that we've been, and every place that we touch, we've
              tried to make it a little better than we found it.
            </p>
          </div>
        </div>
        <div className=" md:px-5 ">
          <h1 className=" text-xl md:text-2xl tracking-wider font-semibold mb-3 ">
            Our Mission
          </h1>
          <p className="text-sm sm:text-base opacity-90">
            To inspire and nurture the human spirit - one person, one cup and
            one neighborhood at a time
          </p>
          <div className=" w-full h-[1px] bg-gray-400 my-7"></div>
          <h1 className=" text-xl md:text-2xl tracking-wider font-semibold mb-3 ">
            Our Values
          </h1>
          <p className="text-sm sm:text-base opacity-90">
            With our partners, our coffee and our customers at our core, we live
            these values: Creating a culture of warmth and belonging, where
            everyone is welcome.
          </p>
        </div>
      </div>
      <div className="pt-5 pb-14 md:py-10">
        <h1 className=" text-2xl md:text-3xl text-center tracking-wider font-semibold mb-6 ">
          Gallery
        </h1>
        <div className="grid grid-cols-2">
          <LazyLoadImage
            className="h-full max-h-[270px] lg:max-h-[320px] w-full"
            src="images/shop6.jpg"
            alt=""
          />
          <LazyLoadImage
            className="h-full max-h-[270px] lg:max-h-[320px] w-full"
            src="images/shop5.jpg"
            alt=""
          />
          <LazyLoadImage
            className="h-full max-h-[270px] lg:max-h-[320px] w-full"
            src="images/shop3.jpg"
            alt=""
          />
          <LazyLoadImage
            className="h-full max-h-[270px] lg:max-h-[320px] w-full"
            src="images/shop4.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Story;
