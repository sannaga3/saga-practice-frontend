import { createSlice, createSelector } from "@reduxjs/toolkit";
import { clearError } from "../util/handleErrors";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    tasksStatus: "idle",
    tasksType: "AllTasks",
    statusType: "All",
    errors: { status: false, messages: [], id: null },
  },
  reducers: {
    getTasksSuccess: (state, action) => {
      state.tasks = [...action.payload];
      state.tasksStatus = "complete";
      state.tasksCompletedStatus = "AllStatus";
      state.errors = clearError();
    },
    storeTaskSuccess: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
      state.errors = clearError();
    },
    updateTaskSuccess: (state, action) => {
      const target = findIndexById(state, action.payload[0].id);
      state.tasks.splice(target, 1, action.payload[0]);
      state.errors = clearError();
    },
    deleteTaskSuccess: (state, action) => {
      const taskId = findIndexById(state, parseInt(action.payload.id));
      state.tasks.splice(taskId, 1);
      state.errors = clearError();
    },
    changeTasksType: (state, action) => {
      state.tasksType = action.payload;
      state.errors = clearError();
    },
    changeStatusType: (state, action) => {
      state.statusType = action.payload;
      state.errors = clearError();
    },
    requestFailed: (state, action) => {
      state.errors = {
        status: action.payload.status,
        messages: action.payload.messages,
        id: action.payload.id ?? null,
      };
    },
  },
});

// Reducer
export default taskSlice.reducer;

// Action
export const {
  getTasksSuccess,
  storeTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
  changeTasksType,
  changeStatusType,
  requestFailed,
} = taskSlice.actions;

export const findIndexById = (state, taskId) =>
  state.tasks.findIndex((task) => task.id === taskId);

// Selector
export const selectAllTasks = (state) => state.task.tasks;
export const selectTasksType = (state) => state.task.tasksType;
export const selectStatusType = (state) => state.task.statusType;

export const selectTasksByUserAndStatusType = createSelector(
  [
    selectAllTasks,
    (state, userId) => userId,
    selectTasksType,
    selectStatusType,
  ],
  (tasks, userId, tasksType, statusType) => {
    if (tasksType === "MyTasks")
      tasks = tasks.filter((task) => task.user_id === userId);
    if (statusType !== "All")
      tasks = tasks.filter((task) => task.status === statusType);
    return tasks;
  }
);
