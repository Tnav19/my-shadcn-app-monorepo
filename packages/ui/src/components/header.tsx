import { Button } from './button';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Bell, Search, Home, LogIn } from 'lucide-react';

interface HeaderProps {
  isAuthenticated?: boolean;
  appName?: string;
  loginPath?: string;
}

export function Header({ isAuthenticated = false, appName = 'HCL Intranet', loginPath = '/login' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6">
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="font-bold">{appName}</span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="/avatars/default.png" alt="User" />
                <AvatarFallback>HCL</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <Button variant="default" asChild>
              <a href={loginPath} className="flex items-center space-x-2">
                <LogIn className="h-4 w-4 mr-2" />
                <span>Login</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
} 