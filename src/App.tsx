import { useEffect } from "react";
import Router from "./router/index.tsx";
import { GetUserInfo } from "@/api/user";
import useUserStore from "@/store/modules/user";


import "./App.css";

function App() {
  const userStore = useUserStore();
  const { token, setUserInfo } = userStore;

  useEffect(() => {
    if (!token) return;
    GetUserInfo().then((res) => {
      setUserInfo(res.user_info);
    })
  }, []);

  //初始化获取用户信息
  return <Router />;
}

export default App;
