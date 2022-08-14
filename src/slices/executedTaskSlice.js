import { createSelector, createSlice } from "@reduxjs/toolkit";
import { clearError } from "../util/handleErrors";

const executedTaskSlice = createSlice({
  name: "executedTasks",
  initialState: {
    executedTasks: [],
    formProps: {
      isShowForm: false,
      selectedExecutedTask: null,
      selectedCalendarDate: null,
    },
    errors: { status: false, messages: [], id: null },
  },
  reducers: {
    getExecutedTasksSuccess: (state, action) => {
      state.executedTasks = [...action.payload];
      state.errors = clearError();
    },
    storeExecutedTaskSuccess: (state, action) => {
      state.executedTasks = [action.payload, ...state.executedTasks];
      state.errors = clearError();
    },
    updateExecutedTaskSuccess: (state, action) => {
      const target = findIndexById(state, action.payload.id);
      state.executedTasks.splice(target, 1, action.payload);
      state.errors = clearError();
    },
    deleteExecutedTaskSuccess: (state, action) => {
      const executedTaskId = findIndexById(state, parseInt(action.payload.id));
      state.executedTasks.splice(executedTaskId, 1);
      state.errors = clearError();
    },
    changeIsShowFormAndSelectedExecutedTask: (state, action) => {
      state.formProps = action.payload
        ? {
            isShowForm: action.payload.isShowForm ?? false,
            selectedExecutedTask: action.payload.selectedExecutedTask ?? null,
            selectedCalendarDate: action.payload.selectedCalendarDate ?? null,
          }
        : formProps;
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
export default executedTaskSlice.reducer;

// Action
export const {
  getExecutedTasksSuccess,
  storeExecutedTaskSuccess,
  updateExecutedTaskSuccess,
  deleteExecutedTaskSuccess,
  requestFailed,
  changeIsShowFormAndSelectedExecutedTask,
} = executedTaskSlice.actions;

// selector
const findIndexById = (state, executedTaskId) =>
  state.executedTasks.findIndex(
    (executedTask) => executedTask.id === executedTaskId
  );

export const selectExecutedTasksByTaskId = (state) =>
  state.executedTask.executedTasks;

export const executedTasksByTaskId = createSelector(
  [selectExecutedTasksByTaskId, (state, taskId) => taskId],
  (tasks, taskId) => tasks
);

export const getIsShowForm = (state) => state.executedTask.isShowForm;

const formProps = {
  isShowForm: false,
  selectedExecutedTask: null,
  selectedDate: null,
};
