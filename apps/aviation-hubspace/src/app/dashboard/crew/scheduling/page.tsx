'use client';

import { Airline, aviationApi, Flight } from '@/services/aviationApi';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  Plus,
  Search
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/tabs';

export default function CrewSchedulingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [flightsResponse, airlinesResponse] = await Promise.all([
          aviationApi.getActiveFlights(),
          aviationApi.getAirlines(),
        ]);
        setFlights(flightsResponse);
        setAirlines(airlinesResponse.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch flight data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  const filteredFlights = flights.filter(flight =>
    flight.flight_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.airline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.departure.airport.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.arrival.airport.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAirlineLogo = (iata: string) => {
    const airline = airlines.find(a => a.iata === iata);
    return airline?.logo || null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Crew Scheduling</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Assign Crew
        </Button>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Flights</TabsTrigger>
          <TabsTrigger value="future">Future Flights</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search flights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Current Flight Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredFlights.map((flight) => (
                    <Card key={flight.flight_number} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-8 h-8">
                            <Image
                              src={getAirlineLogo(flight.airline.iata) || '/placeholder-airline.png'}
                              alt={flight.airline.name}
                              fill
                              className="rounded-full object-cover"
                              sizes="32px"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{flight.airline.name}</h3>
                            <p className="text-sm text-gray-500">
                              {flight.flight_number}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {format(new Date(flight.departure.scheduled), 'MMM d, HH:mm')}
                        </Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">From</p>
                          <p className="font-medium">{flight.departure.airport}</p>
                          <p className="text-sm text-gray-500">{flight.departure.iata}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium">{flight.duration} minutes</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">To</p>
                          <p className="font-medium">{flight.arrival.airport}</p>
                          <p className="text-sm text-gray-500">{flight.arrival.iata}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="future" className="space-y-4">
          {/* Similar structure for future flights */}
        </TabsContent>
      </Tabs>
    </div>
  );
} 