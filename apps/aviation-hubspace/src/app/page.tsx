'use client';

import { Button } from '@repo/ui/components/button';
import { Card, CardContent } from '@repo/ui/components/card';
import { ChevronRight, Plane, BarChart3, Wrench, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1f44] to-[#1a365d]">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Plane className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">AviationHub</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/products" className="text-gray-300 hover:text-white">Products</Link>
          <Link href="/reference" className="text-gray-300 hover:text-white">Reference</Link>
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#0a1f44]">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold text-white mb-6">
            ACCESS TRUSTED
            <span className="block text-4xl text-blue-300 mt-2">
              ACCESS TRUSTED DATA
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Unlock the true value of your aircraft with our expert appraisal services.
            Trust us to help you make informed decisions in the world of aviation.
          </p>
          <div className="flex space-x-4">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg">
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#0a1f44] px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white/10 border-0">
            <CardContent className="p-6">
              <BarChart3 className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Aircraft Valuation Data
              </h3>
              <p className="text-gray-300">
                Access comprehensive valuation data for informed decision-making in aircraft transactions.
              </p>
              <Button variant="link" className="text-blue-300 hover:text-blue-400 mt-4 p-0">
                Learn More <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-0">
            <CardContent className="p-6">
              <Wrench className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Maintenance Programs
              </h3>
              <p className="text-gray-300">
                Find the right maintenance program or insurer for your aircraft needs.
              </p>
              <Button variant="link" className="text-blue-300 hover:text-blue-400 mt-4 p-0">
                Learn More <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-0">
            <CardContent className="p-6">
              <Building2 className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Airport Management
              </h3>
              <p className="text-gray-300">
                Comprehensive tools for efficient airport operations and management.
              </p>
              <Button variant="link" className="text-blue-300 hover:text-blue-400 mt-4 p-0">
                Learn More <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-blue-900/50 border-0">
          <CardContent className="p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-2">
                Have your aircraft appraised?
              </h2>
              <p className="text-gray-300">
                Unlock the true value of your aircraft with our expert appraisal services.
                Trust us to help you make informed decisions in the world of aviation.
              </p>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg whitespace-nowrap">
              READ MORE
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
