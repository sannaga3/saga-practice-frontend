import axios from "axios";

const baseUrl = "http://localhost:8888/api";

export const client = axios.create({
  baseURL: baseUrl,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});

export const api = async (path, method, values) => {
  const url = baseUrl + path;
  let addQuery;
  let params;

  if (method === "GET" && values) {
    const query = new URLSearchParams(values);
    addQuery = `${url}?${query}`;
  }
  if (method !== "GET")
    params = {
      method: method,
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    };

  const res = await fetch(addQuery ?? url, params);

  const data = await res.json();

  return data;
};
