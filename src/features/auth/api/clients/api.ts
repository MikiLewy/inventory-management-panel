import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth/v1`,
});

export default authApi;
