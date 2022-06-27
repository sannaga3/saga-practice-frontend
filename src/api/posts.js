import { client } from "./index";

export const getPosts = () => {
  return client.get("/posts");
};
