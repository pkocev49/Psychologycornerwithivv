import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import Fade from "react-reveal";
import "./NavBar.css";
const NavBar = ({ menu, setMenu }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="flex justify-between items-center  ">
      <Fade left>
        <Link to="/">
          <h1
            id="navText"
            className=" border-b-[2px] border-[#7B3F00] ml-[19px] p-[10px] cursor-pointer text-[#7B3F00] font-bold text-[25px] xsm:text-[30px] sm:text-[36px] hover:scale-110 capitalize duration-300"
          >
            Psychologycornerwithivv
          </h1>
        </Link>
      </Fade>

      <div className="hidden lg:flex border-b-[2px] border-[#7B3F00] mr-[10px] p-[10px] mt-[8px]  ">
        <Fade top>
          <Link
            className="px-4 cursor-pointer text-[#7B3F00]  text-[30px]  mr-[10px]"
            to="blogs"
          >
            Blog
          </Link>
        </Fade>
        <Fade top>
          <Link
            className="px-4 cursor-pointer text-[#7B3F00]  text-[30px]  mr-[10px]"
            to="feedbacks"
          >
            Feedbacks
          </Link>
        </Fade>

        {!user && (
          <Fade top>
            <Link
              className="px-4 cursor-pointer text-[#7B3F00]  text-[30px] mr-[10px]"
              to="/login"
            >
              Login
            </Link>
          </Fade>
        )}

        {user && (
          <Fade top>
            <Link
              className="px-4 cursor-pointer text-[#7B3F00]  text-[30px] mr-[10px]"
              to="/addBlog"
            >
              Add Blog
            </Link>
          </Fade>
        )}
      </div>
      <div
        onClick={() => setMenu(!menu)}
        className="cursor-pointer pr-4 z-10 text-[#7B3F00] lg:hidden"
      >
        {menu ? <FaTimes size={30} /> : <FaBars size={30} />}{" "}
      </div>
      {menu && (
        <div className="lg:hidden fixed inset-0 bg-[#CBCBB4]">
          <div className="flex flex-col justify-center items-center mt-[150px]">
            <Fade left>
              <>
                <Link
                  className=" cursor-pointer text-[#7B3F00] font-medium text-3xl  "
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
                  className=" cursor-pointer text-[#7B3F00] font-medium text-3xl  "
                  to="/feedbacks"
                  onClick={() => setMenu(!menu)}
                >
                  Feedbacks
                </Link>
              </>
            </Fade>
            {!user && (
              <Fade left>
                <Link
                  className="px-4 cursor-pointer text-[#7B3F00] font-medium text-3xl hover:scale-110 capitalize duration-200 mr-[10px]"
                  to="/login"
                  onClick={() => setMenu(!menu)}
                >
                  Login
                </Link>
              </Fade>
            )}

            {user && (
              <Fade left>
                <Link
                  className=" cursor-pointer text-[#7B3F00] font-medium text-3xl"
                  to="/addBlog"
                  onClick={() => setMenu(!menu)}
                >
                  Add Blog
                </Link>
              </Fade>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
