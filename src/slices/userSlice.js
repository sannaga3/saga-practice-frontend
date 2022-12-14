import { createSlice } from "@reduxjs/toolkit";
import { clearError } from "../util/handleErrors";

// Sliceを生成(name,initialState,reducersを引数に持つ)
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    errors: { status: false, messages: [], id: null },
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.errors = clearError();
    },
    signupSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.errors = clearError();
    },
    requestFailed: (state, action) => {
      state.currentUser = {};
      state.errors = {
        status: action.payload.status,
        messages: action.payload.messages,
        id: action.payload.id ?? null,
      };
    },
  },
});

// Reducer
export default userSlice.reducer;

// Action
export const { loginSuccess, signupSuccess, requestFailed } = userSlice.actions;

// Selector
export const selectCurrentUser = (state) => state.user.currentUser;

// 下記が通常のreducerの書き方。return内部で変更するstateの階層を全てコピーし、再生成している。
// createSliceではstateに対してコールバックでimmerが適用されており、stateの変更を追跡してコピーを生成する。
// 詳細はredux-toolkitの公式  https://redux-toolkit.js.org/usage/immer-reducers

// reducers: {
//   loginSuccess: (state, action) => {
//     return {
//       ...state,
//       currentUser: action.payload,
//       errors: {},
//     };
//   },
//   logoutSuccess: (state) => {
//     return {
//       ...state,
//       currentUser: {},
//       errors: {},
//     };
//   },
//   signupSuccess: (state, action) => {
//     return {
//       ...state,
//       currentUser: action.payload,
//       errors: {},
//     };
//   },
//   requestFailed: (state, action) => {
//     return {
//       ...state,
//       currentUser: {},
//       errors: action.payload,
//     };
//   },
// },
