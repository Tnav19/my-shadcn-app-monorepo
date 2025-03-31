'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  AlertTriangle,
  Building2,
  CheckCircle,
  ChevronRight,
  Clock,
  Filter,
  Plane,
  Plus,
  Search,
  Users,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { aviationApi, Airport, Flight } from '@/services/aviationApi';

const STATUS_COLORS = {
  active: 'bg-green-500',
  maintenance: 'bg-yellow-500',
  closed: 'bg-red-500',
  weather: 'bg-blue-500',
};

export default function AirportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [airportsResponse, flightsResponse] = await Promise.all([
          aviationApi.getAirports(),
          aviationApi.getActiveFlights(),
        ]);
        setAirports(airportsResponse.data);
        setFlights(flightsResponse);
        setError(null);
      } catch (err) {
        setError('Failed to fetch airport data');
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

  const filteredAirports = airports.filter(airport =>
    airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    airport.iata.toLowerCase().includes(searchQuery.toLowerCase()) ||
    airport.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAirportFlights = (iata: string) => {
    return flights.filter(
      flight => flight.departure.iata === iata || flight.arrival.iata === iata
    );
  };

  const getAirportStatus = (airport: Airport) => {
    const airportFlights = getAirportFlights(airport.iata);
    const hasActiveFlights = airportFlights.some(flight => flight.status === 'active');
    const hasDelayedFlights = airportFlights.some(flight => flight.status === 'delayed');
    
    if (!hasActiveFlights) return 'closed';
    if (hasDelayedFlights) return 'weather';
    return 'active';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Airports</h1>
        <div className="flex items-center space-x-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Airport
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Airport List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search airports..."
                  className="pl-8 mb-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {loading ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="animate-pulse text-gray-500">Loading airports...</div>
                      </div>
                    ) : error ? (
                      <div className="flex items-center justify-center h-32 text-red-500">
                        {error}
                      </div>
                    ) : (
                      filteredAirports.map((airport) => {
                        const status = getAirportStatus(airport);
                        const airportFlights = getAirportFlights(airport.iata);
                        const activeFlights = airportFlights.filter(f => f.status === 'active');
                        const delayedFlights = airportFlights.filter(f => f.status === 'delayed');

                        return (
                          <div
                            key={airport.id}
                            className={`p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                              selectedAirport?.id === airport.id ? 'bg-accent border-primary' : ''
                            }`}
                            onClick={() => setSelectedAirport(airport)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{airport.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {airport.city}, {airport.country} ({airport.iata})
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{airport.iata}</Badge>
                                <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[status]}`} />
                              </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <Plane className="h-4 w-4" />
                                <span>{activeFlights.length} Active Flights</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>{delayedFlights.length} Delayed</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Building2 className="h-4 w-4" />
                                <span>{airport.timezone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4" />
                                <span>{airportFlights.length} Total Flights</span>
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
          {selectedAirport && (
            <Card>
              <CardHeader>
                <CardTitle>Airport Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Location Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>City</span>
                        <span>{selectedAirport.city}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Country</span>
                        <span>{selectedAirport.country}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Timezone</span>
                        <span>{selectedAirport.timezone}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>UTC Offset</span>
                        <span>{selectedAirport.utc_offset}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Flight Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Active Flights</span>
                        <span>{getAirportFlights(selectedAirport.iata).filter(f => f.status === 'active').length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Delayed Flights</span>
                        <span>{getAirportFlights(selectedAirport.iata).filter(f => f.status === 'delayed').length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Total Flights</span>
                        <span>{getAirportFlights(selectedAirport.iata).length}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Coordinates</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Latitude</span>
                        <span>{selectedAirport.latitude}°</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Longitude</span>
                        <span>{selectedAirport.longitude}°</span>
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