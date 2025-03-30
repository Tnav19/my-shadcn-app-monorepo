'use client';

import { PlaceholderPage } from "@/app/dashboard/components/PlaceholderPage";
import { Send } from "lucide-react";

export default function MarketingPage() {
  return (
    <PlaceholderPage
      title="Marketing"
      description="Manage marketing campaigns, promotions, and customer engagement strategies."
      icon={<Send className="h-6 w-6" />}
    />
  );
} 