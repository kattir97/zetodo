import axios from "axios";

export default axios.create({
  baseURL: "https://zetodo.onrender.com/api/v1/groups",
  // baseURL: "http://localhost:3006/api/v1/groups",
});

// http://localhost:3006/api/v1/groups
