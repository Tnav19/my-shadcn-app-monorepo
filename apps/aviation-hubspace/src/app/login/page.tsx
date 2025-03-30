'use client';

import { Button } from '@repo/ui/components/button';
import { Card, CardContent } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import Image from 'next/image';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (email === 'admin@aviation.com' && password === 'admin123') {
        document.cookie = 'auth-token=demo-token; path=/';
        const from = searchParams.get('from') || '/dashboard';
        router.push(from);
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/aviation-pattern.svg"
          alt="Background Pattern"
          fill
          className="opacity-30 object-cover"
        />
      </div>
      <div className="w-full max-w-[1200px] grid md:grid-cols-2 gap-8 relative">
        {/* Login Form */}
        <Card className="bg-white p-8 shadow-lg">
          <div className="mb-8">
            <Image
              src="/aviation-logo.svg"
              alt="Aviation Hub Logo"
              width={40}
              height={40}
              className="mb-2"
            />
            <h1 className="text-[#14255a] text-2xl font-bold">Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <Input 
                  name="email"
                  type="text" 
                  placeholder="Username"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Input 
                    name="password"
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pr-10"
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="g-recaptcha" data-sitekey="your-recaptcha-site-key"></div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#14255a] hover:bg-[#1c3278] text-white">
                LOGIN
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </Button>

              <div className="flex items-center justify-between text-sm">
                <p className="text-gray-600">Not a subscriber? 
                  <Link href="#" className="text-[#14255a] hover:underline ml-1">Sign up</Link>
                </p>
                <Link href="#" className="text-[#14255a] hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>
        </Card>

        {/* Right Side Content */}
        <div className="hidden md:flex flex-col space-y-6 text-white">
          {/* Welcome Message */}
          <div className="bg-[#1a1f2e] rounded-lg p-6 flex justify-between items-center">
            <h2 className="text-2xl">Hi Robert, welcome back!</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Start an Aircraft Valuation
            </Button>
          </div>

          {/* Recently Saved Valuations */}
          <div className="bg-[#1a1f2e] rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Recently Saved Valuations</h2>
              <Button variant="link" className="text-sm text-blue-400">
                SEE ALL
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  model: "Cessna Caravan",
                  year: "2013",
                  value: "1,000,000",
                  id: "12345789",
                  serial: "5381",
                  period: "2023 Q2"
                },
                {
                  model: "Cessna 172",
                  year: "2013",
                  value: "1,000,000",
                  id: "12345789",
                  serial: "5381",
                  period: "2023 Q2"
                },
                {
                  model: "Gulfstream G550",
                  year: "2013",
                  value: "1,000,000",
                  id: "12345789",
                  serial: "5381",
                  period: "2023 Q2"
                }
              ].map((aircraft, index) => (
                <div key={index} className="bg-[#0f1117] p-4 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span>{aircraft.model}</span>
                    <span className="text-gray-400">{aircraft.year}</span>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-400">Average retail value</div>
                    <div className="text-white">$ {aircraft.value}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <div>Unique ID: {aircraft.id}</div>
                    <div>Serial number: {aircraft.serial}</div>
                    <div>Period: {aircraft.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-[#1a1f2e] p-4">
              <CardContent className="space-y-2">
                <h3 className="text-lg">Help support the data</h3>
                <Button variant="outline" className="w-full text-sm">
                  Submit sales report
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-[#1a1f2e] p-4">
              <CardContent className="space-y-2">
                <h3 className="text-lg">Lean on our expertise</h3>
                <Button variant="outline" className="w-full text-sm">
                  Request an appraisal
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-[#1a1f2e] p-4">
              <CardContent className="space-y-2">
                <h3 className="text-lg">Get more from Aircraft Bluebook</h3>
                <Button variant="outline" className="w-full text-sm">
                  Purchase bulk data
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Business Aviation News */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl">Business Aviation News</h2>
              <span className="text-sm text-gray-400">Keep up with the latest Business Aviation News</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative group cursor-pointer">
                <Image
                  src="/aeroplane1.jpg"
                  alt="Embraer Phenom 300E"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <div className="text-xs text-red-500 mb-2">OCTOBER 12, 2023</div>
                  <h3 className="text-sm font-medium">Embraer Announces Auto-Throttle For Phenom 300E</h3>
                </div>
              </div>
              <div className="relative group cursor-pointer">
                <Image
                  src="/aeroplane2.jpg"
                  alt="Sierra Nevada Corp"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <div className="text-xs text-red-500 mb-2">OCTOBER 10, 2023</div>
                  <h3 className="text-sm font-medium">Sierra Nevada Corp. Wins U.S. Army's Athena ISR Award</h3>
                </div>
              </div>
              <div className="relative group cursor-pointer">
                <Image
                  src="/aeroplane3.jpg"
                  alt="Electric Regional Aviation"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <div className="text-xs text-red-500 mb-2">OCTOBER 8, 2023</div>
                  <h3 className="text-sm font-medium">Initiative To Pave Way For Electric Regional Aviation</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
} 