import React from 'react';
import { cn } from "@repo/ui/lib/utils"

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function MainLayout({
  children,
  className,
  header,
  footer,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          {header}
        </div>
      </header>

      {/* Main Content */}
      <main className={cn("flex-1 container py-6", className)}>
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          {footer}
        </div>
      </footer>
    </div>
  );
} 