import { createSlice, createSelector } from "@reduxjs/toolkit";
import { clearError } from "../util/handleErrors";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    postsStatus: "idle",
    postsType: "AllPosts",
    errors: { status: false, messages: [], id: null },
  },
  reducers: {
    getPostsSuccess: (state, action) => {
      state.posts = [...action.payload];
      state.postsStatus = "complete";
      state.errors = clearError();
    },
    storePostSuccess: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.errors = clearError();
    },
    updatePostSuccess: (state, action) => {
      const target = findIndexById(state, action.payload[0].id);
      state.posts.splice(target, 1, action.payload[0]);
      state.errors = clearError();
    },
    deletePostSuccess: (state, action) => {
      const userId = findIndexById(state, parseInt(action.payload.user_id));
      state.posts.splice(userId, 1);
      state.errors = clearError();
    },
    changePostsType: (state, action) => {
      state.postsType = action.payload;
      state.errors = clearError();
    },
    requestFailed: (state, action) => {
      state.errors = {
        status: action.payload.status,
        messages: action.payload.messages,
        id: action.payload.id ?? null,
      };
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
  deletePostSuccess,
  changePostsType,
  requestFailed,
} = postSlice.actions;

const findIndexById = (state, postId) =>
  state.posts.findIndex((post) => post.id === postId);

// Selector
// セレクタを一元化することで、毎回useSelectorでネストしたstateを取得しなくて済む
export const selectAllPosts = (state) => state.post.posts;

/*  createSelectorを用いたuseSelectorのメモ化。reselectというライブラリだが、redux-toolkitで標準装備。
    書き方 => createSelector(第一引数, 第二引数)
    第１引数をinputと呼ぶ。監視に必要な要素をstateから取得する。=> [selectAllPosts, (state, userId) => userId] の部分がセレクタとして監視される。postsとuserが変わらなければ再計算しない。
    第２引数がセレクタを元に実行する関数。[selectAllPosts, (state, userId) => userId] の監視対象から(posts, userId)の引数を生成し、計算して返す   */
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user_id === userId)
);

//----------------------------------------------------------------------------
// createSliceとimmer
//----------------------------------------------------------------------------

/*
  createSlice内部ではimmerが適用されている為、暗黙のreturn{}の中でreturnは必要ない。returnしてしまうとproxyが返りエラーになる。

  以下失敗例
  updatePostSuccess: (state, action) => {
    const target = findIndexById(state, action.payload[0].id);
    const updatedPosts = state.posts.splice(
      target,
      1,
      action.payload[0]
    );
    return {
      ...currentState,
      posts: updatedPosts,
      errors: [],
    };
  }

  immerの回避方法は複数ある

  方法1  一番楽そうなので採用
  returnで返さずに必要なステートのみに変更を加える(必要ならば複数のステートを更新する)

  ----------------------------------------------------------------------------

  方法２
  reducerを外部に関数化することでimmerの適用範囲から外れる
  const updatedPosts = (state, action) => {
    const target = findIndexById(state, action.payload[0].id);
    console.log(target, state.posts, action.payload[0]);
    state.posts.splice(target, 1, action.payload[0]);
  };

  reducers: {
  updatePostSuccess: updatedPosts,
  }

  ----------------------------------------------------------------------------

  方法3
  currentを使う。 stateにアクセスできるようになるが、他の方法より遠回り?
  import { createSlice, current } from "@reduxjs/toolkit";

  const updatedPosts = (state, action) => {
    const currentState = current(state);
    const target = findIndexById(currentState, action.payload[0].id);
    console.log(target, currentState.posts, action.payload[0]);
    const updatedPosts = currentState.posts.splice(
      target,
      1,
      action.payload[0]
    );
  }
*/

//----------------------------------------------------------------------------
// reselectについて
//----------------------------------------------------------------------------

/*
  githubのREADMEより
  https://github.com/reduxjs/reselect#createselectorinputselectors--inputselectors-resultfunc

  複数のセレクタを引数に持ち、返す値が変わらなければ再レンダリングされない
  const selectValue = createSelector(
    state => state.values.value1,  セレクタ１
    state => state.values.value2,  セレクタ２
    (value1, value2) => value1 + value2  (引数１, 引数２)
  )

  // You can also pass an array of selectors
  const selectTotal = createSelector(
    [state => state.values.value1, state => state.values.value2],
    (value1, value2) => value1 + value2
  )
*/

/*
  reduxの公式より
  https://redux.js.org/usage/deriving-data-selectors


  const selectItems = state => state.items
  const selectItemId = (state, itemId) => itemId

  const selectItemById = createSelector(
    [selectItems, selectItemId],
    (items, itemId) => items[itemId]
  )

  const item = selectItemById(state, 42)
  /*

  /*
  Internally, Reselect does something like this:

  const firstArg = selectItems(state, 42);  
  const secondArg = selectItemId(state, 42);  
    
  const result = outputSelector(firstArg, secondArg);  
  return result;  
*/
