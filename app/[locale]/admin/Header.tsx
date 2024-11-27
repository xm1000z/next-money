"use client";

import { Fragment, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { Breadcrumb, Button, Drawer } from "antd";
import { motion } from "framer-motion";
import { PanelLeftIcon, SearchIcon } from "lucide-react";

import { Link } from "@/lib/navigation";

import { menus, RenderMenu, type MenuType } from "./Sidebar";

const buildMenuObject = (menus: MenuType[]) => {
  const menuObject: Record<string, any> = {};
  menus.forEach((item) => {
    if (item.href) {
      menuObject[item.href!] = { ...item };
    }
    if (item.children) {
      item.children.forEach((child) => {
        if (child.href && !child.href!.includes(":")) {
          menuObject[child.href!] = { ...child, parent: item };
        }
      });
    }
  });
  return menuObject;
};

const findMenu = (menus: MenuType[], path: string) => {
  const menuObject = buildMenuObject(menus);
  const findBreadcrumb = (menu, currentPath) => {
    const item = menu[currentPath];

    if (!item) {
      return []; // Si no se encuentra el item, retorna un array vacío
    }
    if (item.parent && !item.parent.href) {
      return [{ ...item.parent }, { ...item, parent: null }];
    }

    const breadcrumbs = [{ ...item, parent: null }];

    if (item.parent && !item.isDynamic) {
      return [
        ...findBreadcrumb(menu, item.parent.href),
        { ...item, parent: null },
      ];
    }

    if (item.isDynamic) {
      const staticPath = currentPath.split("/").slice(0, -1).join("/");
      const parentItem = menu[staticPath] || item.parent;
      if (parentItem) {
        return [...findBreadcrumb(menu, staticPath), { ...item, parent: null }];
      }
    }

    return breadcrumbs;
  };

  return findBreadcrumb(menuObject, path);
};

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const breadcrumbItems = findMenu(menus, pathname || '/');

  return (
    <header className="flex h-[--header-height] min-w-0 flex-shrink-0 items-center gap-x-4 border-b border-gray-200 px-4 dark:border-gray-800">
      <Button
        className="!sm:block !hidden"
        shape="circle"
        type="default"
        onClick={() => setOpen(true)}
      >
        <span className="!flex h-full w-full items-center justify-center">
          <PanelLeftIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </span>
      </Button>
      <Drawer open={open} placement="left" onClose={() => setOpen(false)}>
        <div className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <ul>{menus.map((menu) => RenderMenu(menu))}</ul>
          </nav>
        </div>
      </Drawer>
      <Breadcrumb
        className="!sm:hidden"
        items={breadcrumbItems.map((item, index) => {
          return {
            title: item.href ? (
              <Link href={item.href}>{item.name}</Link>
            ) : (
              item.name
            ),
          };
        })}
      />

      <motion.div
        className="flex flex-1 items-center justify-end gap-3"
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >
        {/* <div className="pointer-events-auto">
          <ThemeSwitcher />
        </div> */}
      </motion.div>
    </header>
  );
}
