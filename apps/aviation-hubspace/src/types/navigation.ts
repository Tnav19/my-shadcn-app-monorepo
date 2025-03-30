import { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  category: "overview" | "management" | "operations" | "analytics";
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