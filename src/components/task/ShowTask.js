import { useLocation } from "react-router-dom";
import { useState } from "react";

import { ExecutedTaskList } from "../executedTask/ExecutedTaskList";

export const ShowTask = () => {
  const location = useLocation();

  const { task, flash } = location.state;

  const [showType, setShowType] = useState("contents");

  // オブジェクトを配列に変換
  let taskToArr = Object.entries(task).map(([key, value]) => ({
    key,
    value,
  }));
  taskToArr = taskToArr.filter((task) => task.key !== "tableData");

  const statusColor =
    task.status === "0"
      ? "bg-blue-500"
      : task.status === "1"
      ? "bg-orange-500"
      : "bg-red-500";

  return (
    <div className="flexCol items-center pt-10">
      <div className="w-5/6 bg-white p-5 border rounded-lg shadow-xl">
        <h1 className="titleText">ShowTask</h1>
        <div className="w-4/5 flex justify-start px-1 pt-3 pl-24">
          <div className="flex items-center space-x-2">
            <div className="w-24">ShowType :</div>
            <div className="flex items-center">
              <input
                type="radio"
                name="ShowType"
                onClick={(e) => setShowType("contents")}
                defaultChecked={showType === "contents"}
              />
              <span className="inline-block px-1">contents</span>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="ShowType"
                onClick={(e) => setShowType("structure")}
              />
              <span className="inline-block px-1">structure</span>
            </div>
          </div>
        </div>
        <div className="flexRow justify-center my-5">
          <div className="relative w-4/5 border-4 border-gray-300">
            {showType === "contents" ? (
              <>
                <div
                  className={`absolute top-0 right-0 w-20 h-10 flex justify-center items-center text-white ${statusColor} z-10"`}
                >
                  {task.status === "0" && "未着手"}
                  {task.status === "1" && "進行中"}
                  {task.status === "2" && "終了"}
                </div>
                <div className="flexRow justify-center items-center text-left mt-8">
                  <div className="w-[300px] pb-2 text-2xl">タイトル: </div>
                  <div className="w-[300px] pb-2 text-2xl">
                    {task.task_name}
                  </div>
                </div>
                <div className="flexRow justify-end mr-28 mt-3">
                  <div className="w-[100px] pb-2">作成者</div>
                  <div className="w-[100px] pb-2">{task.user_name}</div>
                </div>
                <div className="space-y-4 mt-3 py-10">
                  <div className="flexRow justify-center">
                    <div className="w-[300px] border-b border-gray-500 pb-2">
                      期間
                    </div>
                    <div className="w-[300px] border-b border-gray-500 pb-2">
                      {task.schedule_start} 〜 {task.schedule_end}
                    </div>
                  </div>
                  <div className="flexRow justify-center">
                    <div className="w-[300px] border-b border-gray-500 pb-2">
                      目的
                    </div>
                    <div className="w-[300px] border-b border-gray-500 pb-2">
                      {task.purpose}
                    </div>
                  </div>
                  <div className="flexRow justify-center">
                    <div className="w-[300px] border-b border-gray-500 pb-2">
                      内容
                    </div>
                    <div className="w-[300px] border-b border-gray-500 pb-2">
                      <span className="font-bold">{task.action}</span>
                      <span className="px-2">を</span>
                      <span className="font-bold pr-2">
                        {task.target_times}
                        {task.times_unit}
                      </span>
                      行う
                    </div>
                  </div>
                  <div className="flexRow justify-center">
                    <div className="w-[300px] border-b border-gray-500 pb-2">
                      備考
                    </div>
                    <div className="w-[300px] border-b border-gray-500 pb-2">
                      {task.remarks}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {showType === "structure" &&
                  taskToArr.map((task) => {
                    return (
                      <div className="flexRow justify-center px-5 py-2">
                        <div className="w-[300px]">{task.key}</div>
                        <div className="w-[300px]">{task.value}</div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-full mt-14 mb-10">
        <ExecutedTaskList task={task} flash={flash} />
      </div>
    </div>
  );
};
