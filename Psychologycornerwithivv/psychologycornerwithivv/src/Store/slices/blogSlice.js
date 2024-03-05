import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../utils/FirebaseConfig/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
const initialState = {
  blogs: [],
};

export const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    updateBlog: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.blogs.findIndex((blog) => blog.id === id);
      if (index !== -1) {
        state.blogs[index] = { ...state.blogs[index], ...newData };
      }
    },
    deleteSingleBlog: (state, action) => {
      const filteredBlogs = state.blogs.filter(
        (blog) => blog.id !== action.payload
      );
      state.blogs = filteredBlogs;
    },
  },
});

export const { setBlogs, deleteSingleBlog, updateBlog, addBlog } =
  blogSlice.actions;

// Thunk action to fetch blogs from Firestore

export const fetchBlogs = () => async (dispatch) => {
  try {
    const blogsCollection = collection(db, "blogs");
    const queySnapshot = await getDocs(blogsCollection);
    const blogsData = queySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setBlogs(blogsData));
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};

export const addBlogToDB = (blogData) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "blogs"), blogData);

    dispatch(addBlog({ id: docRef.id, ...blogData }));
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
};

export const deleteBlog = (blogID) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "blogs", blogID));
    dispatch(deleteSingleBlog(blogID)); // Dispatch deleteBlog action from slice
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
};
export const updateSingleBlog = (blogId, newData) => async (dispatch) => {
  try {
    const blogDocRef = doc(db, "blogs", blogId); // Get document reference
    await updateDoc(blogDocRef, newData); // Pass document reference and newData
    dispatch(updateBlog({ id: blogId, newData })); // Dispatch updateBlog action
  } catch (error) {
    console.error("Error updating blog:", error);
  }
};
export const blogReducer = blogSlice.reducer;
