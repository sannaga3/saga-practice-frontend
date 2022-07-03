import { Link } from "react-router-dom";

export const Posts = ({ posts }) => {
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
                  <div className="w-1/6 flex space-x-5">
                    <Link
                      to={`/post/${post.id}/edit`}
                      state={post}
                      className="edit-link"
                    >
                      変更
                    </Link>
                    <Link to={"#"} className="delete-link">
                      削除
                    </Link>
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
