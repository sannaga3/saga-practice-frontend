import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="py-3 border-b-2 border-gray-500">
      <div className="flex flex-row justify-between items-center px-12 md:justify-around md:px-0">
        <div className="flex flex-row space-x-16">
          <Link to="/" value="Login">
            <label htmlFor="navLink">Login</label>
            <input type="radio" name="navLink" className="hidden" value="Top" />
          </Link>
        </div>
      </div>
    </header>
  );
};
