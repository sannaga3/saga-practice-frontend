import { client } from "./index";

export const loginUser = (params) => {
  return client.post("/login", params);
};

export const logoutUser = () => {
  return client.post("/logout");
};

export const signupUser = (params) => {
  return client.post("/signup", params);
};
