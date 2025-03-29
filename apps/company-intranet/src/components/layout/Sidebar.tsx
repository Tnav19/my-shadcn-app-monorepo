"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";
import { Home, Cloud, Heart, Settings, LogOut } from "lucide-react";
import { LucideIcon } from "lucide-react";

const sidebarItems = [
  { icon: Home, href: "/", label: "Home" },
  { icon: Cloud, href: "/cloud", label: "Cloud" },
  { icon: Heart, href: "/favorites", label: "Favorites" },
];

const bottomItems = [
  { icon: Settings, href: "/settings", label: "Settings" },
  { icon: LogOut, href: "/logout", label: "Logout" },
];

export function Sidebar() {
  const pathname = usePathname();

  const NavItem = ({ href, icon: Icon, label }: { href: string; icon: LucideIcon; label: string }) => (
    <Link
      href={href}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors",
        pathname === href && "bg-blue-100 text-blue-600"
      )}
      title={label}
    >
      <Icon size={24} />
    </Link>
  );

  return (
    <div className="flex flex-col items-center w-[72px] bg-white border-r py-4">
      <div className="flex-1 flex flex-col items-center gap-2">
        {sidebarItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>
      
      <div className="flex flex-col items-center gap-2">
        {bottomItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
} 