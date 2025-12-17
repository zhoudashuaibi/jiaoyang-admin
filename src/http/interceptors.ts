// src/http/interceptors.ts
import type { AxiosInstance, AxiosResponse } from "axios";
import { message } from "antd";
import errorHandler from "./errorHandler";
import useUserStore from "@/store/modules/user";

interface ResponseData<T> {
  code: number;
  data: T;
  msg: string;
}

export const setupInterceptors = (instance: AxiosInstance) => {
  /** 请求拦截 */
  instance.interceptors.request.use(
    (config) => {
      const token = useUserStore.getState().token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  /** 响应拦截 */
  instance.interceptors.response.use(
    (res: AxiosResponse<ResponseData<any>>) => {
      // 统一后端返回结构：{ code, data, message }
      const { code, data, msg } = res.data as ResponseData<any>;
      // 自定义业务 code 处理
      if (code !== 0) {
        message.error(msg || "请求异常");
        return Promise.reject(res.data);
      }

      return data;
    },
    (error) => {
      errorHandler(error);
      return Promise.reject(error);
    }
  );
};
