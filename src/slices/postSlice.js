import { createSlice, createSelector } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    post: {},
    posts: [],
    postsStatus: "idle",
    errors: {},
  },
  reducers: {
    getPostsSuccess: (state, action) => {
      state.posts = [...action.payload];
      state.postsStatus = "complete";
      state.errors = {};
    },
    storePostSuccess: (state, action) => {
      state.posts = [...state.posts, action.payload];
      state.errors = {};
    },
    updatePostSuccess: (state, action) => {
      const target = findIndexById(state, action.payload[0].id);
      state.posts.splice(target, 1, action.payload[0]);
      state.errors = {};
    },
    requestFailed: (state, action) => {
      state.errors = action.payload;
      state.posts.postsStatus = "idle";
    },
  },
});

// Reducer
export default postSlice.reducer;

// Action
export const {
  getPostsSuccess,
  storePostSuccess,
  updatePostSuccess,
  requestFailed,
} = postSlice.actions;

const findIndexById = (state, postId) =>
  state.posts.findIndex((post) => post.id === postId);

//----------------------------------------------------------------------------

// createSliceとimmer

// createSlice内部ではimmerが適用されておりstateが保護されている為、stateに変更を加えてからreturnするとproxyが返りエラーになる。

// 以下失敗例
// updatePostSuccess: (state, action) => {
//   const target = findIndexById(state, action.payload[0].id);
//   const updatedPosts = state.posts.splice(
//     target,
//     1,
//     action.payload[0]
//   );
//   return {
//     ...currentState,
//     posts: updatedPosts,
//     errors: [],
//   };
// }

// immerの回避方法は複数ある

// 方法1  一番楽そうなので採用
// returnで返さずに必要なステートのみに変更を加える(必要ならば複数のステートを更新する)

//----------------------------------------------------------------------------

// 方法２
// reducerを外部に関数化することでimmerの適用範囲から外れる
// const updatedPosts = (state, action) => {
//   const target = findIndexById(state, action.payload[0].id);
//   console.log(target, state.posts, action.payload[0]);
//   state.posts.splice(target, 1, action.payload[0]);
// };

// reducers: {
//  updatePostSuccess: updatedPosts,
// }

//----------------------------------------------------------------------------

// 方法3
// currentを使う。 stateにアクセスできるようになるが、他の方法より遠回り?
// import { createSlice, current } from "@reduxjs/toolkit";

// const updatedPosts = (state, action) => {
//   const currentState = current(state);
//   const target = findIndexById(currentState, action.payload[0].id);
//   console.log(target, currentState.posts, action.payload[0]);
//   const updatedPosts = currentState.posts.splice(
//     target,
//     1,
//     action.payload[0]
//   );
// }

//----------------------------------------------------------------------------
