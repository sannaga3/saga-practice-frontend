import { combineReducers } from "redux";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";

// stateが初期状態のappReducerを作成しておく
const appReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

// ログアウト処理で dispatch({ type: "LOGOUT" } とすると、rootReducerがappReducerに置き換わりstateが初期化される
const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

// ログアウト時に一括でステートを初期化する為上記に書き換え
// import { combineReducers } from "redux";
// import userReducer from "./slices/userSlice";
// import postReducer from "./slices/postSlice";

// const rootReducer = combineReducers({
//   user: userReducer,
//   post: postReducer,
// });

// export default rootReducer;
