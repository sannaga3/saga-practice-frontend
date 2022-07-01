import { PostForm } from "./PostForm";
import { useLocation } from "react-router-dom";

export const EditPost = () => {
  const { state } = useLocation();

  return (
    <div className="flexCol items-center">
      <div className="w-5/6 bg-white p-5 border rounded-lg shadow-xl">
        <h1 className="titleText">EditPost</h1>
        <PostForm action="update" post={state} />
      </div>
    </div>
  );
};
