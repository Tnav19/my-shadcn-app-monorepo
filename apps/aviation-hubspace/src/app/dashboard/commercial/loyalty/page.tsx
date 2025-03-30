'use client';

import { PlaceholderPage } from "@/app/dashboard/components/PlaceholderPage";
import { Star } from "lucide-react";

export default function LoyaltyPage() {
  return (
    <PlaceholderPage
      title="Loyalty Program"
      description="Manage customer loyalty programs, rewards, and member benefits."
      icon={<Star className="h-6 w-6" />}
    />
  );
} 