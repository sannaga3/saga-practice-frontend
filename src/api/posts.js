import { client } from "./index";

export const getPosts = () => {
  return client.get("/posts");
};

export const storePost = (params) => {
  return client.post("/posts", params);
};

export const updatePost = (params) => {
  return client.patch(`/posts/${params.id}`, params);
};

export const deletePost = (userId) => {
  return client.delete(`/posts/${userId}`);
};
