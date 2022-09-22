import axios, { AxiosInstance, AxiosResponse } from "axios";

//change to an environment url eventually
const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

// TODO: we could do better by creating an instance and assign the instance configs/options.

instance.defaults.headers.common["Content-Type"] = "application/json";

export function extractData<T>(response: AxiosResponse<T>): T {
  return response.data;
}
export default instance;
