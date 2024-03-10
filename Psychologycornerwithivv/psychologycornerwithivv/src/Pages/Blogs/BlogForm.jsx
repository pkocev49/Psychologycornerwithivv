import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBlogToDB, fetchBlogs } from "../../Store/slices/blogSlice";
import { useNavigate } from "react-router-dom";
const BlogForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addBlogToDB({ title, description }));
      setTitle("");
      setDescription("");
      navigate("/blogs");
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchBlogs);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-[20px] flex justify-center flex-col items-center mt-[100px]"
    >
      <input
        className="w-full md:w-[700px]  bg-transparent placeholder-[#80461B] text-[15px] border-[2px] border-[#7B3F00] p-[10px] rounded-[10px] mb-[20px]"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full h-[100px] sm:h-[200px]  md:w-[700px] resize-none bg-transparent placeholder-[#80461B] text-[15px] border-[2px] border-[#7B3F00] p-[10px] rounded-[10px] mb-[20px]"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        className="w-[340px] text-[#80461B] text-[20px] border-[2px] border-[#7B3F00] p-[10px] rounded-md mt-[20px]"
        type="submit"
      >
        Add Blog
      </button>
    </form>
  );
};

export default BlogForm;
