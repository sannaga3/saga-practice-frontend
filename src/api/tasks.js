import { client } from "./index";

export const getTasks = () => {
  return client.get("/tasks");
};

export const storeTask = (params) => {
  if (params.image) return client.post("/tasks", params, headersWithImage);
  return client.post("/tasks", params);
};

export const updateTask = (params) => {
  if (params.image) {
    return client.patch(`/tasks/${params.id}`, params);
  }
  return client.patch(`/tasks/${params.id}`, params);
};

export const deleteTask = (userId) => {
  return client.delete(`/tasks/${userId}`);
};

const headersWithImage = {
  headers: {
    "content-type": "multipart/form-data",
  },
};
