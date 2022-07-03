import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { loginUserRequest } from "../../sagas/users";
import { Message } from "../layout/message/Message";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); //location.stateでフラッシュメッセージを取得

  const errors = useSelector((state) => state.user.errors);

  const handleLogin = () => {
    const formValues = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    // saga action をディスパッチ。画面遷移はジェネレータ内で行う為、navigateメソッドをバケツリレーする。
    dispatch(loginUserRequest(formValues, navigate));
  };

  return (
    <div className="flexCol items-center pt-10">
      <div className="w-1/2 bg-white p-5 border rounded-lg shadow-xl">
        <h1 className="titleText">Login</h1>
        <Message errors={errors.loginError ?? ""} location={location} />
        <form className="flexCol items-center space-y-8 pt-8">
          <div className="form-content space-x-5">
            <label className="label w-32">email: </label>
            <input
              id="email"
              type="email"
              className="input w-60"
              placeholder="abc@sample.com"
            />
          </div>
          <div className="form-content space-x-5">
            <label className="label w-32">password: </label>
            <input
              id="password"
              type="password"
              className="input w-60"
              placeholder="******"
            />
          </div>
          <button type="button" onClick={handleLogin} className="btn btn-blue">
            送信
          </button>
        </form>
      </div>
    </div>
  );
};
