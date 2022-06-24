import { useSelector } from "react-redux";

export const PostList = () => {
  const user = useSelector((state) => state.user.setUser);

  return (
    <div className="flexCol items-center">
      <div className="w-1/2 bg-white p-5 border rounded-lg shadow-xl">
        <h1 className="titleText">PostList</h1>
      </div>
    </div>
  );
};
