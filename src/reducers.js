import { combineReducers } from "redux";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

export default rootReducer;
