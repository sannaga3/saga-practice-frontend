import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { storeTaskRequest, updateTaskRequest } from "../../sagas/tasks";
import { selectCurrentUser } from "../../slices/userSlice";
import { ErrorMessage } from "../layout/message/ErrorMessage";

export const TaskForm = ({ action, task = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [statusEnum, setStatusEnum] = useState("0");
  const [scheduleStart, setScheduleStart] = useState(
    task ? task.schedule_start : ""
  );
  const [scheduleEnd, setScheduleEnd] = useState(task ? task.schedule_end : "");

  const user = useSelector(selectCurrentUser);
  const errors = useSelector((state) => state.task.errors);

  const isErrorUpdatedId =
    errors.status && task ? task.id === errors.id : false;

  const isShowErrors =
    action === "store" && errors.status
      ? action === errors.status
      : isErrorUpdatedId;

  const submitForm = () => {
    const formValues = {
      name: document.getElementById("name").value,
      purpose: document.getElementById("purpose").value,
      action: document.getElementById("action").value,
      target_times: document.getElementById("target_times").value,
      times_unit: document.getElementById("times_unit").value,
      schedule_start: scheduleStart,
      schedule_end: scheduleEnd,
      remarks: document.getElementById("remarks").value,
      user_id: user.id,
      status: statusEnum,
    };
    if (action === "update") formValues.id = task.id;

    action === "store"
      ? dispatch(storeTaskRequest(formValues, navigate))
      : dispatch(updateTaskRequest(formValues, navigate));
  };

  const handleScheduleStart = (value) => {
    if (scheduleEnd && value > scheduleEnd) {
      setScheduleStart("");
      document.getElementById("schedule_start").value = "";
      return alert("開始日付は終了日より早く設定して下さい");
    } else {
      setScheduleStart(value);
    }
  };

  const handleScheduleEnd = (value) => {
    if (scheduleStart && scheduleStart > value) {
      setScheduleEnd("");
      document.getElementById("schedule_end").value = "";
      return alert("終了日は開始日より遅く設定して下さい");
    }
    setScheduleEnd(value);
  };

  const handleStatus = (value) => {
    setStatusEnum(value);
  };

  return (
    <>
      {isShowErrors && <ErrorMessage messages={errors.messages} />}
      <form className="flexCol items-center space-y-8 py-8">
        <div className="form-content space-x-5">
          <label className="label w-32">name</label>
          <input
            type="text"
            id="name"
            className="input w-80"
            defaultValue={task ? task.task_name : ""}
          />
        </div>
        <div className="form-content space-x-5">
          <label className="label w-32">purpose</label>
          <input
            type="text"
            id="purpose"
            className="input w-80"
            defaultValue={task ? task.purpose : ""}
          />
        </div>
        <div className="form-content space-x-5">
          <label className="label w-32">action</label>
          <input
            type="text"
            id="action"
            className="input w-80"
            defaultValue={task ? task.action : ""}
          />
        </div>
        <div className="form-content space-x-5">
          <label className="label w-32">target_times</label>
          <div className="w-80">
            <input
              type="number"
              id="target_times"
              className="input w-24"
              min="1"
              defaultValue={task ? task.target_times : ""}
            />
          </div>
        </div>
        <div className="form-content space-x-5">
          <label className="label w-32">times_unit</label>
          <div className="w-80">
            <input
              type="text"
              id="times_unit"
              className="input w-24"
              defaultValue={task ? task.times_unit : ""}
            />
          </div>
        </div>
        <div className="form-content space-x-5">
          <label className="label w-32">schedule</label>
          <div className="w-80 flexRow space-x-2 items-center">
            <input
              type="date"
              id="schedule_start"
              className="input"
              onChange={(e) => handleScheduleStart(e.target.value)}
              defaultValue={task ? task.schedule_start : ""}
            />
            <span>~</span>
            <input
              type="date"
              id="schedule_end"
              className="input"
              onChange={(e) => handleScheduleEnd(e.target.value)}
              defaultValue={task ? task.schedule_end : ""}
            />
          </div>
        </div>
        <div className="form-content space-x-5">
          <label className="label w-32">remarks</label>
          <input
            type="text"
            id="remarks"
            className="input w-80"
            defaultValue={task ? task.remarks : ""}
          />
        </div>
        <div className="form-content space-x-5">
          <label className="label w-32">status</label>
          <div className="w-80 flexRow space-x-2 items-center">
            <div className="input">
              <select
                onChange={(e) => handleStatus(e.target.value)}
                className="focus:outline-none bg-gray-100"
              >
                <option value="0">未着手</option>
                <option value="1">進行中</option>
                <option value="2">終了</option>
              </select>
            </div>
          </div>
        </div>

        <button type="button" onClick={submitForm} className="btn btn-blue">
          送信
        </button>
      </form>
    </>
  );
};
