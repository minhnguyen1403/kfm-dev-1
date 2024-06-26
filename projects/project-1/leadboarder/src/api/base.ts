import axios from "redaxios";

const axiosLB = axios.create({
  baseURL: "http://api.localhost/v1/users",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default axiosLB;
