import axios from "axios";

export const authApi = axios.create({
  baseURL: "https://zetodo.onrender.com/api/v1/auth",
  // baseURL: "http://localhost:3006/api/v1/auth",

  withCredentials: true,
});
