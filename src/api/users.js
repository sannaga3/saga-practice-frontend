import { client } from "./index";

export const loginUser = (params) => {
  return client.post("/login", params);
};

export const logoutUser = () => {
  return client.post("/logout");
};
