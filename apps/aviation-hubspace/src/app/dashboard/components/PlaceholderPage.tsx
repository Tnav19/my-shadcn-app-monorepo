'use client';

import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { BreadcrumbNav } from "./BreadcrumbNav";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <BreadcrumbNav />
      </div>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          {icon && <div className="h-6 w-6">{icon}</div>}
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground mb-4">
            {description || `The ${title} page is under development.`}
          </p>
          <Button onClick={() => router.push('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
} 