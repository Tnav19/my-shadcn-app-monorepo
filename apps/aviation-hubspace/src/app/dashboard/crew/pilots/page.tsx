'use client';

import { PlaceholderPage } from "@/app/dashboard/components/PlaceholderPage";
import { Plane } from "lucide-react";

export default function PilotsPage() {
  return (
    <PlaceholderPage
      title="Pilots"
      description="Manage pilot schedules, qualifications, and flight assignments."
      icon={<Plane className="h-6 w-6" />}
    />
  );
} 