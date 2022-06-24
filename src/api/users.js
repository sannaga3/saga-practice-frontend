import { client } from "./index";

export const loginUser = (params) => {
  return client.post("/login", params);
};
