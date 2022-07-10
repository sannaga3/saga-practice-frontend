import { client } from "./index";

export const getPosts = () => {
  return client.get("/posts");
};

export const storePost = (params) => {
  if (params.image) return client.post("/posts", params, headersWithImage);
  return client.post("/posts", params);
};

export const updatePost = (params) => {
  if (params.image) {
    return client.patch(`/posts/${params.id}`, params);
  }
  return client.patch(`/posts/${params.id}`, params);
};

export const deletePost = (userId) => {
  return client.delete(`/posts/${userId}`);
};

const headersWithImage = {
  headers: {
    "content-type": "multipart/form-data",
  },
};
