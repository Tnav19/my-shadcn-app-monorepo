import { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  category:
    | "overview"
    | "management"
    | "operations"
    | "analytics"
    | "communications"
    | "security"
    | "settings"
    | "inventory"
    | "crew"
    | "fleet"
    | "parts"
    | "maintenance"
    | "manufacturing"
    | "sales"
    | "revenue"
    | "tracking"
    | "weather"
    | "reports"
    | "radar"
    | "commercial"
    | "finance"
    | "admin";
  badge?: {
    count: number;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
}

export interface NavCategory {
  id: string;
  title: string;
  items: NavItem[];
}
