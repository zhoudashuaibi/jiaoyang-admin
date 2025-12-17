// src/router/AuthGuard.tsx
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "@/store/modules/user";
import { Spin } from "antd";
import { useEffect } from "react";
import { GetUserInfo } from "@/api/user";

export default function AuthGuard() {
  const userStore = useUserStore();
  const { token, userInfo, setUserInfo } = userStore;

  const hasHydrated = useUserStore.persist.hasHydrated();

  useEffect(() => {
    if (hasHydrated && token) {
      GetUserInfo().then((res) => {
        setUserInfo(res);
      });
    }
  }, [hasHydrated, token]);

  if (!token) return <Navigate to="/login" replace />;

  // 用户信息还没回来，可以 loading
  if (!userInfo || !hasHydrated) return <Spin fullscreen />;

  return <Outlet />;
}
