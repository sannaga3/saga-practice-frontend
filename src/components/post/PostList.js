import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Message } from "../layout/message/Message";

export const PostList = () => {
  const location = useLocation();

  const errors = useSelector((state) => state.user.errors);

  return (
    <div className="flexCol items-center">
      <div className="w-1/2 bg-white p-5 border rounded-lg shadow-xl">
        <h1 className="titleText">PostList</h1>
        <Message errors={errors} location={location} />
      </div>
    </div>
  );
};
