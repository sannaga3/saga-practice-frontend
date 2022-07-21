import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { ErrorMessage } from "../layout/message/ErrorMessage";
import { FlashMessage } from "../layout/message/FlashMessage";
import { Tasks } from "./Tasks";
import { getTasksRequest } from "../../sagas/tasks";

import {
  changeTasksType,
  changeStatusType,
  selectAllTasks,
  selectTasksByUserAndStatusType,
} from "../../slices/taskSlice";
import { selectCurrentUser } from "../../slices/userSlice";

export const TaskList = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const tasks = useSelector(selectAllTasks);
  const user = useSelector(selectCurrentUser);
  const tasksType = useSelector((state) => state.task.tasksType);
  const statusType = useSelector((state) => state.task.statusType);

  const tasksByUserAndStatusType = useSelector((state) =>
    selectTasksByUserAndStatusType(state, user.id)
  );

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
          <h1 className="titleText">TaskList</h1>
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
          <div className="w-5/6 flex justify-start p-2">
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
          </div>
          <div className="w-5/6  flex justify-start pb-3 px-2">
            <div className="flex items-center space-x-2">
              <div className="w-24">statusType :</div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="statusType"
                  defaultChecked={statusType === "All"}
                  onClick={() => dispatch(changeStatusType("All"))}
                />
                <span className="inline-block px-1">All</span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="statusType"
                  onClick={() => {
                    dispatch(changeStatusType("0"));
                  }}
                  defaultChecked={statusType === "0"}
                />
                <span className="inline-block px-1">notStart</span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="statusType"
                  onClick={() => {
                    dispatch(changeStatusType("1"));
                  }}
                  defaultChecked={statusType === "progress"}
                />
                <span className="inline-block px-1">inProgress</span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="statusType"
                  onClick={() => {
                    dispatch(changeStatusType("2"));
                  }}
                  defaultChecked={statusType === "2"}
                />
                <span className="inline-block px-1">closed</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 pb-5">
          {tasks.length > 0 && (
            <>
              {/* material ui datagrid */}
              <Tasks
                tasks={
                  tasksType === "AllTasks" && statusType === "All"
                    ? tasks
                    : tasksByUserAndStatusType
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
