import { TaskForm } from "./TaskForm";
import { useLocation } from "react-router-dom";

export const EditTask = () => {
  const { state } = useLocation();

  return (
    <div className="flexCol items-center pt-10">
      <div className="w-5/6 bg-white p-5 border rounded-lg shadow-xl">
        <h1 className="titleText">EditTask</h1>
        <TaskForm action="update" task={state} />
      </div>
    </div>
  );
};
