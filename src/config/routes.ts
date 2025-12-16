// src/config/routes.ts
import type { RouteObject } from "react-router-dom";
import BaseLayout from "@/layouts";
import Dashboard from "@/pages/dashboard";
import HousePage from "@/pages/house";

export type AppRouteObject = RouteObject & {
  name?: string;
  icon?: string;
  hideInMenu?: boolean;
  component?: React.ComponentType;
  children?: AppRouteObject[];
  meta?: {
    roles?: string[];
    keepAlive?: boolean;
    title?: string;
    hideInMenu?: boolean;
  };
};

export const routes: AppRouteObject[] = [
  {
    path: "/",
    component: BaseLayout,
    children: [
      {
        index: true,
        component: Dashboard,
        name: "Dashboard",
        icon: "DashboardOutlined",
        meta: {
          title: "首页",
        },
      },
      {
        path: "house",
        name: "HouseManagement",
        meta: {
          title: "房源管理",
        },
        children: [
          {
            path: "list",
            component: HousePage,
            name: "HouseList",
            meta: {
              title: "房源列表",
            },
          },
        ],
      },
    ],
  },
];
