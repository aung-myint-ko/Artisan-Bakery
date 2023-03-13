import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function LoadingMessage() {
  return (
    <div
      className={`h-[calc(100vh_-_283px)] md:h-[calc(100vh_-_368px)] lg:h-full w-full flex flex-col justify-center items-center animate-pulse duration-300 ease-linear`}
    >
      <div className=" p-4 bg-slate-200 rounded-full mb-3">
        <LazyLoadImage className="w-20 h-20 " src="/images/icon.png" alt="" />
      </div>
      <h1 className=" text-lg tracking-wider capitalize ">
        please wait for a while...
      </h1>
    </div>
  );
}

export default LoadingMessage;
