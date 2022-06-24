import { takeEvery, call, fork, put } from "redux-saga/effects";

import * as api from "../api/users";
import { loginSuccess, loginFailure } from "../slices/userSlice";

// saga action
export const loginUserRequest = (formValues, navigate) => ({
  type: "LOGIN_USER_REQUEST",
  payload: { formValues, navigate },
});

function* loginUser({ payload }) {
  try {
    // apiの結果を待つ
    const result = yield call(api.loginUser, {
      email: payload.formValues.email,
      password: payload.formValues.password,
    });
    // reducersのsetUserアクションをdispatch
    yield put(loginSuccess(result.data));
    payload.navigate("/posts");
  } catch (e) {
    let errorMessages = Object.values(e.response.data.errorMessages);
    errorMessages = [].concat.apply([], errorMessages);
    yield put(loginFailure(errorMessages));
  }
}

// saga watcher
function* watchLoginUserRequest() {
  yield takeEvery("LOGIN_USER_REQUEST", loginUser);
}

const userSagas = [fork(watchLoginUserRequest)];

export default userSagas;
