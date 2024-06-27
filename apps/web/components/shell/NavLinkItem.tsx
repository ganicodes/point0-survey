"use client";

import {
  Home,
  Package2,
  ShieldQuestion,
  Users,
} from "@repo/ui/components/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function getIcon(name: string): ReactNode {
  let icon;
  switch (name) {
    case "dashboard":
      icon = <Home className="h-6 w-6" />;
      break;
    case "questions":
      icon = <ShieldQuestion className="h-6 w-6" />;
      break;
    case "agents":
      icon = <Users className="h-6 w-6" />;
      break;
    case "surveys":
      icon = <Package2 className="h-6 w-6" />;
      break;

    default:
      break;
  }

  return icon;
}

const NavLinkItem = ({
  label,
  link,
  key,
  iconName,
}: {
  label: string;
  link: string;
  key: number;
  iconName: string;
}) => {
  const path = usePathname();
  return (
    <Link
      key={key}
      href={link}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${path === link ? "bg-muted text-primary" : ""}`}
    >
      {getIcon(iconName)}
      {label}
    </Link>
  );
};

export default NavLinkItem;
