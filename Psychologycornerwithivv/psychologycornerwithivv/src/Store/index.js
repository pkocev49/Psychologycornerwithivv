import { configureStore } from "@reduxjs/toolkit";
import { blogReducer } from "./slices/blogSlice";
import { feedbackReducer } from "./slices/feedbackSlice";
import { authReducer } from "./slices/authSlice";
const store = configureStore({
  reducer: {
    blog: blogReducer,
    feedback: feedbackReducer,
    auth: authReducer,
  },
});

export default store;
