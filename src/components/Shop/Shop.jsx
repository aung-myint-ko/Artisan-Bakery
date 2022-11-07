import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import ShopLocation from "./ShopLocation";
import ShopLocationDetails from "./ShopLocationDetails";

function Shop() {
  const { clicked, totalShops } = useSelector((state) => state.shopReducer);
  return (
    <>
      <div className="px-4 md:px-14 lg:px-20 py-10 md:py-12  ">
        <div className="mx-4 md:mx-0 lg:mx-20 border-b border-gray-400 ">
          <h1 className=" text-3xl md:text-4xl text-center tracking-wider font-semibold mb-3 ">
            Shops
          </h1>
          <div className=" mx-auto w-fit flex gap-x-3 mb-5">
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
          </div>
          <p className=" text-sm md:text-lg tracking-wide mb-3 opacity-90">
            Artisan Bakery expanded to 21 stores across India in financial year
            2021. Artisan Bakery launched in India with a 50:50 joint venture
            between Tata Consumer Products Limited (formerly Tata Global
            Beverages Limited) and Artisan Bakery Company, and became Tata
            Artisan Bakery Private Limited.
          </p>
          <p className=" text-sm md:text-lg tracking-wide mb-10 opacity-90">
            The first stores opened in the city of Mumbai in the financial year
            2013. By 2021, the coffee chain was present in 18 Indian cities. The
            200th store was opened in Amritsar in October 2020.
          </p>
        </div>

        <div className="pt-8 md:pt-10 mx-4 md:mx-0 lg:mx-20 border-b border-gray-400">
          <h1 className=" text-3xl md:text-4xl text-center tracking-wider font-semibold mb-3 ">
            Junction City - Main Branch
          </h1>
          <div className=" mx-auto w-fit flex gap-x-3 mb-6 ">
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:mx-20 items-center ">
            <LazyLoadImage src="/images/shop1.jpg" alt="" />
            <div className="md:px-8 pt-5 lg:pt-8 pb-9 lg:pb-10">
              <h1 className=" text-2xl font-semibold mb-3 tracking-wider">
                Location
              </h1>
              <p className="opacity-90 mb-1 ">
                No. 1a York House 26 Edgware Road London, ENG W2 2EH
              </p>
              <p className="opacity-90 mb-5">Call: +959 789 8888 99</p>
              <h1 className=" text-2xl font-semibold mb-3 tracking-wider">
                Opening Hours
              </h1>
              <p className="opacity-90 mb-1 ">Mon - Fri : 9AM to 10PM</p>
              <p className="opacity-90 mb-5 ">Sat & Sun : 9AM to 11PM</p>
              <p className="opacity-95 italic text-sm">
                * We are only offering pickup services at this location, please
                kindly let us know beforehand of your visit!
              </p>
            </div>
          </div>
        </div>
        <div className=" pt-8 pb-5 md:py-10">
          <h1 className=" text-3xl md:text-4xl text-center font-semibold  tracking-wider mb-2">
            Other Branches
          </h1>
          <div className=" mx-auto w-fit flex gap-x-3 mb-6">
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
            <span className=" w-2 h-2 bg-[#974103] rounded-sm rotate-45"></span>
          </div>
          {clicked ? (
            <ShopLocationDetails />
          ) : (
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {totalShops.map((shop, index) => (
                <ShopLocation key={index} shopDetails={shop} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Shop;
