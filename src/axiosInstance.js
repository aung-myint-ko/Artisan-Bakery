import axios from "axios";
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: "https://artisan-bakery-data.onrender.com/api",
});
export default axiosInstance;
