import { getNavigation } from "@/services/navigation";
import fs from "fs";
import path from "path";

async function generatePages() {
  const navigation = await getNavigation();
  const baseDir = path.join(process.cwd(), "src/app/dashboard");

  for (const category of navigation) {
    for (const item of category.items) {
      const routePath = item.href.replace("/dashboard", "");
      const pageDir = path.join(baseDir, routePath);
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(pageDir)) {
        fs.mkdirSync(pageDir, { recursive: true });
      }

      // Create page.tsx
      const pageContent = `'use client';

import { PlaceholderPage } from "../components/PlaceholderPage";
import { ${item.icon.name} } from "lucide-react";

export default function ${item.title.replace(/\s+/g, '')}Page() {
  return (
    <PlaceholderPage
      title="${item.title}"
      description="This page is under development and will be available soon."
      icon={<${item.icon.name} className="h-6 w-6" />}
    />
  );
}`;

      fs.writeFileSync(path.join(pageDir, "page.tsx"), pageContent);
    }
  }
}

generatePages().catch(console.error); 