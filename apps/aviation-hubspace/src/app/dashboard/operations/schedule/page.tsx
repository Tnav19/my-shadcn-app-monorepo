'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  Calendar,
  Clock,
  Filter,
  Plane,
  Plus,
  Search,
  Settings,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { aviationApi, TimetableFlight, FutureFlight } from '@/services/aviationApi';

const STATUS_COLORS: Record<string, string> = {
  scheduled: 'bg-blue-500',
  delayed: 'bg-yellow-500',
  cancelled: 'bg-red-500',
  completed: 'bg-green-500',
  active: 'bg-green-500',
  landed: 'bg-purple-500',
  incident: 'bg-red-500',
  diverted: 'bg-orange-500'
};

export default function SchedulePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'current' | 'future'>('current');
  const [timetableFlights, setTimetableFlights] = useState<TimetableFlight[]>([]);
  const [futureFlights, setFutureFlights] = useState<FutureFlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<TimetableFlight | FutureFlight | null>(null);
  const [selectedAirport, setSelectedAirport] = useState('DXB'); // Default to Dubai International

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [timetableResponse, futureResponse] = await Promise.all([
          aviationApi.getTimetable({
            iataCode: selectedAirport,
            type: 'departure',
            date: new Date().toISOString().split('T')[0],
          }),
          aviationApi.getFutureFlights({
            iataCode: selectedAirport,
            type: 'arrival',
            date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
          }),
        ]);
        setTimetableFlights(timetableResponse.data);
        setFutureFlights(futureResponse.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch schedule data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, [selectedAirport]);

  const filteredFlights = (viewMode === 'current' ? timetableFlights : futureFlights).filter(flight =>
    flight.flight.iataNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.airline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (viewMode === 'current' 
      ? flight.departure.iataCode.toLowerCase().includes(searchQuery.toLowerCase())
      : flight.departure.iataCode.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const isFutureFlight = (flight: TimetableFlight | FutureFlight): flight is FutureFlight => {
    return 'weekday' in flight;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Flight Schedule</h1>
        <div className="flex items-center space-x-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Schedule
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Flight Schedules</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === 'current' ? 'default' : 'outline'}
                    onClick={() => setViewMode('current')}
                  >
                    Current
                  </Button>
                  <Button
                    variant={viewMode === 'future' ? 'default' : 'outline'}
                    onClick={() => setViewMode('future')}
                  >
                    Future
                  </Button>
                </div>
              </div>
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
                        <div className="animate-pulse text-gray-500">Loading schedule data...</div>
                      </div>
                    ) : error ? (
                      <div className="flex items-center justify-center h-32 text-red-500">
                        {error}
                      </div>
                    ) : (
                      filteredFlights.map((flight) => (
                        <div
                          key={isFutureFlight(flight) ? flight.flight.iataNumber : flight.flight.iataNumber}
                          className={`p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                            selectedFlight?.flight.iataNumber === flight.flight.iataNumber ? 'bg-accent border-primary' : ''
                          }`}
                          onClick={() => setSelectedFlight(flight)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{flight.flight.iataNumber}</div>
                              <div className="text-sm text-muted-foreground">
                                {flight.airline.name}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">
                                {isFutureFlight(flight) ? flight.aircraft.modelText : flight.flight.iataNumber}
                              </Badge>
                              {!isFutureFlight(flight) && (
                                <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[flight.status]}`} />
                              )}
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Plane className="h-4 w-4" />
                              <span>{flight.departure.iataCode} → {flight.arrival.iataCode}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                {isFutureFlight(flight)
                                  ? flight.departure.scheduledTime
                                  : formatDate(flight.departure.scheduledTime)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
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
                        <span>{selectedFlight.flight.iataNumber}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Airline</span>
                        <span>{selectedFlight.airline.name}</span>
                      </div>
                      {isFutureFlight(selectedFlight) && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Aircraft</span>
                          <span>{selectedFlight.aircraft.modelText}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Schedule</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>From</span>
                        <span>{selectedFlight.departure.iataCode}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>To</span>
                        <span>{selectedFlight.arrival.iataCode}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Departure</span>
                        <span>
                          {isFutureFlight(selectedFlight)
                            ? selectedFlight.departure.scheduledTime
                            : formatDate(selectedFlight.departure.scheduledTime)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Arrival</span>
                        <span>
                          {isFutureFlight(selectedFlight)
                            ? selectedFlight.arrival.scheduledTime
                            : formatDate(selectedFlight.arrival.scheduledTime)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {!isFutureFlight(selectedFlight) && (
                    <div>
                      <h3 className="font-medium mb-2">Status</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Status</span>
                          <span className="capitalize">{selectedFlight.status}</span>
                        </div>
                        {selectedFlight.departure.delay && (
                          <div className="flex items-center justify-between text-sm text-yellow-500">
                            <span>Delay</span>
                            <span>{selectedFlight.departure.delay} minutes</span>
                          </div>
                        )}
                        {selectedFlight.codeshared && (
                          <div className="flex items-center justify-between text-sm">
                            <span>Codeshared</span>
                            <span>
                              {selectedFlight.codeshared.airline.name} {selectedFlight.codeshared.flight.number}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 