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

interface CrewMember {
  id: string;
  name: string;
  role: 'pilot' | 'flight_attendant' | 'ground_crew';
  status: 'available' | 'assigned' | 'off_duty';
  currentFlight: string | null;
  nextFlight: string | null;
  restHours: number;
}

const STATUS_COLORS = {
  available: 'bg-green-500',
  assigned: 'bg-blue-500',
  off_duty: 'bg-gray-500'
};

export default function CrewSchedulingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Crew Scheduling</h1>
        <div className="flex items-center space-x-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Assign Crew
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Flights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search flights..."
                  className="pl-8 mb-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {loading ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="animate-pulse text-gray-500">Loading flight data...</div>
                      </div>
                    ) : error ? (
                      <div className="flex items-center justify-center h-32 text-red-500">
                        {error}
                      </div>
                    ) : (
                      filteredFlights.map((flight) => {
                        const airlineLogo = getAirlineLogo(flight.airline.iata);
                        return (
                          <div
                            key={flight.id}
                            className={`p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                              selectedFlight?.id === flight.id ? 'bg-accent border-primary' : ''
                            }`}
                            onClick={() => setSelectedFlight(flight)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                {airlineLogo && (
                                  <img
                                    src={airlineLogo}
                                    alt={flight.airline.name}
                                    className="w-8 h-8 object-contain"
                                  />
                                )}
                                <div>
                                  <div className="font-medium">Flight {flight.flight_number}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {flight.airline.name}
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline">{flight.status}</Badge>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Departure</div>
                                <div className="font-medium">{flight.departure.airport}</div>
                                <div className="text-muted-foreground">
                                  {formatDate(flight.departure.scheduled)}
                                </div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Arrival</div>
                                <div className="font-medium">{flight.arrival.airport}</div>
                                <div className="text-muted-foreground">
                                  {formatDate(flight.arrival.scheduled)}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {selectedFlight && (
            <Card>
              <CardHeader>
                <CardTitle>Flight Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Flight Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Flight Number</span>
                        <span>{selectedFlight.flight_number}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Airline</span>
                        <span>{selectedFlight.airline.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Status</span>
                        <Badge variant="outline">{selectedFlight.status}</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Schedule</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Departure</span>
                        <span>{formatDate(selectedFlight.departure.scheduled)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Arrival</span>
                        <span>{formatDate(selectedFlight.arrival.scheduled)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Duration</span>
                        <span>{selectedFlight.duration} minutes</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Crew Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Pilots</span>
                        <span>2 Assigned</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Flight Attendants</span>
                        <span>4 Assigned</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Ground Crew</span>
                        <span>3 Assigned</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 