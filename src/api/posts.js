import { client } from "./index";

export const getPosts = () => {
  return client.get("/posts");
};

export const storePost = (params) => {
  return client.post("/posts", params);
};
