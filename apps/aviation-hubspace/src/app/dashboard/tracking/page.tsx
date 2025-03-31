'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  AlertTriangle,
  Clock,
  Filter,
  Plane,
  Plus,
  RefreshCw,
  Search,
  Settings,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { aviationApi, FlightTracking } from '@/services/aviationApi';
import DynamicMap from '@/components/DynamicMap';

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500',
  delayed: 'bg-yellow-500',
  diverted: 'bg-orange-500',
  incident: 'bg-red-500',
  scheduled: 'bg-blue-500',
  cancelled: 'bg-red-500',
  completed: 'bg-green-500',
  landed: 'bg-purple-500'
};

export default function TrackingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [flights, setFlights] = useState<FlightTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<FlightTracking | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await aviationApi.getFlights({
        flight_status: 'active',
        limit: 100,
      });
      setFlights(response.data);
      setRetryCount(0); // Reset retry count on success
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message);
      
      // Handle rate limit errors
      if (err.message.includes('Rate limit exceeded')) {
        if (retryCount < maxRetries) {
          // Exponential backoff: wait longer between each retry
          const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, delay);
        } else {
          setError('Maximum retry attempts reached. Please try again later.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [retryCount]);

  const filteredFlights = flights.filter(flight =>
    flight.flight.iata.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.airline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.departure.iata.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.arrival.iata.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Flight Tracking</h1>
        <div className="flex items-center space-x-4">
          <Button onClick={fetchData} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Flight
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Live Flight Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-[600px] rounded-lg overflow-hidden">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                    <div className="animate-pulse text-gray-500">
                      {retryCount > 0 ? `Retrying... (${retryCount}/${maxRetries})` : 'Loading flight data...'}
                    </div>
                  </div>
                ) : error ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                    <div className="text-red-500 flex flex-col items-center space-y-2">
                      <AlertTriangle className="h-6 w-6" />
                      <span>{error}</span>
                      {retryCount < maxRetries && (
                        <span className="text-sm text-muted-foreground">
                          Retrying in {Math.min(1000 * Math.pow(2, retryCount), 10000) / 1000} seconds...
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <DynamicMap
                    selectedAircraftId={selectedFlight?.flight.iata}
                    onAircraftClick={(id) => {
                      const flight = flights.find(f => f.flight.iata === id);
                      if (flight) setSelectedFlight(flight);
                    }}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
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
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {filteredFlights.map((flight) => (
                      <div
                        key={flight.flight.iata}
                        className={`p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                          selectedFlight?.flight.iata === flight.flight.iata ? 'bg-accent border-primary' : ''
                        }`}
                        onClick={() => setSelectedFlight(flight)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{flight.flight.iata}</div>
                            <div className="text-sm text-muted-foreground">
                              {flight.airline.name}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{flight.aircraft?.iata || 'N/A'}</Badge>
                            <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[flight.flight_status]}`} />
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Plane className="h-4 w-4" />
                            <span>{flight.departure.iata} → {flight.arrival.iata}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{formatDate(flight.departure.scheduled)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

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
                        <span>{selectedFlight.flight.iata}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Airline</span>
                        <span>{selectedFlight.airline.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Aircraft</span>
                        <span>{selectedFlight.aircraft?.iata || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Schedule</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>From</span>
                        <span>{selectedFlight.departure.airport} ({selectedFlight.departure.iata})</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>To</span>
                        <span>{selectedFlight.arrival.airport} ({selectedFlight.arrival.iata})</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Departure</span>
                        <span>{formatDate(selectedFlight.departure.scheduled)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Arrival</span>
                        <span>{formatDate(selectedFlight.arrival.scheduled)}</span>
                      </div>
                    </div>
                  </div>

                  {selectedFlight.live && (
                    <div>
                      <h3 className="font-medium mb-2">Live Data</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Altitude</span>
                          <span>{Math.round(selectedFlight.live.altitude)}m</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Speed</span>
                          <span>{Math.round(selectedFlight.live.speed_horizontal)} km/h</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Direction</span>
                          <span>{Math.round(selectedFlight.live.direction)}°</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Status</span>
                          <span className="capitalize">{selectedFlight.live.is_ground ? 'On Ground' : 'In Air'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium mb-2">Status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Status</span>
                        <span className="capitalize">{selectedFlight.flight_status}</span>
                      </div>
                      {selectedFlight.departure.delay > 0 && (
                        <div className="flex items-center justify-between text-sm text-yellow-500">
                          <span>Delay</span>
                          <span>{selectedFlight.departure.delay} minutes</span>
                        </div>
                      )}
                      {selectedFlight.flight.codeshared && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Codeshared</span>
                          <span>
                            {selectedFlight.flight.codeshared.airline_name} {selectedFlight.flight.codeshared.flight_number}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Aircraft Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Aircraft</p>
                        <p className="font-medium">{selectedFlight.aircraft?.iata || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Registration</p>
                        <p className="font-medium">{selectedFlight.aircraft?.registration || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Model</p>
                        <p className="font-medium">{selectedFlight.aircraft?.model || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Serial Number</p>
                        <p className="font-medium">{selectedFlight.aircraft?.serial_number || 'N/A'}</p>
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