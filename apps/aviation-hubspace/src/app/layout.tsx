import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import "@repo/ui/globals.css";
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aviation HubSpace',
  description: 'Modern aviation management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" storageKey="theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
