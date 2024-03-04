import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import Fade from "react-reveal";

const NavBar = ({ menu, setMenu }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="flex justify-between items-center mt-[10px] ">
      <Link to="/">
        <h1 className="p-[10px] cursor-pointer text-white font-bold xsm:text-[25px] sm:text-3xl hover:scale-110 capitalize duration-200">
          Psychologycornerwithivv
        </h1>
      </Link>
      <div className="hidden md:flex">
        <Link
          className="px-4 cursor-pointer text-white font-medium text-2xl hover:scale-110 capitalize duration-200"
          to="blogs"
        >
          Blog
        </Link>
        <Link
          className="px-4 cursor-pointer text-white font-medium text-2xl hover:scale-110 capitalize duration-200"
          to="feedbacks"
        >
          Feedbacks
        </Link>

        {user && (
          <>
            <Link
              className="px-4 cursor-pointer text-white font-medium text-2xl hover:scale-110 capitalize duration-200"
              to="/addBlog"
            >
              Add Blog
            </Link>
          </>
        )}
      </div>
      <div
        onClick={() => setMenu(!menu)}
        className="cursor-pointer pr-4 z-10 text-white md:hidden"
      >
        {menu ? <FaTimes size={30} /> : <FaBars size={30} />}{" "}
      </div>
      {menu && (
        <div className="lg:hidden fixed inset-0 bg-[#CBCBB4]">
          <div className="flex flex-col justify-center items-center mt-[150px]">
            <Fade left>
              <>
                <Link
                  className=" cursor-pointer text-white font-medium text-3xl  "
                  to="/blogs"
                  onClick={() => setMenu(!menu)}
                >
                  Blog
                </Link>
              </>
            </Fade>
            <Fade left>
              <>
                <Link
                  className=" cursor-pointer text-white font-medium text-3xl  "
                  to="/feedbacks"
                  onClick={() => setMenu(!menu)}
                >
                  Feedbacks
                </Link>
              </>
            </Fade>

            {user && (
              <Fade left>
                <>
                  <Link
                    className=" cursor-pointer text-white font-medium text-3xl"
                    to="/addBlog"
                    onClick={() => setMenu(!menu)}
                  >
                    Add Blog
                  </Link>
                </>
              </Fade>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
