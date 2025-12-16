import { useRoutes, Navigate } from "react-router-dom";
import { routes } from "@/config/routes";
import { convertRoutes } from "./generate";
import NotFound404 from "@/pages/404";
import NotFound403 from "@/pages/403";
import Login from "@/pages/login";

export default function Router() {
  const finalRoutes = convertRoutes(routes);
  return useRoutes([
    ...finalRoutes,
    {
      path: 'login',
      element: <Login />
    },
    {
      path: '403',
      element: <NotFound403 />
    },
    {
      path: '404',
      element: <NotFound404 />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ]);
}
