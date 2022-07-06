import { takeEvery, call, fork, put } from "redux-saga/effects";

import * as api from "../api/posts";
import {
  getPostsSuccess,
  storePostSuccess,
  updatePostSuccess,
  deletePostSuccess,
  requestFailed,
} from "../slices/postSlice";
import { handleErrors } from "../util/handleErrors";

//------------------------------------------------------
// saga actions
//------------------------------------------------------

export const getPostsRequest = () => ({
  type: "GET_POSTS_REQUEST",
});

export const storePostRequest = (formValues, navigate) => ({
  type: "STORE_POST_REQUEST",
  payload: { formValues, navigate },
});

export const updatePostRequest = (formValues, navigate) => ({
  type: "UPDATE_POST_REQUEST",
  payload: { formValues, navigate },
});

export const deletePostRequest = (userId, navigate) => ({
  type: "DELETE_POST_REQUEST",
  payload: { userId, navigate },
});

//------------------------------------------------------
// generators
//------------------------------------------------------

function* getPosts() {
  try {
    const result = yield call(api.getPosts);
    yield put(getPostsSuccess(result.data));
  } catch (e) {
    const errorMessages = handleErrors(e);
    yield put(requestFailed({ status: "index", messages: errorMessages }));
  }
}

function* storePost({ payload }) {
  try {
    const result = yield call(api.storePost, payload.formValues);
    yield put(storePostSuccess(result.data));
    payload.navigate("/posts", {
      state: { flash: "新しい投稿を作成しました" },
    });
  } catch (e) {
    const errorMessages = handleErrors(e);
    yield put(requestFailed({ status: "store", messages: errorMessages }));
  }
}

function* updatePost({ payload }) {
  try {
    const result = yield call(api.updatePost, payload.formValues);
    yield put(updatePostSuccess(result.data));
    payload.navigate("/posts", {
      state: { flash: "投稿を更新しました" },
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

function* deletePost({ payload }) {
  try {
    const result = yield call(api.deletePost, payload.userId);
    yield put(deletePostSuccess(result.data));
    payload.navigate("/posts", {
      state: { flash: "投稿を削除しました" },
    });
  } catch (e) {
    const errorMessages = handleErrors(e);
    yield put(
      requestFailed({
        status: "delete",
        messages: errorMessages,
        id: payload.userId,
      })
    );
  }
}

//------------------------------------------------------
// saga watchers
//------------------------------------------------------

function* watchGetPostsRequest() {
  yield takeEvery("GET_POSTS_REQUEST", getPosts);
}

function* watchStorePostRequest() {
  yield takeEvery("STORE_POST_REQUEST", storePost);
}

function* watchUpdatePostRequest() {
  yield takeEvery("UPDATE_POST_REQUEST", updatePost);
}

function* watchDeletePostRequest() {
  yield takeEvery("DELETE_POST_REQUEST", deletePost);
}

const postSagas = [
  fork(watchGetPostsRequest),
  fork(watchStorePostRequest),
  fork(watchUpdatePostRequest),
  fork(watchDeletePostRequest),
];

export default postSagas;
