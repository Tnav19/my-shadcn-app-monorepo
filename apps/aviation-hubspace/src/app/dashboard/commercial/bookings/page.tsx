'use client';

import { PlaceholderPage } from "@/app/dashboard/components/PlaceholderPage";
import { Calendar } from "lucide-react";

export default function BookingsPage() {
  return (
    <PlaceholderPage
      title="Bookings"
      description="Manage flight bookings, reservations, and customer schedules."
      icon={<Calendar className="h-6 w-6" />}
    />
  );
} 