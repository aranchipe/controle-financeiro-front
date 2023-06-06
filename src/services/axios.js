import axios from "axios";
import { getItem } from "../utils/storage";

const token = getItem("token");

export default axios.create({
  baseURL: "https://safecash.cyclic.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
