import { combineReducers } from "redux";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";
import taskReducer from "./slices/taskSlice";
import executedTaskRreducer from "./slices/executedTaskSlice";

// stateが初期状態のappReducerを作成しておく
const appReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  task: taskReducer,
  executedTask: executedTaskRreducer,
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
