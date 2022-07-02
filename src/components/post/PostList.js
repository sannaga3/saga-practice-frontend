import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Message } from "../layout/message/Message";
import { Posts } from "./Posts";
import { getPostsRequest } from "../../sagas/posts";
import { useEffect } from "react";

export const PostList = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const posts = useSelector((state) => state.post.posts);
  const status = useSelector((state) => state.post.postsStatus);
  const errors = useSelector((state) => state.post.errors);

  // apiを叩く際にstatusを更新することで、毎回dispatchするのを防ぐ
  useEffect(() => {
    if (status === "idle") {
      dispatch(getPostsRequest());
    }
  }, [dispatch, status]);

  return (
    <div className="flexCol items-center">
      <div className="w-5/6 bg-white p-5 border rounded-lg shadow-xl">
        <h1 className="titleText">PostList</h1>
        <Message errors={errors} location={location} />
        <Posts posts={posts} />
      </div>
    </div>
  );
};
