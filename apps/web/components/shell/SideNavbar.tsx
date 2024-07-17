import { Button } from "@repo/ui/components/ui/button";
import { Bell, Package2 } from "@repo/ui/components/ui/icons";
import Link from "next/link";

import { routes } from "../../constants/routes";
import NavLinkItem from "./NavLinkItem";

const SideNavbar = () => {
  return (
    <>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="">Point0 Survey</span>
        </Link>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {Array.isArray(routes) &&
            routes?.map((item, index) => (
              <NavLinkItem
                key={index}
                label={item?.label}
                link={item?.to}
                iconName={item?.iconName}
              />
            ))}
        </nav>
      </div>
    </>
  );
};

export default SideNavbar;
