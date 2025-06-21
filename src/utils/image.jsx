import axios from "axios";

export const IMG = axios.create({
  baseURL: import.meta.env.VITE_APP_API_IMAGE,
});
