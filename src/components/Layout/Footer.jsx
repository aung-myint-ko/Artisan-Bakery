import React from "react";
import { Link } from "react-router-dom";
import { BsClock } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import FooterAccordion from "./FooterAccordion";
import FooterDetails from "./FooterDetails";

function Footer(props) {
  const year = new Date().getFullYear();
  return (
    <>
      <div className=" px-4 md:px-14 lg:px-20 py-10 flex flex-col lg:grid lg:grid-cols-7 lg:gap-x-3 border-t-2 border-gray-200">
        <div className="md:mb-8 lg:mb-0 col-span-2">
          <Link to={"/"}>
            <h1 className="font_title font-bold text-4xl tracking-wider mb-4 ">
              Artisan
            </h1>
          </Link>
          <p className="mb-6 md:max-w-sm lg:max-w-[256px] text-sm opacity-90">
            Taste and hygenic is our first prioity. York House Lorem ipsum dolor
            sit amet.
          </p>
          <ul className=" flex gap-x-3 items-center">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" p-2 rounded-full bg-slate-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-500 "
            >
              <FaFacebookF size={20} className="text-white" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" p-2 rounded-full bg-slate-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-500 "
            >
              <FaInstagram size={20} className="text-white" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" p-2 rounded-full bg-slate-700 hover:-translate-y-1  hover:shadow-lg transition-all duration-500 "
            >
              <FaTwitter size={20} className="text-white" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" p-2 rounded-full bg-slate-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-500 "
            >
              <FaYoutube size={20} className="text-white" />
            </a>
          </ul>
        </div>

        {FooterDetails.map((details, index) => {
          return <FooterAccordion key={index} details={details} />;
        })}

        <div className="block md:hidden lg:block mt-8 md:mt-0 col-span-2">
          <h1 className=" mb-5 flex items-center text-2xl gap-x-2 font-semibold ">
            Opening Hours <BsClock size={27} />
          </h1>
          <div className="flex flex-col gap-y-3 opacity-90">
            <p>
              <span className=" text-lg font-semibold">Mon - Sat: </span> 9AM to
              8PM
            </p>
            <p>
              <span className=" text-lg font-semibold">Sun: </span>9AM to 9PM
            </p>
            <p>
              <span className=" text-lg font-semibold">Delivery: </span>9AM to
              5PM
            </p>
          </div>
        </div>

        <div className="block md:hidden lg:block mt-8 md:mt-0 col-span-2">
          <h1 className="mb-5 flex items-center text-2xl gap-x-2 font-semibold ">
            Location <MdLocationPin size={27} />
          </h1>
          <div className="flex flex-col gap-y-3 opacity-90">
            <p className="text-lg">
              No. 1a York House 26 Edgware <br /> Road London, ENG W2 2EH
            </p>
            <p>
              <span className=" text-lg font-semibold">Call: </span>+959 789
              8888 99
            </p>
          </div>
        </div>

        <div className="block md:hidden lg:block mt-8 md:mt-0">
          <h1 className="mb-5 flex items-center text-2xl gap-x-2 font-semibold ">
            Navigation
          </h1>
          <ul className=" flex md:flex-col items-center md:items-start gap-x-3 md:gap-y-3 list-none tracking-wide opacity-90 ">
            <Link to={"/menu/all"}>
              <li className="nav_active">Menu</li>
            </Link>
            <span className=" md:hidden w-[6px] h-[6px] rounded-full bg-[#974103]"></span>
            <Link to={"/shop"}>
              <li className="nav_active">Shop</li>
            </Link>
            <span className=" md:hidden w-[6px] h-[6px] rounded-full bg-[#974103]"></span>
            <Link to={"/about"}>
              <li className="nav_active">About</li>
            </Link>
            <span className=" md:hidden w-[6px] h-[6px] rounded-full bg-[#974103]"></span>
            <Link to={"/reviews"}>
              <li className="nav_active">Reviews</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className=" mx-4 md:mx-14 lg:mx-20 text-sm md:text-base border-t-2 border-gray-300 pt-6 pb-11 opacity-90 ">
        <p>© {year} Artisan Bakery Company. All rights reserved.</p>
      </div>
    </>
  );
}

export default Footer;
