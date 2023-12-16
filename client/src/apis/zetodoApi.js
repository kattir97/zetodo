import axios from "axios";

export default axios.create({
  baseURL: "https://zetodo.onrender.com/api/v1/groups",
});
