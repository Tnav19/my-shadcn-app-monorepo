import {
  Briefcase,
  Building2,
  Car,
  Cpu,
  Factory,
  Leaf,
  Plane,
  ShoppingBag,
  Stethoscope,
  Wallet
} from 'lucide-react';
import { ReactNode } from 'react';
import { Header } from '../components/header';
import { ThemeProvider } from '../components/theme-provider';

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
  appName = 'HCL Intranet',
}: MainLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background dark:bg-slate-950 transition-colors duration-200">
        <Header appName={appName} />

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground dark:text-white">
              Welcome to {appName}
            </h1>
            <p className="text-xl text-muted-foreground dark:text-slate-400 max-w-2xl mx-auto">
              Select an industry from the grid below to view available applications.
            </p>
          </div>

          {/* Main Content */}
          <main>
            {showIndustries && (
              /* Industries Grid */
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-8 text-center text-foreground dark:text-white">
                  Available Industries
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {industries.map((industry) => {
                    const Icon = industry.icon;
                    return (
                      <a
                        key={industry.href}
                        href={industry.href}
                        className="group relative flex flex-col items-center justify-center p-6 rounded-xl border bg-card dark:bg-slate-900 text-card-foreground dark:text-slate-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/50 dark:border-slate-800 dark:hover:border-primary/50"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <div className="relative mb-4 p-3 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-200">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <span className="relative text-sm font-medium text-center group-hover:text-primary dark:group-hover:text-primary transition-colors duration-200">
                          {industry.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
} 