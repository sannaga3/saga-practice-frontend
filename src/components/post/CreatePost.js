import { PostForm } from "./PostForm";

export const CreatePost = () => {
  return (
    <div className="flexCol items-center">
      <div className="w-5/6 bg-white p-5 border rounded-lg shadow-xl">
        <h1 className="titleText">CreatePost</h1>
        <PostForm action="store" />
      </div>
    </div>
  );
};
