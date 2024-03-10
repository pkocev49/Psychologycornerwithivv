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
    <div className=" flex justify-center mt-[100px]">
      <div className="text-center sm:ml-[0px]">
        {!menu && (
          <>
            <Fade top cascade>
              <h1 className="text-[#7B3F00] text-[32px] font-bold sm:text-5xl 2xl:text-7xl font-serif">
                Welcome to my Blog
              </h1>
            </Fade>
            <Fade top>
              <p className="text-[#7B3F00] text-2xl font-medium mt-[10px] 2xl:text-4xl">
                My name is <b>Ivana Kotseva</b>
              </p>
              <p className=" mb-[40px] text-[#7B3F00] p-[5px] text-2xl mt-[20px] font-medium 2xl:text-3xl 2xl:w-[900px]">
                Dive into the world of psychology with me as we explore the
                mind's wonders and unravel its mysteries together.
              </p>
            </Fade>
            <Fade bottom>
              <button
                onClick={handleNavigate}
                className="w-[350px] sm:w-[600px] text-[#7B3F00] border-[3px] border-[#7B3F00] p-[8px] rounded-[10px] font-bold text-[20px] hover:text-white hover:bg-[#7B3F00] hover:scale-110 transition duration-300"
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
