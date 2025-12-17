import reactLogo from "@/assets/react.svg";
import useUserStore from "@/store/modules/user";
import { Avatar } from "antd";
import { Dropdown } from "antd";
import type { MenuProps } from "antd/es/menu";

export default function ComHeader() {
  const userStore = useUserStore();
  const { userInfo } = userStore;

  const handleClickFn: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "logout":
        userStore.logout();
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-between h-full">
      <div className="flex items-center h-full">
        <img src={reactLogo} className="mr-4" alt="" />
        <div className="text-2xl font-bold"> 测试系统</div>
      </div>

      <div className="flex items-center">
        <Dropdown
          menu={{
            items: [
              {
                label: "退出登录",
                key: "logout",
              },
            ],
            onClick: handleClickFn,
          }}
        >
          <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1">
            <Avatar size={30} src={userInfo?.avatar || ""} />
            <div className="text-sm">{userInfo?.name || "未知用户"}</div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
