import axios from "axios";
import { CONFIG } from "../config/config";

const api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
