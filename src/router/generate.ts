import { createElement } from "react";
import type { AppRouteObject } from "@/config/routes";

export const convertRoutes = (routes: AppRouteObject[]) => {
  return routes.map(route => {
    const item: any = {
      path: route.path,
      index: route.index,
    };

    if (route.component) {
      item.element = createElement(route.component);
    } else if (route.element) {
      item.element = route.element;
    }

    if (route.children && route.children.length > 0) {
      item.children = convertRoutes(route.children);
    }

    return item;
  });
};
