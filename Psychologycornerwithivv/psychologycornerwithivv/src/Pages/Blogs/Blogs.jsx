import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBlogs } from "../../Store/selectors/blogSelector";
import { fetchBlogs } from "../../Store/slices/blogSlice";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";
const Loader = () => (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center  z-50">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-100 h-12 w-12 mb-4"></div>
  </div>
);
const Blogs = ({ menu }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchBlogs())
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);
  const handleMoreDetailsClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };
  return (
    <div>
      <div className="w-full p-[25px] mt-[20px]  4xl:w-[1100px] mt-[100px]   ">
        {isLoading ? (
          <Loader />
        ) : (
          blogs.map((blog, index) => (
            <div
              key={`${blog.id}-${index}`}
              className=" border-b-[2px] border-[#7B3F00] p-[20px] "
            >
              {!menu && (
                <Fade left>
                  <h2 className="text-[#7B3F00] font-bold text-[25px] 2xl:text-[30px]">
                    {blog.title}
                  </h2>
                  <h3 className=" text-[#7B3F00] font-medium xl:text-[20px]">
                    {blog.description.substring(0, 10)}...
                  </h3>
                  <button
                    className="mb-[30px] border-[2px] border-[#7B3F00] font-bold  p-[5px] rounded-[10px] text-[#80461B] xl:w-[150px] mt-[10px] hover:text-white hover:scale-110 transition duration-300 "
                    onClick={() => {
                      handleMoreDetailsClick(blog.id);
                    }}
                  >
                    More Details
                  </button>
                </Fade>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;
