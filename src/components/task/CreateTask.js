import { TaskForm } from "./TaskForm";

export const CreateTask = () => {
  return (
    <div className="flexCol items-center pt-10">
      <div className="w-5/6 bg-white p-5 border rounded-lg shadow-xl">
        <h1 className="titleText">CreateTask</h1>
        <TaskForm action="store" />
      </div>
    </div>
  );
};
