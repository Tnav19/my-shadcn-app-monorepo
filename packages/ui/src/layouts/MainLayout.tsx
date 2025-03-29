import { ReactNode } from 'react';
import { Sidebar, SidebarProvider } from '../components/sidebar';
import { Button } from '../components/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { 
  Bell, 
  Search, 
  Home,
  Building2, 
  Stethoscope,
  Plane,
  Factory,
  Wallet,
  Briefcase,
  ShoppingBag,
  Cpu,
  Car,
  Leaf
} from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

const industries = [
  { icon: Building2, label: 'Real Estate', href: '/industries/real-estate' },
  { icon: Stethoscope, label: 'Healthcare', href: '/industries/healthcare' },
  { icon: Plane, label: 'Aviation', href: '/industries/aviation' },
  { icon: Factory, label: 'Manufacturing', href: '/industries/manufacturing' },
  { icon: Wallet, label: 'Banking', href: '/industries/banking' },
  { icon: Briefcase, label: 'Consulting', href: '/industries/consulting' },
  { icon: ShoppingBag, label: 'Retail', href: '/industries/retail' },
  { icon: Cpu, label: 'Technology', href: '/industries/technology' },
  { icon: Car, label: 'Automotive', href: '/industries/automotive' },
  { icon: Leaf, label: 'Energy', href: '/industries/energy' },
];

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
              <a href="/" className="mr-6 flex items-center space-x-2">
                <Home className="h-6 w-6" />
                <span className="font-bold">HCL Intranet</span>
              </a>
            </div>

            <div className="flex flex-1 items-center justify-end space-x-2">
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
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex">
          {/* Sidebar */}
          <Sidebar className="hidden lg:block" />
          
          {/* Content */}
          <main className="flex-1 p-6">
            {/* Industries Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Industries</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {industries.map((industry) => {
                  const Icon = industry.icon;
                  return (
                    <a
                      key={industry.href}
                      href={industry.href}
                      className="group flex flex-col items-center justify-center p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="mb-3 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-center">{industry.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
} 