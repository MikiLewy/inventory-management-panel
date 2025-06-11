import axios from 'axios';

import { attachAccessToken } from '../interceptors/attach-access-token';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

api.interceptors.request.use(attachAccessToken);

export default api;
