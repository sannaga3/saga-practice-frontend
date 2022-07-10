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
        <div className="w-5/6 mb-2">
          {posts.map((post) => {
            return (
              <div key={post.id} className="border-b border-gray-500 py-4">
                <div className="flexRow justify-left space-x-5 text-left">
                  <div className="w-1/6">{post.user_name}</div>
                  <div className="w-1/6">{post.title}</div>
                  <div className="w-3/6 h-32 flexCol justify-between">
                    <div>{post.content}</div>
                    <div className="flex justify-end">
                      <Link
                        to={`/post/${post.id}/edit`}
                        state={post}
                        className="edit-link"
                      >
                        変更
                      </Link>
                      <button
                        type="button"
                        className="delete-link w-16"
                        onClick={() => handleDelete(post.id)}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                  {post.image ? (
                    <img
                      src={post.image}
                      className="w-40 h-32 border-2 border-gray-300 rounded-2xl shadow-2xl"
                    />
                  ) : (
                    <div className="w-44 h-32 border-2 border-gray-300 rounded-2xl shadow-2xl flex justify-center items-center">
                      <div className="text-xl text-gray-400 italic border-b-2 border-gray-400">
                        No Image
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
