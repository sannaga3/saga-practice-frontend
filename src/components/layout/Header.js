import { Link } from "react-router-dom";
import { styles } from "../style/styles";

export const Header = () => {
  const { flexRow } = styles;

  return (
    <header
      className={`${flexRow} bg-indigo-300 justify-between items-center py-2 text-white`}
    >
      <div
        className={`${flexRow} justify-center items-center space-x-16 px-10`}
      >
        <div className="text-xl">logo</div>
        <Link to="/" value="Login">
          <label htmlFor="navLink">Login</label>
          <input type="radio" name="navLink" className="hidden" value="Top" />
        </Link>
      </div>
    </header>
  );
};
