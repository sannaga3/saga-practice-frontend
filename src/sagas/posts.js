import { takeEvery, call, fork, put } from "redux-saga/effects";

import * as api from "../api/posts";
import {
  getPostsSuccess,
  storePostSuccess,
  requestFailed,
} from "../slices/postSlice";

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

//------------------------------------------------------
// generators
//------------------------------------------------------

function* getPosts() {
  try {
    const result = yield call(api.getPosts);
    yield put(getPostsSuccess(result.data));
  } catch (e) {
    let errorMessages = Object.values(e.response.data.errorMessages);
    errorMessages = [].concat.apply([], errorMessages);
    yield put(requestFailed({ getPostsError: errorMessages }));
  }
}

function* storePost({ payload }) {
  try {
    const result = yield call(api.storePost, payload.formValues);
    console.log(payload);
    yield put(storePostSuccess(result.data));
    payload.navigate("/posts", {
      state: { flash: "新しい投稿を作成しました" },
    });
  } catch (e) {
    console.log(e);
    let errorMessages = Object.values(e.response.data.errorMessages);
    errorMessages = [].concat.apply([], errorMessages);
    yield put(requestFailed({ storePostError: errorMessages }));
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

const postSagas = [fork(watchGetPostsRequest), fork(watchStorePostRequest)];

export default postSagas;
