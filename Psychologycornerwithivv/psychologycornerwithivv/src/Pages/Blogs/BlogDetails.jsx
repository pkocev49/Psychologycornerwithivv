import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlog,
  fetchBlogs,
  updateSingleBlog,
} from "../../Store/slices/blogSlice";
import { selectBlogs } from "../../Store/selectors/blogSelector";
import { useNavigate, useParams } from "react-router-dom";
import { Fade } from "react-reveal";

const BlogDetails = ({ menu }) => {
  const user = useSelector((state) => state.auth.user);
  const [blog, setBlog] = useState({ title: "", description: "" });
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const navigate = useNavigate();
  const { blogId } = useParams();
  const foundBlog = blogs.find((blog) => blog.id === blogId);

  useEffect(() => {
    if (blogs) {
      dispatch(fetchBlogs());
    }
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteBlog(foundBlog.id));
    navigate("/blogs");
  };
  const handleEdit = () => {
    setBlog(foundBlog);
    setEditMode(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      dispatch(
        updateSingleBlog(blogId, {
          title: blog.title,
          description: blog.description,
        })
      );
      setEditMode(false);
      navigate("/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
    }

    setEditMode(true);
  };

  return (
    <div className="w-full p-[50px] mt-[20px]  4xl:w-[1600px]   ">
      {foundBlog ? (
        <>
          {!editMode ? (
            <>
              <div>
                {!menu && (
                  <Fade top>
                    <h2 className="mb-[20px] text-white font-bold text-[25px] 2xl:text-[30px]">
                      {foundBlog.title}
                    </h2>
                    <h3 className=" text-white font-medium xl:text-[20px] whitespace-normal  ">
                      {foundBlog.description.split("\n").map((line, index) => (
                        <React.Fragment key={index + 1}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </h3>
                  </Fade>
                )}
              </div>

              {user && (
                <>
                  <button
                    onClick={handleDelete}
                    className=" mt-[20px] mb-[30px] mr-[20px] border-[1.5px] border-white  p-[5px] rounded-[10px] text-white xl:w-[80px]"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleEdit}
                    className=" mt-[20px] mb-[30px] border-[1.5px] border-white  p-[5px] rounded-[10px] text-white xl:w-[80px]"
                  >
                    Update
                  </button>
                </>
              )}
            </>
          ) : (
            <form className="p-[20px] flex justify-center flex-col items-center mt-[100px] 4xl:ml-[600px] 8xl:ml-[800px] 16xl:ml-[1100px]">
              <input
                className="w-full md:w-[700px]  bg-transparent placeholder-white text-[15px] border-[2px] border-white p-[10px] rounded-[10px] mb-[20px] "
                type="text"
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              />
              <textarea
                className="w-full h-[100px] sm:h-[200px]  md:w-[700px] resize-none bg-transparent placeholder-white text-[15px] border-[2px] border-white p-[10px] rounded-[10px] mb-[20px]"
                value={blog.description}
                onChange={(e) =>
                  setBlog({ ...blog, description: e.target.value })
                }
              />
              <button
                onClick={handleSave}
                className="w-[340px] text-white text-[20px] border-[2px] border-white p-[10px] rounded-md mt-[20px]"
              >
                Save
              </button>
            </form>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetails;
