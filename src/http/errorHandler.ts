// src/http/errorHandler.ts
import { message } from "antd";

const errorHandler = (error: any) => {
    if (!error) return;

    const status = error.response?.status;

    switch (status) {
        case 400:
            message.error( error.response?.data?.msg || "请求参数错误");
            break;
        case 401:
            message.error( error.response?.data?.msg || "未登录或登录过期");
            // TODO: 重定向登录页
            window.location.href = '/login'
            break;
        case 403:
            message.error( error.response?.data?.msg || "没有权限");
            break;
        case 404:
            message.error( error.response?.data?.msg || "接口不存在");
            break;
        case 500:
            message.error( error.response?.data?.msg || "服务器错误");
            break;
        default:
            message.error(error.msg || "网络异常");
    }
};

export default errorHandler;
