import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = !!action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
