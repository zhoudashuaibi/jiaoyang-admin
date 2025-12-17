// src/http/errorHandler.ts
import { message } from "antd";
import useUserStore from "@/store/modules/user";

const errorHandler = (error: any) => {
  if (!error) return;

  const status = error.response?.status;

  switch (status) {
    case 400:
      message.error(error.response?.data?.msg || "请求参数错误");
      break;
    case 401:
      useUserStore.getState().logout();
      message.error("登录过期")
      break;
    case 403:
      message.error(error.response?.data?.msg || "没有权限");
      break;
    case 404:
      message.error(error.response?.data?.msg || "接口不存在");
      break;
    case 500:
      message.error(error.response?.data?.msg || "服务器错误");
      break;
    default:
      message.error(error.msg || "网络异常");
  }
};

export default errorHandler;
