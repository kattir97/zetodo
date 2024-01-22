import axios from "axios";

export const authApi = axios.create({
  baseURL: "https://zetodo.onrender.com/api/v1/auth",
  withCredentials: true,
});
