"use client";

import { Building2, Search, Bell } from "lucide-react";
import { Input } from "@repo/ui/components/input";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-blue-600">
          <Building2 size={24} />
          <span className="font-semibold">BoardCo.</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-4 ml-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600">Home</Link>
          <Link href="/contacts" className="text-sm font-medium hover:text-blue-600">Contacts</Link>
          <Link href="/news" className="text-sm font-medium hover:text-blue-600">News</Link>
          <Link href="/for-employees" className="text-sm font-medium hover:text-blue-600">For employees</Link>
          <Link href="/applications" className="text-sm font-medium hover:text-blue-600">Applications</Link>
          <Link href="/documents" className="text-sm font-medium hover:text-blue-600">Documents</Link>
        </nav>

        {/* Search */}
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-72 pl-8"
            />
          </div>

          {/* Notifications */}
          <button className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
} 