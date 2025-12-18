import request from "@/http";
import type { UserInfo } from "@/types/user.d";

// 登录
export const login = (data: { account: string; password: string }) => {
  return request({
    url: "/auth/login",
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
    url: "/auth/register",
    method: "post",
    data,
  });
};

//退出登录
export const logout = () => {
  return request({
    url: "/auth/logout",
    method: "post",
  });
};

// 获取用户信息
export const GetUserInfo = () => {
  return request<UserInfo>({
    url: "/user/info",
    method: "get",
  });
};

export interface updateInfo {
  name: string;
  email: string;
  phone: string;
}
// 更新用户信息
export const UpdateUserInfo = (data: updateInfo) => {
  return request({
    url: "/user/update",
    method: "patch",
    data,
  });
};
