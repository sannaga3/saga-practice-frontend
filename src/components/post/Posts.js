import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deletePostRequest } from "../../sagas/posts";

export const Posts = ({ posts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (postId) => {
    if (!window.confirm("本当に投稿を削除しますか？")) {
      return false;
    }
    dispatch(deletePostRequest(postId, navigate));
  };

  return (
    <div className="flexCol items-center">
      {posts.length > 0 && (
        <div className="w-5/6 mt-5 mb-2 p-1">
          {posts.map((post) => {
            return (
              <div key={post.id} className="border-b border-gray-500 p-1">
                <div className="flexRow justify-left space-x-5 text-left">
                  <div className="w-1/6">{post.user_name}</div>
                  <div className="w-1/6">{post.title}</div>
                  <div className="w-3/6">{post.content}</div>
                  <div className="w-1/6 flex items-center space-x-5">
                    <Link
                      to={`/post/${post.id}/edit`}
                      state={post}
                      className="edit-link"
                    >
                      変更
                    </Link>
                    <button
                      type="button"
                      className="delete-link"
                      onClick={() => handleDelete(post.id)}
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
