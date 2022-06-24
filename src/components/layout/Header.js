import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Header = () => {
  const user = useSelector((state) => state.user.setUser);

  return (
    <header className="flexRow bg-indigo-300 justify-between items-center py-2 text-white">
      <div className="flexRow justify-center items-center space-x-16 px-10">
        <div className="text-xl">logo</div>
        <div className="text-md">ユーザ名 : {user.name ?? ""}</div>
        <Link to="/" value="Login">
          <label htmlFor="navLink">Login</label>
          <input type="radio" name="navLink" className="hidden" value="Top" />
        </Link>
      </div>
    </header>
  );
};
