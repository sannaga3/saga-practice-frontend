import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:8888/api",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});
