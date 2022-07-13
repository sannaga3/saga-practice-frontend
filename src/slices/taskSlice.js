import { createSlice, createSelector } from "@reduxjs/toolkit";
import { clearError } from "../util/handleErrors";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    tasksStatus: "idle",
    tasksType: "AllTasks",
    errors: { status: false, messages: [], id: null },
  },
  reducers: {
    getTasksSuccess: (state, action) => {
      state.tasks = [...action.payload];
      state.tasksStatus = "complete";
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
      const userId = findIndexById(state, parseInt(action.payload.user_id));
      state.tasks.splice(userId, 1);
      state.errors = clearError();
    },
    changeTasksType: (state, action) => {
      state.tasksType = action.payload;
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
  requestFailed,
} = taskSlice.actions;

const findIndexById = (state, taskId) =>
  state.tasks.findIndex((task) => task.id === taskId);

// Selector
export const selectAllTasks = (state) => state.task.tasks;

export const selectTasksByUser = createSelector(
  [selectAllTasks, (state, userId) => userId],
  (tasks, userId) => tasks.filter((task) => task.user_id === userId)
);
