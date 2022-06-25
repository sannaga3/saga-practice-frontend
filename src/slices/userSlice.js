import { createSlice } from "@reduxjs/toolkit";

// Sliceを生成(name,initialState,reducersを引数に持つ)
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    errors: [],
  },
  reducers: {
    loginSuccess: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
        errors: {},
      };
    },
    loginFailure: (state, action) => {
      return {
        ...state,
        currentUser: {},
        errors: action.payload,
      };
    },
    logoutSuccess: (state) => {
      return {
        ...state,
        currentUser: {},
        errors: {},
      };
    },
    logoutFailure: (state, action) => {
      return {
        ...state,
        errors: action.payload,
      };
    },
  },
});

// Reducer
export default userSlice.reducer;

// Action
export const { loginSuccess, loginFailure, logoutSuccess, logoutFailure } =
  userSlice.actions;
