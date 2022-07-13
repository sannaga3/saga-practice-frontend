import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { ErrorMessage } from "../layout/message/ErrorMessage";
import { FlashMessage } from "../layout/message/FlashMessage";
import { Tasks } from "./Tasks";
import { getTasksRequest } from "../../sagas/tasks";

import {
  changeTasksType,
  selectAllTasks,
  selectTasksByUser,
} from "../../slices/taskSlice";
import { selectCurrentUser } from "../../slices/userSlice";

export const TaskList = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const tasks = useSelector(selectAllTasks);
  const user = useSelector(selectCurrentUser);
  const tasksByUser = useSelector((state) => selectTasksByUser(state, user.id));
  const tasksType = useSelector((state) => state.task.tasksType);

  const status = useSelector((state) => state.task.tasksStatus);
  const errors = useSelector((state) => state.task.errors);

  // apiを叩く際にstatusを更新することで、毎回dispatchするのを防ぐ
  useEffect(() => {
    if (status === "idle") {
      dispatch(getTasksRequest());
    }
  }, [dispatch, status]);

  return (
    <div className="flexCol items-center py-10">
      <div className="w-5/6 border rounded-lg shadow-xl bg-white">
        <div className="flexCol items-center sticky top-0 bg-white rounded-t-lg pt-5 px-5">
          <h1 className="titleText">PostList</h1>
          <div className="w-2/3">
            {errors.status &&
              errors.status !== "store" &&
              errors.status !== "update" && (
                <ErrorMessage messages={errors.messages} />
              )}
            {!errors.status && state && Object.keys(state)[0] === "flash" && (
              <FlashMessage flash={state.flash} />
            )}
          </div>
          {/* <div className="w-5/6  flex justify-end p-2">
            <div className="flex items-center space-x-2">
              <div className="w-24">tasksType :</div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="tasksType"
                  defaultChecked={tasksType === "AllTasks"}
                  onClick={(e) => dispatch(changeTasksType(e.target.value))}
                  value="AllTasks"
                />
                <span className="inline-block px-1">AllTasks</span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="tasksType"
                  onClick={(e) => {
                    dispatch(changeTasksType(e.target.value));
                  }}
                  defaultChecked={tasksType === "MyTasks"}
                  value="MyTasks"
                />
                <span className="inline-block px-1">MyTasks</span>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className="px-5 pb-5">
          {tasks && (
            <Tasks tasks={tasksType === "AllTasks" ? tasks : tasksByUser} />
          )}
        </div> */}
      </div>
    </div>
  );
};
