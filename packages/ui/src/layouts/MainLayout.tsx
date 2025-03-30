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
  Wallet,
  Wine,
  Globe,
  Shield,
  BookOpen,
  Droplet,
  Film,
  Coins,
  ShoppingCart,
  Truck,
  Box,
  Microscope,
  TestTube,
  Scale,
  Hammer,
  HeartPulse,
  Palette,
  Building,
  Newspaper,
  Heart,
  ShieldCheck,
  Utensils,
  Pickaxe,
  Train,
  Lock,
  Users,
  Fuel,
  ChartBar,
  Recycle,
  Gamepad,
  Rocket,
  Diamond,
  Trash
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
  { icon: Droplet, label: 'Agriculture', href: '/industries/agriculture' },
  { icon: Palette, label: 'Arts & Culture', href: '/industries/arts-culture' },
  { icon: Plane, label: 'Aviation', href: '/industries/aviation' },
  { icon: Car, label: 'Automotive', href: '/industries/automotive' },
  { icon: Wallet, label: 'Banking', href: '/industries/banking' },
  { icon: Microscope, label: 'Biotechnology', href: '/industries/biotechnology' },
  { icon: Briefcase, label: 'Consulting', href: '/industries/consulting' },
  { icon: Hammer, label: 'Construction', href: '/industries/construction' },
  { icon: Lock, label: 'Cybersecurity', href: '/industries/cybersecurity' },
  { icon: Shield, label: 'Defense', href: '/industries/defense' },
  { icon: Diamond, label: 'Luxury Goods', href: '/industries/luxury-goods' },
  { icon: BookOpen, label: 'Education', href: '/industries/education' },
  { icon: ShoppingCart, label: 'E-commerce', href: '/industries/e-commerce' },
  { icon: Leaf, label: 'Energy', href: '/industries/energy' },
  { icon: Film, label: 'Entertainment', href: '/industries/entertainment' },
  { icon: Coins, label: 'Finance', href: '/industries/finance' },
  { icon: HeartPulse, label: 'Fitness & Wellness', href: '/industries/fitness-wellness' },
  { icon: Utensils, label: 'Food & Beverage', href: '/industries/food-beverage' },
  { icon: Gamepad, label: 'Gaming & Esports', href: '/industries/gaming-esports' },
  { icon: Building, label: 'Government', href: '/industries/government' },
  { icon: Stethoscope, label: 'Healthcare', href: '/industries/healthcare' },
  { icon: Wine, label: 'Hospitality', href: '/industries/hospitality' },
  { icon: Users, label: 'Human Resources', href: '/industries/human-resources' },
  { icon: ShieldCheck, label: 'Insurance', href: '/industries/insurance' },
  { icon: Scale, label: 'Legal', href: '/industries/legal' },
  { icon: Truck, label: 'Logistics', href: '/industries/logistics' },
  { icon: Factory, label: 'Manufacturing', href: '/industries/manufacturing' },
  { icon: Newspaper, label: 'Media & Publishing', href: '/industries/media-publishing' },
  { icon: Pickaxe, label: 'Mining & Metals', href: '/industries/mining-metals' },
  { icon: Heart, label: 'Nonprofit & Charities', href: '/industries/nonprofit-charities' },
  { icon: TestTube, label: 'Pharmaceuticals', href: '/industries/pharmaceuticals' },
  { icon: Fuel, label: 'Petroleum & Gas', href: '/industries/petroleum-gas' },
  { icon: ChartBar, label: 'Private Equity & VC', href: '/industries/private-equity-vc' },
  { icon: Building2, label: 'Real Estate', href: '/industries/real-estate' },
  { icon: ShoppingBag, label: 'Retail', href: '/industries/retail' },
  { icon: Rocket, label: 'Space Exploration', href: '/industries/space-exploration' },
  { icon: Box, label: 'Supply Chain', href: '/industries/supply-chain' },
  { icon: Recycle, label: 'Sustainability & Environment', href: '/industries/sustainability-environment' },
  { icon: Globe, label: 'Telecommunications', href: '/industries/telecommunications' },
  { icon: Cpu, label: 'Technology', href: '/industries/technology' },
  { icon: Train, label: 'Transportation', href: '/industries/transportation' },
  { icon: Trash, label: 'Waste Management', href: '/industries/waste-management' }
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

        <div className="container mx-auto px-4 py-4">
          {/* Welcome Section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground dark:text-white">
              Welcome to {appName}
            </h1>
            <p className="text-lg text-muted-foreground dark:text-slate-400 max-w-2xl mx-auto">
              Select an industry from the grid below to view available applications.
            </p>
          </div>

          {/* Main Content */}
          <main>
            {showIndustries && (
              /* Industries Grid */
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-center text-foreground dark:text-white">
                  Available Industries
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                  {industries.map((industry) => {
                    const Icon = industry.icon;
                    return (
                      <a
                        key={industry.href}
                        href={industry.href}
                        className="group relative flex flex-col items-center justify-center p-3 rounded-lg border bg-card dark:bg-slate-900 text-card-foreground dark:text-slate-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/50 dark:border-slate-800 dark:hover:border-primary/50"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <div className="relative mb-2 p-2 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-200">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="relative text-xs font-medium text-center group-hover:text-primary dark:group-hover:text-primary transition-colors duration-200">
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