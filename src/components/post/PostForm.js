import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { storePostRequest, updatePostRequest } from "../../sagas/posts";
import { Message } from "../layout/message/Message";
import { selectCurrentUser } from "../../slices/userSlice";

export const PostForm = ({ action, post = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(selectCurrentUser);
  const errors = useSelector((state) => state.post.errors);

  const submitForm = () => {
    const formValues = {
      title: document.getElementById("title").value,
      content: document.getElementById("content").value,
      user_id: user.id,
    };
    if (action === "update") formValues.id = post.id;

    action === "store"
      ? dispatch(storePostRequest(formValues, navigate))
      : dispatch(updatePostRequest(formValues, navigate));
  };

  return (
    <>
      {Object.keys(errors).length > 0 && (
        <Message
          errors={errors.storePostError || errors.updatePostError}
          location={location}
        />
      )}
      <form className="flexCol items-center space-y-8 py-8">
        <div className="form-content space-x-5">
          <label className="label w-32">title</label>
          <input
            type="text"
            id="title"
            className="input w-80"
            defaultValue={post ? post.title : ""}
          />
        </div>
        <div className="form-content space-x-5">
          <label className="label w-32">content</label>
          <textarea
            id="content"
            className="textarea w-80"
            defaultValue={post ? post.content : ""}
          />
        </div>
        <button type="button" onClick={submitForm} className="btn btn-blue">
          送信
        </button>
      </form>
    </>
  );
};
