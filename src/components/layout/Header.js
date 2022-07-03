import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { logoutUserRequest } from "../../sagas/users";
import { selectCurrentUser } from "../../slices/userSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);

  const handleLoout = () => {
    if (!window.confirm("ログアウトしますか？")) {
      return false;
    }
    dispatch(logoutUserRequest(navigate));
  };

  return (
    <header className="flexRow bg-indigo-300 justify-between items-center py-2 text-white">
      <div className="flexRow justify-center items-center space-x-16 px-10">
        <div className="text-xl">logo</div>
        <div className="text-md">ユーザ名 : {user.name ?? ""}</div>
        {Object.keys(user).length > 0 ? (
          <>
            <Link to="/posts" className="hover:cursol-pointer hover:scale-110">
              PostList
            </Link>
            <Link
              to="/posts/create"
              className="hover:cursol-pointer hover:scale-110"
            >
              CreatePost
            </Link>
            <button
              type="button"
              onClick={handleLoout}
              className="hover:scale-110"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:cursol-pointer hover:scale-110">
              Login
            </Link>
            <Link to="/signup" className="hover:cursol-pointer hover:scale-110">
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
