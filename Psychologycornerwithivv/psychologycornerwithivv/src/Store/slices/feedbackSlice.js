import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../utils/FirebaseConfig/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const initialState = {
  feedbacks: [],
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: initialState,
  reducers: {
    setFeedbacks: (state, action) => {
      state.feedbacks = action.payload;
    },
    addFeedback: (state, action) => {
      state.feedbacks.push(action.payload);
    },
    deleteSingleFeedback: (state, action) => {
      const filteredFeedbacks = state.feedbacks.filter(
        (feedback) => feedback.id !== action.payload
      );
      state.feedbacks = filteredFeedbacks;
    },
  },
});

export const { setFeedbacks, deleteSingleFeedback, addFeedback } =
  feedbackSlice.actions;

export const fetchFeedbacks = () => async (dispatch) => {
  try {
    const feedbacksCollection = collection(db, "feedbacks");
    const queySnapshot = await getDocs(feedbacksCollection);
    const feedbacksData = queySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setFeedbacks(feedbacksData));
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    throw error;
  }
};

export const addFeedbackToDB = (feedbackData) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "feedbacks"), feedbackData);
    dispatch(addFeedback({ id: docRef.id, ...feedbackData }));
  } catch (error) {
    console.error("Error adding feedback:", error);
    throw error;
  }
};

export const deleteFeedback = (feedbackID) => async (dispatch) => {
  try {
    const feedbackDocRef = doc(db, "feedbacks", feedbackID);
    await deleteDoc(feedbackDocRef);
    dispatch(deleteSingleFeedback(feedbackID));
  } catch (error) {
    console.error("Error deleting feedback:", error);
    throw error;
  }
};

export const feedbackReducer = feedbackSlice.reducer;
