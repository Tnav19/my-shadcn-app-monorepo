'use client';

import { useState, useEffect } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Button } from '@repo/ui/components/button';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { Input } from '@repo/ui/components/input';
import { Badge } from '@repo/ui/components/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import {
  LayoutDashboard,
  Plane,
  Settings,
  Package,
  Factory,
  ShoppingCart,
  Building2,
  LineChart,
  Bell,
  Search,
  Menu,
  ChevronDown,
  User,
  LogOut,
  HelpCircle,
  Sun,
  Moon,
  BellRing,
  BellOff,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getNavigation } from '@/services/navigation';
import type { NavCategory } from '@/types/navigation';
import { useTheme } from '@/components/theme-provider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState<NavCategory[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const loadNavigation = async () => {
      const nav = await getNavigation();
      setNavigation(nav);
      
      // Find the most specific category that contains the current path
      const activeCategories = nav.filter(category =>
        category.items.some(item => {
          // Check if the current path starts with the item's href
          const isMatch = pathname.startsWith(item.href);
          // For overview items, only match if the path is exactly the same
          if (category.id === 'overview') {
            return pathname === item.href;
          }
          return isMatch;
        })
      );
      
      // Expand only the most specific matching category
      if (activeCategories.length > 0) {
        // Sort categories by their items' href length to get the most specific match
        const sortedCategories = activeCategories.sort((a, b) => {
          const aMaxLength = Math.max(...a.items.map(item => item.href.length));
          const bMaxLength = Math.max(...b.items.map(item => item.href.length));
          return bMaxLength - aMaxLength;
        });
        
        // Take only the most specific category
        setExpandedCategories([sortedCategories[0].id]);
      }
    };
    loadNavigation();
  }, [pathname]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const renderNavItem = (item: NavCategory['items'][0]) => {
    const isActive = pathname === item.href;
    return (
      <Link
        key={item.id}
        href={item.href}
        className={cn(
          'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
          isActive
            ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-sm'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50'
        )}
      >
        <item.icon
          className={cn(
            'mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200',
            isActive
              ? 'text-primary'
              : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400'
          )}
        />
        <span className="flex-1">{item.title}</span>
        {item.badge && (
          <Badge 
            variant={item.badge.variant} 
            className={cn(
              'ml-2 transition-all duration-200',
              isActive ? 'bg-primary/20 text-primary' : ''
            )}
          >
            {item.badge.count}
          </Badge>
        )}
      </Link>
    );
  };

  const renderNavCategory = (category: NavCategory) => {
    const isExpanded = expandedCategories.includes(category.id);
    const hasActiveItem = category.items.some(item => pathname.startsWith(item.href));

    return (
      <div key={category.id} className="space-y-1">
        <button
          onClick={() => toggleCategory(category.id)}
          className={cn(
            'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
            hasActiveItem 
              ? 'text-primary bg-gradient-to-r from-primary/10 to-transparent' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50'
          )}
        >
          <span className="flex-1">{category.title}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-all duration-200',
              isExpanded ? 'transform rotate-180' : ''
            )}
          />
        </button>
        {isExpanded && (
          <div className="ml-4 space-y-1">
            {category.items.map(renderNavItem)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <div className="fixed inset-0 z-40 flex">
          <div
            className={cn(
              'fixed inset-0 bg-gray-600/75 backdrop-blur-sm transition-opacity',
              sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className={cn(
              'relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 transform transition-transform border-r border-gray-200 dark:border-gray-700',
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            )}
          >
            <ScrollArea className="flex-1 h-0 pt-5 pb-4">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Aviation HubSpace
                </h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map(renderNavCategory)}
              </nav>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <ScrollArea className="flex-1 flex flex-col pt-5 pb-4">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Aviation HubSpace
              </h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map(renderNavCategory)}
            </nav>
          </ScrollArea>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            size="icon"
            className="px-4 border-r border-gray-200/50 dark:border-gray-700/50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="block w-full h-full pl-8 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              >
                <span className="sr-only">Toggle notifications</span>
                {notificationsEnabled ? (
                  <BellRing className="h-6 w-6" />
                ) : (
                  <BellOff className="h-6 w-6" />
                )}
                {notificationsEnabled && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                <span className="sr-only">Toggle theme</span>
                {theme === 'light' ? (
                  <Moon className="h-6 w-6" />
                ) : (
                  <Sun className="h-6 w-6" />
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                      <AvatarImage src="/avatars/01.png" alt="User avatar" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-gray-500">john.doe@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 