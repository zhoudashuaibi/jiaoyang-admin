import request from "@/http";
import type { UserInfo } from "@/types/user.d";

// 登录
export const login = (data: { account: string; password: string }) => {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
};

//注册
export const register = (data: {
  account: string;
  password: string;
  confirm_password: string;
}) => {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
};

//退出登录
export const logout = () => {
  return request({
    url: "/user/logout",
    method: "post",
  });
};

// 获取用户信息
export const GetUserInfo = () => {
  return request<{ user_info: UserInfo }>({
    url: "/user/info",
    method: "get",
  });
};
