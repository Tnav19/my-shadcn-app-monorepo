'use client';

import { PlaceholderPage } from "@/app/dashboard/components/PlaceholderPage";
import { LineChart } from "lucide-react";

export default function PerformancePage() {
  return (
    <PlaceholderPage
      title="Performance Analytics"
      description="Track and analyze key performance indicators and metrics."
      icon={<LineChart className="h-6 w-6" />}
    />
  );
} 