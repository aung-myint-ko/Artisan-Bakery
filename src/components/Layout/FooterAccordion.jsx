import React, { useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const FooterAccordion = ({ details }) => {
  const { header, desc, links } = details;

  const [clicked, setClicked] = useState(false);
  const [height, setHeight] = useState(null);
  const contentEl = useRef();
  useEffect(() => {
    setHeight(contentEl.current.scrollHeight);
  }, []);

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  return (
    <li
      className={`accordion_item hidden md:block lg:hidden ${
        clicked ? "active" : ""
      }`}
    >
      <button className="heading" onClick={handleToggle}>
        {header}
        <span>
          {clicked ? <IoIosArrowUp size={22} /> : <IoIosArrowDown size={22} />}
        </span>
      </button>

      <div
        ref={contentEl}
        className="answer_wrapper"
        style={clicked ? { height: `${height}px` } : { height: "0px" }}
      >
        {links && (
          <ul className=" answer flex md:flex-col items-center md:items-start gap-x-3 md:gap-y-3 list-none tracking-wide opacity-90 ">
            {links.map((link, index) => {
              return (
                <Link key={index} to={`/${link}`}>
                  <li className="nav_active capitalize">{link}</li>
                </Link>
              );
            })}
          </ul>
        )}
        {desc && (
          <div className="answer flex flex-col gap-y-3 opacity-80">
            {desc.map((text, index) => {
              return (
                <p key={index}>
                  <span className=" text-lg font-semibold">{text.day} </span>
                  {text.time}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </li>
  );
};

export default FooterAccordion;
