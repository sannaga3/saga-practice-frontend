import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Message } from "../layout/message/Message";
import { Posts } from "./Posts";
import { getPostsRequest } from "../../sagas/posts";
import { useEffect } from "react";
import {
  changePostsType,
  selectAllPosts,
  selectPostsByUser,
} from "../../slices/postSlice";
import { selectCurrentUser } from "../../slices/userSlice";

export const PostList = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const posts = useSelector(selectAllPosts);
  const user = useSelector(selectCurrentUser);
  const postsByUser = useSelector((state) => selectPostsByUser(state, user.id));
  const postsType = useSelector((state) => state.post.postsType);

  const status = useSelector((state) => state.post.postsStatus);
  const errors = useSelector((state) => state.post.errors);

  // apiを叩く際にstatusを更新することで、毎回dispatchするのを防ぐ
  useEffect(() => {
    if (status === "idle") {
      dispatch(getPostsRequest());
    }
  }, [dispatch, status]);

  return (
    <div className="flexCol items-center py-10">
      <div className="w-5/6 border rounded-lg shadow-xl bg-white">
        <div className="flexCol items-center sticky top-0 bg-white rounded-t-lg pt-5 px-5">
          <h1 className="titleText">PostList</h1>
          <div className="w-2/3">
            <Message errors={errors} location={location} />
          </div>
          <div className="w-full flex justify-end p-2">
            <div className="flex items-center space-x-2">
              <div className="w-24">postsType :</div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="postsType"
                  defaultChecked={postsType === "AllPosts"}
                  onClick={(e) => dispatch(changePostsType(e.target.value))}
                  value="AllPosts"
                />
                <span className="inline-block px-1">AllPosts</span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="postsType"
                  onClick={(e) => {
                    dispatch(changePostsType(e.target.value));
                  }}
                  defaultChecked={postsType === "MyPosts"}
                  value="MyPosts"
                />
                <span className="inline-block px-1">MyPosts</span>
              </div>
            </div>
          </div>
          <div className="w-5/6 flex justify-left space-x-5 border-b-2 border-black px-2 pt-3 pb-2">
            <div className="w-1/6 font-bold">ユーザー名</div>
            <div className="w-1/6 font-bold">タイトル</div>
            <div className="w-3/6 font-bold">内容</div>
            <div className="w-1/6 font-bold">ボタン</div>
          </div>
        </div>
        <div className="px-5 pb-5">
          {posts && (
            <Posts posts={postsType === "AllPosts" ? posts : postsByUser} />
          )}
        </div>
      </div>
    </div>
  );
};
