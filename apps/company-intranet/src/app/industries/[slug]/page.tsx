import { notFound } from 'next/navigation';
import { Card } from '@repo/ui/components/card';
import { MainLayout } from '@repo/ui/layouts/MainLayout';

// Define web apps for each industry
const industryApps = {
  'healthcare': [
    { 
      name: 'MediLab', 
      description: 'Medical Laboratory Information System', 
      href: 'http://localhost:3001/login',
      requiresAuth: true
    },
  ],
  'manufacturing': [
    { 
      name: 'SafeAQ', 
      description: 'Air Quality Monitoring System', 
      href: 'http://localhost:3001/login',
      requiresAuth: true
    },
  ],
  'technology': [
    { 
      name: 'Company Intranet', 
      description: 'Internal Company Portal', 
      href: 'http://localhost:3000',
      requiresAuth: false
    },
  ],
};

export default async function IndustryPage({ params }: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const apps = industryApps[slug as keyof typeof industryApps] || [];

  if (!apps.length) {
    return notFound();
  }

  return (
    <MainLayout showIndustries={false}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <Card key={app.href}>
            <a 
              href={app.href}
              className="block p-6 hover:bg-accent/50 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">{app.name}</h3>
              <p className="text-muted-foreground">{app.description}</p>
              {app.requiresAuth && (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Requires Login
                  </span>
                </div>
              )}
            </a>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
} 