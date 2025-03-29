"use client";

import { Button } from "@repo/ui/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { MainLayout } from "@repo/ui/layouts/MainLayout";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Calendar,
  Users,
  Clock,
  Layout,
  UserPlus,
  Building2,
  Package,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here
    document.cookie = "medi-lab-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <MainLayout
      showIndustries={false}
      isAuthenticated={true}
      appName="MediLab"
      loginPath="/login"
    >
      <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-500">MediLab</h1>
          </div>
          <nav className="px-4 space-y-2">
            <Link href="/templates/dashboard">
              <Button 
                variant={pathname === "/templates/dashboard" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Layout className="h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/templates/calendar">
              <Button 
                variant={pathname === "/templates/calendar" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Calendar className="h-5 w-5" />
                Calendar
              </Button>
            </Link>
            <Link href="/templates/patients">
              <Button 
                variant={pathname === "/templates/patients" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Users className="h-5 w-5" />
                Patients
              </Button>
            </Link>
            <Link href="/templates/staff-schedule">
              <Button 
                variant={pathname === "/templates/staff-schedule" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Clock className="h-5 w-5" />
                Staff schedule
              </Button>
            </Link>
            <Link href="/templates/doctors">
              <Button 
                variant={pathname === "/templates/doctors" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <UserPlus className="h-5 w-5" />
                Doctors
              </Button>
            </Link>
            <Link href="/templates/departments">
              <Button 
                variant={pathname === "/templates/departments" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Building2 className="h-5 w-5" />
                Departments
              </Button>
            </Link>
            <Link href="/templates/prescriptions">
              <Button 
                variant={pathname === "/templates/prescriptions" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Package className="h-5 w-5" />
                Prescriptions
              </Button>
            </Link>
            <Link href="/templates/settings">
              <Button 
                variant={pathname === "/templates/settings" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
            <Link href="/templates/help">
              <Button 
                variant={pathname === "/templates/help" ? "default" : "ghost"} 
                className="w-full justify-start gap-2" 
                size="lg"
              >
                <HelpCircle className="h-5 w-5" />
                Help
              </Button>
            </Link>
          </nav>
          <div className="absolute bottom-0 w-64 p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2" 
              size="lg"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Log out
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white border-b p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {pathname === "/templates/dashboard" && "Dashboard"}
              {pathname === "/templates/calendar" && "Calendar"}
              {pathname === "/templates/patients" && "Patients"}
              {pathname === "/templates/staff-schedule" && "Staff Schedule"}
              {pathname === "/templates/doctors" && "Doctors"}
              {pathname === "/templates/departments" && "Departments"}
              {pathname === "/templates/prescriptions" && "Prescriptions"}
              {pathname === "/templates/settings" && "Settings"}
              {pathname === "/templates/help" && "Help"}
            </h2>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/doctors/dr-kawasaki.jpg" />
                <AvatarFallback>DK</AvatarFallback>
              </Avatar>
              <span className="font-medium">Dr. Kawasaki</span>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </MainLayout>
  );
} 