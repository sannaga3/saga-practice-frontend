import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";

import { ErrorMessage } from "../layout/message/ErrorMessage";
import { FlashMessage } from "../layout/message/FlashMessage";
import { getExecutedTasksRequest } from "../../sagas/executedTasks";
import { AchievedBar } from "./threejs/AchievedBar";

import {
  executedTasksByTaskId,
  changeIsShowFormAndSelectedExecutedTask,
} from "../../slices/executedTaskSlice";
import { ExecutedTaskForm } from "./ExecutedTaskForm";

export const ExecutedTaskList = ({ task, flash = null }) => {
  const dispatch = useDispatch();

  const formProps = useSelector((state) => state.executedTask.formProps);
  const errors = useSelector((state) => state.executedTask.errors);

  const executedTasks = useSelector((state) =>
    executedTasksByTaskId(state, task.id)
  );

  useEffect(() => {
    dispatch(getExecutedTasksRequest(task.id));
  }, [dispatch, task.id]);

  const calenderData = executedTasks.map((executedTask) => {
    return {
      executedTask: executedTask,
      title: `${executedTask.times} ${task.times_unit}`,
      start: `${executedTask.date.match(/(\d{4}-\d{2}-\d{2}).+/)[1]}`,
    };
  });

  const formatDate = (date) => {
    const formatted = date
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .split("/")
      .join("-");

    return formatted;
  };

  const handleDispatch = (selectedExecutedTask, selectedDate) => {
    const formProps = {
      isShowForm: true,
      selectedExecutedTask: selectedExecutedTask,
      selectedCalendarDate: selectedDate,
    };
    dispatch(changeIsShowFormAndSelectedExecutedTask(formProps));
  };

  return (
    <div className="flexCol items-center py-10">
      <div className="w-5/6 border rounded-lg shadow-xl bg-white">
        <div className="flexCol items-center bg-white rounded-t-lg pt-5 px-5">
          <h1 className="titleText">タスク進捗管理</h1>
          <div className="w-full h-60 my-3">
            <AchievedBar task={task} executedTasks={executedTasks} />
          </div>
          <div className="w-2/3">
            {errors.status &&
              errors.status !== "store" &&
              errors.status !== "update" && (
                <ErrorMessage messages={errors.messages} />
              )}
            {!errors.status && task && flash && <FlashMessage flash={flash} />}
          </div>
        </div>
        <div className="mt-5">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locales={[jaLocale]}
            locale="ja"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            dayCellContent={(e) => e.dayNumberText.replace("日", "")}
            events={calenderData}
            dateClick={(e) => {
              const formatted = formatDate(e.date);
              handleDispatch(null, formatted);
            }}
            eventClick={(e) => {
              const selectedExecutedTask =
                e.event._def.extendedProps.executedTask;
              handleDispatch(selectedExecutedTask, null);
            }}
          />
        </div>
      </div>
      <div className="absolute top-1/3 z-50">
        {formProps.isShowForm && (
          <ExecutedTaskForm
            action={formProps.selectedExecutedTask ? "update" : "store"}
            executedTask={formProps.selectedExecutedTask}
            task={task}
            selectedCalendarDate={formProps.selectedCalendarDate}
          />
        )}
      </div>
    </div>
  );
};
