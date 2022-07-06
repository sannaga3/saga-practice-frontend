import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { storePostRequest, updatePostRequest } from "../../sagas/posts";
import { selectCurrentUser } from "../../slices/userSlice";
import { ErrorMessage } from "../layout/message/ErrorMessage";
import { FlashMessage } from "../layout/message/FlashMessage";

export const PostForm = ({ action, post = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const errors = useSelector((state) => state.post.errors);

  const isErrorUpdatedId =
    errors.status && post ? post.id === errors.id : false;

  const isShowErrors =
    action === "store" && errors.status
      ? action === errors.status
      : isErrorUpdatedId;

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
      {isShowErrors && <ErrorMessage messages={errors.messages} />}
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
