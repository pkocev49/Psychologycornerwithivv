import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./Components/Header/NavBar";
import Home from "./Pages/Home/Home";
import Blogs from "./Pages/Blogs/Blogs";
import BlogDetails from "./Pages/Blogs/BlogDetails";
import BlogForm from "./Pages/Blogs/BlogForm";
import Login from "./Pages/Login/Login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "./Store/slices/authSlice";
import Feedbacks from "./Pages/Feedbacks/Feedbacks";
import FeedbackForm from "./Pages/Feedbacks/FeedbackForm";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  const [menu, setMenu] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      dispatch(setUser(userData));
    }
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <NavBar menu={menu} setMenu={setMenu} />
        <div>
          <Routes>
            <Route path="/" element={<Home menu={menu} />} />
            <Route path="/blogs" element={<Blogs menu={menu} />} />
            <Route
              path="/addBlog"
              element={user ? <BlogForm /> : <Navigate to="/" />}
            />
            <Route path="/feedbacks" element={<Feedbacks menu={menu} />} />
            <Route path="/addFeedback" element={<FeedbackForm />} />

            <Route
              path="/blogs/:blogId"
              element={<BlogDetails menu={menu} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
