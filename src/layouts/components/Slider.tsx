import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from '@/config/routes';
import type { AppRouteObject } from '@/config/routes';
import * as Icons from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const renderIcon = (name?: string) => {
  if (!name) return null;
  const Comp = (Icons as Record<string, any>)[name];
  return Comp ? <Comp /> : null;
};

const calcRoute = (routes: AppRouteObject[], basePath = ''): MenuItem[] => {
  return routes
    .filter(item => !item.hideInMenu && !item.meta?.hideInMenu)
    .flatMap((item) => {
      // 处理路径拼接
      const routePath = item.path || '';
      // 如果是根路径 / 或者是绝对路径，直接使用；否则拼接
      let fullPath = routePath;
      if (!routePath.startsWith('/') && basePath) {
        fullPath = `${basePath === '/' ? '' : basePath}/${routePath}`;
      } else if (basePath && routePath === '') {
        // 处理 index 路由的情况
        fullPath = basePath;
      }

      // 处理 index 路由
      if (item.index && basePath) {
        fullPath = basePath;
      }

      // 特殊处理：如果当前路由是 "/"，则不显示该层级，直接展开其子路由
      if (routePath === '/') {
        return item.children ? calcRoute(item.children, fullPath) : [];
      }

      const menuItem: any = {
        key: fullPath,
        icon: renderIcon(item.icon),
        label: item.meta?.title || item.name,
      };

      if (item.children && item.children.length > 0) {
        const childrenItems = calcRoute(item.children, fullPath);
        // 只有当有有效的子菜单项时才添加 children 属性
        if (childrenItems.length > 0) {
          menuItem.children = childrenItems;
        }
      }

      return [menuItem];
    });
};

export default function ComSlider() {
  const navigate = useNavigate();
  const menuItems = calcRoute(routes[0].children || []);

  const location = useLocation();


  return (
    <div className="h-full overflow-y-auto px-2">
      <Menu
        mode="inline"
        style={{ borderInlineEnd: 0 }}
        theme="light"
        items={menuItems}
        defaultOpenKeys={[location.pathname.split('/')[1]]}
        selectedKeys={[location.pathname.replace('/', '')]}
        onClick={({ key }) => navigate(key)}
      />
    </div>
  );
}
