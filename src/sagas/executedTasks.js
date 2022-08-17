import { takeEvery, call, fork, put, select } from "redux-saga/effects";

import { api } from "../api/index";
import {
  getExecutedTasksSuccess,
  storeExecutedTaskSuccess,
  updateExecutedTaskSuccess,
  deleteExecutedTaskSuccess,
  changeIsShowFormAndSelectedExecutedTask,
  requestFailed,
} from "../slices/executedTaskSlice";
import { handleErrors } from "../util/handleErrors";

//------------------------------------------------------
// saga actions
//------------------------------------------------------

export const getExecutedTasksRequest = (taskId) => ({
  type: "GET_EXECUTED_TASKS_REQUEST",
  payload: { taskId },
});

export const storeExecutedTaskRequest = (formValues, navigate) => ({
  type: "STORE_EXECUTED_TASK_REQUEST",
  payload: { formValues, navigate },
});

export const updateExecutedTaskRequest = (formValues, navigate) => ({
  type: "UPDATE_EXECUTED_TASK_REQUEST",
  payload: { formValues, navigate },
});

export const deleteExecutedTaskRequest = (executeTask, navigate) => ({
  type: "DELETE_EXECUTED_TASK_REQUEST",
  payload: { executeTask, navigate },
});

//------------------------------------------------------
// generators
//------------------------------------------------------

function* getExecutedTasks({ payload }) {
  try {
    const result = yield call(api, "/executed_tasks", "GET", {
      task_id: payload.taskId,
    });
    yield put(getExecutedTasksSuccess(result));
  } catch (e) {
    const errorMessages = handleErrors(e);
    yield put(requestFailed({ status: "index", messages: errorMessages }));
  }
}

function* storeExecutedTask({ payload }) {
  try {
    const result = yield call(
      api,
      "/executed_tasks",
      "POST",
      payload.formValues
    );
    yield put(storeExecutedTaskSuccess(result));
    yield put(changeIsShowFormAndSelectedExecutedTask(null));

    const tasks = yield select((state) => state.task.tasks);
    const task = tasks.find((task) => task.id === payload.formValues.task_id);

    payload.navigate(`/task/${payload.formValues.task_id}`, {
      state: { task: task, flash: "タスクを記録しました" },
    });
  } catch (e) {
    const errorMessages = handleErrors(e);
    yield put(requestFailed({ status: "store", messages: errorMessages }));
  }
}

function* updateExecutedTask({ payload }) {
  try {
    const result = yield call(
      api,
      `/executed_tasks/${payload.formValues.id}`,
      "PATCH",
      payload.formValues
    );
    yield put(updateExecutedTaskSuccess(result));
    yield put(changeIsShowFormAndSelectedExecutedTask(null));

    const tasks = yield select((state) => state.task.tasks);
    const task = tasks.find((task) => task.id === payload.formValues.task_id);

    payload.navigate(`/task/${payload.formValues.task_id}`, {
      state: { task: task, flash: "タスクの記録を更新しました" },
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

function* deleteExecutedTask({ payload }) {
  try {
    const result = yield call(
      api,
      `/executed_tasks/${payload.executeTask.id}`,
      "DELETE"
    );
    yield put(deleteExecutedTaskSuccess(result));
    yield put(changeIsShowFormAndSelectedExecutedTask(null));

    const tasks = yield select((state) => state.task.tasks);
    const task = tasks.find((task) => task.id === payload.executeTask.task_id);

    payload.navigate(`/task/${payload.executeTask.task_id}`, {
      state: { task: task, flash: "タスクの記録を削除しました" },
    });
  } catch (e) {
    const errorMessages = handleErrors(e);
    yield put(
      requestFailed({
        status: "delete",
        messages: errorMessages,
        id: payload.executeTask,
      })
    );
  }
}

//------------------------------------------------------
// saga watchers
//------------------------------------------------------

function* watchGetExecutedTasksRequest() {
  yield takeEvery("GET_EXECUTED_TASKS_REQUEST", getExecutedTasks);
}

function* watchStoreExecutedTaskRequest() {
  yield takeEvery("STORE_EXECUTED_TASK_REQUEST", storeExecutedTask);
}

function* watchUpdateExecutedTaskRequest() {
  yield takeEvery("UPDATE_EXECUTED_TASK_REQUEST", updateExecutedTask);
}

function* watchDeleteExecutedTaskRequest() {
  yield takeEvery("DELETE_EXECUTED_TASK_REQUEST", deleteExecutedTask);
}

const executedTaskSagas = [
  fork(watchGetExecutedTasksRequest),
  fork(watchStoreExecutedTaskRequest),
  fork(watchUpdateExecutedTaskRequest),
  fork(watchDeleteExecutedTaskRequest),
];

export default executedTaskSagas;
