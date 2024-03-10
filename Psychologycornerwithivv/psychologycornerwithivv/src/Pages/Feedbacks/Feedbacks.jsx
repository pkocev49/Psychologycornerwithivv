import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFeedbacks } from "../../Store/selectors/feedbackSelector";
import {
  deleteFeedback,
  fetchFeedbacks,
} from "../../Store/slices/feedbackSlice";
import { Fade } from "react-reveal";
import { useNavigate } from "react-router-dom";

const Loader = () => (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center  z-50">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-100 h-12 w-12 mb-4"></div>
  </div>
);

const Feedbacks = ({ menu }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const feedbacks = useSelector(selectFeedbacks);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchFeedbacks())
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (blogID) => {
    dispatch(deleteFeedback(blogID));
  };

  const handleNavigate = () => {
    navigate("/addFeedback");
  };

  return (
    <div>
      <h1 className="text-center text-[#7B3F00] font-bold mt-[30px] text-[28px] lg:text-[35px] 2xl:text-[40px] ">
        These are some of the feedbacks left about my blog
      </h1>

      <div className="w-full p-[25px] mt-[20px] 4xl:w-[1400px]   ">
        {isLoading ? (
          <Loader />
        ) : (
          feedbacks.map((feedback, index) => (
            <div
              key={`${feedback.id}-${index}`}
              className="mb-[25px] border-b-[2px] border-[#7B3F00] p-[20px]"
            >
              {!menu && (
                <>
                  <Fade left>
                    <h2 className="text-[#7B3F00] font-bold text-[25px] 2xl:text-[30px]">
                      {feedback.subject}
                    </h2>
                    <h3 className="text-[#80461B] font-medium xl:text-[20px]">
                      {feedback.description}
                    </h3>
                  </Fade>
                </>
              )}

              {user && (
                <>
                  {!menu && (
                    <Fade left>
                      <button
                        className="mb-[30px] border-[1.5px] border-[#7B3F00]  p-[5px] rounded-[10px] text-white xl:w-[80px]"
                        onClick={() => {
                          handleDelete(feedback.id);
                        }}
                      >
                        Delete
                      </button>
                    </Fade>
                  )}
                </>
              )}
            </div>
          ))
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <button
            onClick={handleNavigate}
            className="w-full sm:w-[500px] text-[#80461B] border-[2px] border-[#7B3F00] p-[8px] rounded-[10px] font-bold text-[20px] "
          >
            Leave a feedback
          </button>
        )}
      </div>
    </div>
  );
};

export default Feedbacks;
