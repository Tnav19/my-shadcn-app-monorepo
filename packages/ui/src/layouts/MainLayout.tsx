import { ReactNode } from 'react';
import { 
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
import { Header } from '../components/header';

interface MainLayoutProps {
  children: ReactNode;
  showIndustries?: boolean;
  isAuthenticated?: boolean;
  appName?: string;
  loginPath?: string;
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

export function MainLayout({ 
  children, 
  showIndustries = true,
  isAuthenticated = false,
  appName = 'HCL Intranet',
  loginPath = '/login'
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={isAuthenticated}
        appName={appName}
        loginPath={loginPath}
      />

      {/* Main Content */}
      <main className="p-6">
        {showIndustries && (
          /* Industries Grid */
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
        )}
        {children}
      </main>
    </div>
  );
} 