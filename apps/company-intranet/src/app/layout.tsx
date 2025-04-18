import { MainLayout } from '@repo/ui/layouts/MainLayout';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "@repo/ui/globals.css";
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HCL Intranet',
  description: 'Internal company portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
