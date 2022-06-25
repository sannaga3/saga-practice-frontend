import { takeEvery, call, fork, put } from "redux-saga/effects";

import * as api from "../api/users";
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
} from "../slices/userSlice";

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

//------------------------------------------------------
// generators
//------------------------------------------------------

function* loginUser({ payload }) {
  try {
    // apiの結果を待つ
    const result = yield call(api.loginUser, {
      email: payload.formValues.email,
      password: payload.formValues.password,
    });
    // reducersのsetUserアクションをdispatch
    yield put(loginSuccess(result.data));
    payload.navigate("/posts", { state: { flash: "ログインしました" } });
  } catch (e) {
    let errorMessages = Object.values(e.response.data.errorMessages);
    errorMessages = [].concat.apply([], errorMessages);
    yield put(loginFailure(errorMessages));
  }
}

function* logoutUser({ payload }) {
  try {
    const result = yield call(api.logoutUser);
    yield put(logoutSuccess());
    payload.navigate("/", { state: { flash: result.data } });
  } catch (e) {
    let errorMessages = Object.values(e.response.data.errorMessages);
    errorMessages = [].concat.apply([], errorMessages);
    yield put(logoutFailure(errorMessages));
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

const userSagas = [fork(watchLoginUserRequest), fork(watchLogoutUserRequest)];

export default userSagas;
