'use client';

import { PlaceholderPage } from "@/app/dashboard/components/PlaceholderPage";
import { DollarSign } from "lucide-react";

export default function RevenuePage() {
  return (
    <PlaceholderPage
      title="Revenue Management"
      description="Track revenue streams, analyze financial performance, and manage pricing strategies."
      icon={<DollarSign className="h-6 w-6" />}
    />
  );
} 