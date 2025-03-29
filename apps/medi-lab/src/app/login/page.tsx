"use client";

import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { MainLayout } from "@repo/ui/layouts/MainLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  // Check if we're running in standalone mode (port 3001)
  const isStandalone = process.env.NEXT_PUBLIC_PORT === '3001';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add your login logic here
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set auth token
      document.cookie = "medi-lab-auth=true; path=/";
      
      // If login is successful
      router.push(isStandalone ? "/templates/dashboard" : "/templates/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout 
      showIndustries={false}
      isAuthenticated={false}
      appName="MediLab"
      loginPath={isStandalone ? "/login" : "/login"}
    >
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <CardHeader className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-blue-500">MediLab</h1>
            <p className="text-sm text-muted-foreground">
              Employee internal dashboard
            </p>
          </CardHeader>
          <CardContent>
            <div className="mt-4 mb-8">
              <p className="text-center text-sm">
                Please log in using your employee credentials
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  type="text"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  type="password"
                  required
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 