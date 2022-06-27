import { takeEvery, call, fork, put } from "redux-saga/effects";

import * as api from "../api/posts";
import { getPostsSuccess, requestFailed } from "../slices/postSlice";

//------------------------------------------------------
// saga actions
//------------------------------------------------------

export const getPostsRequest = () => ({
  type: "GET_POSTS_REQUEST",
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

//------------------------------------------------------
// saga watchers
//------------------------------------------------------

function* watchGetPostsRequest() {
  yield takeEvery("GET_POSTS_REQUEST", getPosts);
}

const postSagas = [fork(watchGetPostsRequest)];

export default postSagas;
