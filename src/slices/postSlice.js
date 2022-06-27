import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    post: {},
    posts: [],
    errors: [],
  },
  reducers: {
    getPostsSuccess: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        errors: [],
      };
    },
    requestFailed: (state, action) => {
      return {
        ...state,
        posts: [],
        errors: action.payload,
      };
    },
  },
});

// Reducer
export default postSlice.reducer;

// Action
export const { getPostsSuccess, requestFailed } = postSlice.actions;
