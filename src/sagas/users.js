import { takeEvery, call, fork, put } from "redux-saga/effects";

import * as api from "../api/users";
import {
  loginSuccess,
  signupSuccess,
  requestFailed,
} from "../slices/userSlice";
import { handleErrors } from "../util/handleErrors";

//------------------------------------------------------
// saga actions
//------------------------------------------------------

export const loginUserRequest = (formValues, navigate) => ({
  type: "LOGIN_USER_REQUEST",
  payload: { formValues, navigate },
});

export const logoutUserRequest = (navigate) => ({
  type: "LOGOUT_USER_REQUEST",
  payload: { navigate },
});

export const signupUserRequest = (formValues, navigate) => ({
  type: "SIGNUP_USER_REQUEST",
  payload: { formValues, navigate },
});

//------------------------------------------------------
// generators
//------------------------------------------------------

function* loginUser({ payload }) {
  try {
    // apiの結果を待つ
    const result = yield call(api.loginUser, payload.formValues);

    // reducersのsetUserアクションをdispatch
    yield put(loginSuccess(result.data));

    payload.navigate("/posts", { state: { flash: "ログインしました" } });
  } catch (e) {
    const errorMessages = handleErrors(e);
    yield put(requestFailed({ status: "login", messages: errorMessages }));
  }
}

function* logoutUser({ payload }) {
  try {
    const result = yield call(api.logoutUser);
    payload.navigate("/", { state: { flash: result.data } });
    yield put({ type: "LOGOUT" });
  } catch (e) {
    const errorMessages = handleErrors(e);
    yield put(requestFailed({ status: "logout", messages: errorMessages }));
  }
}

function* signupUser({ payload }) {
  try {
    const result = yield call(api.signupUser, payload.formValues);
    yield put(signupSuccess(result.data));
    payload.navigate("/posts", {
      state: { flash: "アカウントを登録しました" },
    });
  } catch (e) {
    const errorMessages = handleErrors(e);
    yield put(requestFailed({ status: "signup", messages: errorMessages }));
  }
}

//------------------------------------------------------
// saga watchers
//------------------------------------------------------

function* watchLoginUserRequest() {
  yield takeEvery("LOGIN_USER_REQUEST", loginUser);
}

function* watchLogoutUserRequest() {
  yield takeEvery("LOGOUT_USER_REQUEST", logoutUser);
}

function* watchSignupUserRequest() {
  yield takeEvery("SIGNUP_USER_REQUEST", signupUser);
}

const userSagas = [
  fork(watchLoginUserRequest),
  fork(watchLogoutUserRequest),
  fork(watchSignupUserRequest),
];

export default userSagas;
