import userSagas from "./users";
import postSagas from "./posts";
import taskSagas from "./tasks";
import executedTaskSagas from "./executedTasks";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([...userSagas, ...postSagas, ...taskSagas, ...executedTaskSagas]);
}
