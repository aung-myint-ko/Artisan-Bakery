import React from "react";

function PageLoading() {
  return (
    <div className=" fixed w-full h-screen top-0 flex flex-col justify-center items-center bg-white z-50 ">
      <div className=" p-4 bg-slate-200 rounded-full mb-7 animate-pulse duration-100">
        <img className="w-20 h-20 " src="/images/icon.png" alt="" />
      </div>

      <img className="w-[200px]  " src="/images/loading.gif" alt="" />
    </div>
  );
}

export default PageLoading;
