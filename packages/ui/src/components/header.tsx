import { Home } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

interface HeaderProps {
  appName?: string;
}

export function Header({ appName = 'HCL Intranet' }: HeaderProps) {
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
          <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
} 