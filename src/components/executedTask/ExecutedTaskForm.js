import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  storeExecutedTaskRequest,
  updateExecutedTaskRequest,
  deleteExecutedTaskRequest,
} from "../../sagas/executedTasks";
import { changeIsShowFormAndSelectedExecutedTask } from "../../slices/executedTaskSlice";
import { ErrorMessage } from "../layout/message/ErrorMessage";

export const ExecutedTaskForm = ({
  action,
  task,
  executedTask = null,
  selectedCalendarDate = null,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errors = useSelector((state) => state.executedTask.errors);

  const isErrorUpdatedId =
    errors.status && executedTask ? executedTask.id === errors.id : false;

  const isShowErrors =
    action === "store" && errors.status
      ? action === errors.status
      : isErrorUpdatedId;

  const submitForm = () => {
    const removedTimezone = document
      .getElementById("date")
      .value.replace("T", " ");

    const formValues = {
      times: parseInt(document.getElementById("times").value),
      date: removedTimezone,
      task_id: executedTask ? executedTask.task_id : task.id,
    };
    if (action === "update") formValues.id = executedTask.id;

    action === "store"
      ? dispatch(storeExecutedTaskRequest(formValues, navigate))
      : dispatch(updateExecutedTaskRequest(formValues, navigate));
  };

  const addTimezone = (date) => {
    const addedTimezone = date.replace(" ", "T");
    return addedTimezone;
  };

  const defaultDate = executedTask ? executedTask.date : selectedCalendarDate;

  const handleDelete = () => {
    if (!window.confirm("本当に投稿を削除しますか？")) {
      return false;
    }
    dispatch(deleteExecutedTaskRequest(executedTask, navigate));
  };

  return (
    <>
      <div className="flexCol items-center py-10">
        <div className="relative w-full bg-white p-5 border rounded-lg shadow-xl">
          <div className="absolute right-0 top-0 mr-2 mt-2 hover:cursor-pointer">
            <button
              type="button"
              onClick={() =>
                dispatch(changeIsShowFormAndSelectedExecutedTask(null))
              }
            >
              ✖️
            </button>
          </div>
          <h1
            className={`text-2xl text-center font-bold ${
              action === "store" ? "text-blue-600" : "text-orange-600"
            }`}
          >
            {action === "store" ? "CreateRecord" : "UpdateRecord"}
          </h1>
          {isShowErrors && <ErrorMessage messages={errors.messages} />}
          <form className="w-full flexCol items-start space-y-5 mt-5">
            <div className="form-content space-x-3">
              <label className="w-14">times :</label>
              <input
                type="number"
                id="times"
                className="input w-24"
                min="1"
                defaultValue={executedTask ? executedTask.times : ""}
              />
              <div>{task.times_unit}</div>
            </div>
            <div className="form-content space-x-3">
              <label className="w-14">date :</label>
              <input
                type="datetime-local"
                step="1"
                id="date"
                className="input"
                defaultValue={defaultDate ? addTimezone(defaultDate) : null}
              />
            </div>
            <div className="relative w-full flex justify-center">
              <button
                type="button"
                onClick={() => submitForm()}
                className="btn btn-blue"
              >
                送信
              </button>
              {action === "update" && (
                <button
                  type="button"
                  onClick={() => handleDelete()}
                  className="absolute right-3 top-1 btn btn-red scale-75 hover:scale-90 z-20"
                >
                  削除
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
