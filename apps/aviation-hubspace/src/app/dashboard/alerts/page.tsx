'use client';

import { AlertTriangle } from "lucide-react";
import { PlaceholderPage } from "../components/PlaceholderPage";

export default function AlertsPage() {
  return (
    <PlaceholderPage
      title="Active Alerts"
      description="Monitor and manage active alerts, warnings, and critical notifications across the fleet."
      icon={<AlertTriangle className="h-6 w-6" />}
    />
  );
} 