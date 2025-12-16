import reactLogo from "@/assets/react.svg";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import { useState } from "react";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "登录",
    children: <LoginForm />,
  },
  {
    key: "2",
    label: "注册",
    children: <RegisterForm />,
  },
];

export default function Login() {
  const [activeKey, setActiveKey] = useState("1");
  const handleTabClick = (key: string) => {
    setActiveKey(key);
  };
  return (
    <div className="min-h-screen flex">
      {/* 左侧装饰区域 - 仅在宽屏显示 */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/3 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden justify-center items-center">
        {/* 背景装饰光晕 */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white blur-[100px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-400 blur-[100px]"></div>
        </div>

        {/* 文案展示 */}
        <div className="relative z-10 text-white text-center px-12">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
              <img src={reactLogo} alt="Logo" className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 tracking-wide drop-shadow-lg">
            JIAOYANG REAL ESTATE
          </h1>
          <p className="text-xl text-blue-100/90 font-light tracking-widest">
            后台管理系统
          </p>
        </div>
      </div>

      {/* 右侧登录区域 */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-50/50 px-4 sm:px-12 relative">
        {/* 右上角装饰 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-bl-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-8 sm:p-12 relative z-10 border border-gray-100">
          {/* 顶部标题 */}

          {/* 表单插槽 */}
          <div className="w-full space-y-6">
            <Tabs
              defaultActiveKey="1"
              centered={true}
              items={items}
              activeKey={activeKey}
              onChange={handleTabClick}
            />
          </div>
        </div>

        <div className="mt-8 text-gray-400 text-xs tracking-wider">
          © 2025 JIAOYANG REAL ESTATE
        </div>
      </div>
    </div>
  );
}
