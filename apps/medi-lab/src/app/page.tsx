import { redirect } from "next/navigation";

export default async function Home() {
  // Check if we're running in standalone mode (port 3001)
  const isStandalone = process.env.PORT === '3001';
  redirect(isStandalone ? "/login" : "/login");
}
