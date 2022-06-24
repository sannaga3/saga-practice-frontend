import { createSlice } from "@reduxjs/toolkit";

// Sliceを生成(name,initialState,reducersを引数に持つ)
const userSlice = createSlice({
  name: "user",
  initialState: {
    setUser: {},
    errors: [],
  },
  reducers: {
    loginSuccess: (state, action) => {
      return {
        ...state,
        setUser: action.payload,
        errors: {},
      };
    },
    loginFailure: (state, action) => {
      return {
        ...state,
        setUser: {},
        errors: action.payload,
      };
    },
    logoutSuccess: (state) => {
      return {
        ...state,
        setUser: {},
      };
    },
  },
});

// Reducer
export default userSlice.reducer;

// Action
export const { loginSuccess, loginFailure, logoutSuccess } = userSlice.actions;
