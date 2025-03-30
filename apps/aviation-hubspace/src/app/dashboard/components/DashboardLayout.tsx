'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import {
  Plane,
  Map,
  Building2,
  Package,
  Users,
  Settings,
  LogOut,
  Layout,
  Clock,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="h-16 border-b bg-white px-4">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Plane className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-semibold">Aviation Hub</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/avatars/admin.png" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r">
          <nav className="p-4 space-y-2">
            <Link href="/dashboard">
              <Button 
                variant={pathname === "/dashboard" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Layout className="h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/tracking">
              <Button 
                variant={pathname === "/dashboard/tracking" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Map className="h-5 w-5" />
                Aircraft Tracking
              </Button>
            </Link>
            <Link href="/dashboard/airports">
              <Button 
                variant={pathname === "/dashboard/airports" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Building2 className="h-5 w-5" />
                Airports
              </Button>
            </Link>
            <Link href="/dashboard/parts">
              <Button 
                variant={pathname === "/dashboard/parts" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Package className="h-5 w-5" />
                Parts Management
              </Button>
            </Link>
            <Link href="/dashboard/crew">
              <Button 
                variant={pathname === "/dashboard/crew" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Users className="h-5 w-5" />
                Crew Management
              </Button>
            </Link>
            <Link href="/dashboard/schedule">
              <Button 
                variant={pathname === "/dashboard/schedule" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Clock className="h-5 w-5" />
                Flight Schedule
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button 
                variant={pathname === "/dashboard/settings" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 