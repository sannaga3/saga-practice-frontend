import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { signupUserRequest } from "../../sagas/users";
import { Message } from "../layout/message/Message";

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); //location.stateでフラッシュメッセージを取得

  const errors = useSelector((state) => state.user.errors);

  const handleLogin = () => {
    const formValues = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      password_confirmation: document.getElementById("password_confirm").value,
    };
    // saga action をディスパッチ。画面遷移はジェネレータ内で行う為、navigateメソッドをバケツリレーする。
    dispatch(signupUserRequest(formValues, navigate));
  };

  return (
    <div className="flexCol items-center">
      <div className="w-1/2 bg-white p-5 border rounded-lg shadow-xl">
        <h1 className="titleText">Signup</h1>
        <Message errors={errors.signupError ?? ""} location={location} />
        <form className="flexCol items-center space-y-8 pt-8">
          <div className="form-content space-x-5">
            <label className="label w-32">name: </label>
            <input
              id="name"
              type="text"
              className="input w-60"
              placeholder="sample name"
            />
          </div>
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
          <div className="form-content space-x-5">
            <label className="label w-32">password_confirm: </label>
            <input
              id="password_confirm"
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
