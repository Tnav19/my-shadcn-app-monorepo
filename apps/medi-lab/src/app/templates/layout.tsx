"use client";

import DashboardLayout from "./components/DashboardLayout";

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 