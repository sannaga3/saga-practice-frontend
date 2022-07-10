import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { storePostRequest, updatePostRequest } from "../../sagas/posts";
import { selectCurrentUser } from "../../slices/userSlice";
import { ErrorMessage } from "../layout/message/ErrorMessage";
import { useState } from "react";

export const PostForm = ({ action, post = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [base64, setBase64] = useState(post ? post.image : "");
  const [fileName, setFileName] = useState(post ? post.image_name : "");

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
      image: base64 ?? null,
      image_name: fileName ?? null,
      user_id: user.id,
    };
    if (action === "update") formValues.id = post.id;

    action === "store"
      ? dispatch(storePostRequest(formValues, navigate))
      : dispatch(updatePostRequest(formValues, navigate));
  };

  // ファイルサイズ制限用
  const fileSize = 1024 * 1024 * 4;

  const handleImage = () => {
    const file = document.getElementById("image").files[0];
    if (file.size > fileSize) {
      file.value = "";
      return alert("ファイルサイズは4MB以下にしてください");
    }
    // アップロードしたデータをbase64に変換
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result;
      setBase64(base64);
    };
    setFileName(file.name);
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
        <div className="form-content space-x-5">
          <label className="label w-32">image</label>
          <div>
            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={() => handleImage()}
              className="w-80"
            />
            {base64 && (
              <img
                src={base64}
                className="w-[300px] h-[200px] border-2 border-gray-300 rounded-2xl shadow-2xl mt-5"
              />
            )}
          </div>
        </div>
        <button type="button" onClick={submitForm} className="btn btn-blue">
          送信
        </button>
      </form>
    </>
  );
};
