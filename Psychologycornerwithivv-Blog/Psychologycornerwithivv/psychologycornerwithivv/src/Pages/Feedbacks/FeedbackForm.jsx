import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addFeedbackToDB,
  fetchFeedbacks,
} from "../../Store/slices/feedbackSlice";

const FeedbackForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addFeedbackToDB({ subject, description }));
      setSubject("");
      setDescription("");
      navigate("/feedbacks");
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };
  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  return (
    <div className=" mt-[100px] w-full  ">
      <h1 className="text-white text-[25px] font-bold text-center sm:text-[30px] md:text-[35px]">
        Here you can leave a feedback about my blog
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-[20px] flex justify-center flex-col items-center "
      >
        <input
          className="w-full md:w-[700px]  bg-transparent placeholder-white text-[15px] border-[2px] border-white p-[10px] rounded-[10px] mb-[20px]"
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={50}
        />
        <textarea
          className="w-full h-[100px] sm:h-[200px]  md:w-[700px] resize-none bg-transparent placeholder-white text-[15px] border-[2px] border-white p-[10px] rounded-[10px] mb-[20px]"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={120}
        ></textarea>
        <button
          className="w-[340px] text-white text-[20px] border-[2px] border-white p-[10px] rounded-md mt-[20px]"
          type="submit"
        >
          Add Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
