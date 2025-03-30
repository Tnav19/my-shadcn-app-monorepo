'use client';

import { PlaceholderPage } from "@/app/dashboard/components/PlaceholderPage";
import { DollarSign } from "lucide-react";

export default function FinancePage() {
  return (
    <PlaceholderPage
      title="Finance"
      description="Manage financial operations, budgets, and financial reporting."
      icon={<DollarSign className="h-6 w-6" />}
    />
  );
} 