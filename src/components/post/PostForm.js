import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { storePostRequest } from "../../sagas/posts";
import { Message } from "../layout/message/Message";

export const PostForm = ({ action }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user.currentUser);
  const errors = useSelector((state) => state.post.errors);

  const submitForm = () => {
    const formValues = {
      title: document.getElementById("title").value,
      content: document.getElementById("content").value,
      user_id: user.id,
    };
    action = "store" ? dispatch(storePostRequest(formValues, navigate)) : "";
  };

  return (
    <>
      <Message errors={errors.storePostError ?? ""} location={location} />
      <form className="flexCol items-center space-y-8 py-8">
        <div className="form-content space-x-5">
          <label className="label w-32">title</label>
          <input type="text" id="title" className="input w-80" />
        </div>
        <div className="form-content space-x-5">
          <label className="label w-32">content</label>
          <textarea id="content" className="textarea w-80" />
        </div>
        <button type="button" onClick={submitForm} className="btn btn-blue">
          送信
        </button>
      </form>
    </>
  );
};
