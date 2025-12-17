// src/http/index.ts
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { setupInterceptors } from "./interceptors";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000,
});

// 注册拦截器
setupInterceptors(instance);

// 封装 request 函数，修正返回值类型为 T（因为拦截器已经解包了）
const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return instance.request<any, T>(config);
};

export default request;
