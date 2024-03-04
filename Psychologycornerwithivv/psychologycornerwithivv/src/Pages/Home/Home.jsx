import React from "react";

import { useNavigate } from "react-router-dom";
import Fade from "react-reveal";
import "./Home.css";
const Home = ({ menu }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/addFeedback");
  };
  return (
    <div className="mt-[200px] flex justify-center">
      <div className="text-center sm:ml-[0px]">
        {!menu && (
          <>
            <Fade top>
              <h1 className="text-white text-[32px] font-bold sm:text-5xl 2xl:text-7xl">
                Welcome to my Blog
              </h1>
            </Fade>
            <Fade top>
              <p className="text-white text-2xl font-medium mt-[10px] 2xl:text-4xl">
                My name is Ivana Kotseva
              </p>
              <p className=" mb-[40px] text-white p-[5px] text-2xl mt-[20px] font-medium 2xl:text-3xl 2xl:w-[900px]">
                Dive into the world of psychology with me as we explore the
                mind's wonders and unravel its mysteries together.
              </p>
            </Fade>
            <Fade bottom>
              <button
                onClick={handleNavigate}
                className="w-[350px] sm:w-[600px]  text-white border-[3px] border-white p-[8px] rounded-[10px] font-bold text-[20px]  "
              >
                If you enjoy my blog leave me a feedback
              </button>
            </Fade>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
