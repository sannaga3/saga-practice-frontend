import { takeEvery, call, fork, put } from "redux-saga/effects";

import * as api from "../api/tasks";
import {
  getTasksSuccess,
  storeTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
  requestFailed,
} from "../slices/taskSlice";
import { handleErrors } from "../util/handleErrors";

//------------------------------------------------------
// saga actions
//------------------------------------------------------

export const getTasksRequest = () => ({
  type: "GET_TASKS_REQUEST",
});

export const storeTaskRequest = (formValues, navigate) => ({
  type: "STORE_TASK_REQUEST",
  payload: { formValues, navigate },
});

export const updateTaskRequest = (formValues, navigate) => ({
  type: "UPDATE_TASK_REQUEST",
  payload: { formValues, navigate },
});

export const deleteTaskRequest = (taskId, navigate) => ({
  type: "DELETE_TASK_REQUEST",
  payload: { taskId, navigate },
});

//------------------------------------------------------
// generators
//------------------------------------------------------

function* getTasks() {
  try {
    const result = yield call(api.getTasks);
    yield put(getTasksSuccess(result.data));
  } catch (e) {
    const errorMessages = handleErrors(e);
    yield put(requestFailed({ status: "index", messages: errorMessages }));
  }
}

function* storeTask({ payload }) {
  try {
    const result = yield call(api.storeTask, payload.formValues);
    yield put(storeTaskSuccess(result.data));
    payload.navigate("/tasks", {
      state: { flash: "新しいタスクを作成しました" },
    });
  } catch (e) {
    const errorMessages = handleErrors(e);
    yield put(requestFailed({ status: "store", messages: errorMessages }));
  }
}

function* updateTask({ payload }) {
  try {
    const result = yield call(api.updateTask, payload.formValues);
    yield put(updateTaskSuccess(result.data));
    payload.navigate("/tasks", {
      state: { flash: "タスクを更新しました" },
    });
  } catch (e) {
    const errorMessages = handleErrors(e);
    yield yield put(
      requestFailed({
        status: "update",
        messages: errorMessages,
        id: payload.formValues.id,
      })
    );
  }
}

function* deleteTask({ payload }) {
  try {
    const result = yield call(api.deleteTask, payload.taskId);
    yield put(deleteTaskSuccess(result.data));
    payload.navigate("/tasks", {
      state: { flash: "タスクを削除しました" },
    });
  } catch (e) {
    const errorMessages = handleErrors(e);
    yield put(
      requestFailed({
        status: "delete",
        messages: errorMessages,
        id: payload.taskId,
      })
    );
  }
}

//------------------------------------------------------
// saga watchers
//------------------------------------------------------

function* watchGetTasksRequest() {
  yield takeEvery("GET_TASKS_REQUEST", getTasks);
}

function* watchStoreTaskRequest() {
  yield takeEvery("STORE_TASK_REQUEST", storeTask);
}

function* watchUpdateTaskRequest() {
  yield takeEvery("UPDATE_TASK_REQUEST", updateTask);
}

function* watchDeleteTaskRequest() {
  yield takeEvery("DELETE_TASK_REQUEST", deleteTask);
}

const taskSagas = [
  fork(watchGetTasksRequest),
  fork(watchStoreTaskRequest),
  fork(watchUpdateTaskRequest),
  fork(watchDeleteTaskRequest),
];

export default taskSagas;
