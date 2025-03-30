'use client';

import { PlaceholderPage } from "@/app/dashboard/components/PlaceholderPage";
import { FileCheck } from "lucide-react";

export default function CertificationsPage() {
  return (
    <PlaceholderPage
      title="Certifications"
      description="Track and manage crew certifications, licenses, and training requirements."
      icon={<FileCheck className="h-6 w-6" />}
    />
  );
} 