import axios from "axios";
import { getItem } from "../utils/storage";

const token = getItem("token");

export default axios.create({
  baseURL: "safecash-api.vercel.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
