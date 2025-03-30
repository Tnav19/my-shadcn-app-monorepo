import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "@repo/ui/globals.css";
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Aviation Hubspace",
  description: "Comprehensive aviation management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
