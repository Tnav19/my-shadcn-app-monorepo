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
  Search,
  Settings,
  Users,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { aviationApi, Airplane, Flight } from '@/services/aviationApi';

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500',
  maintenance: 'bg-yellow-500',
  grounded: 'bg-red-500',
  scheduled: 'bg-blue-500',
};

export default function FleetPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [airplanes, setAirplanes] = useState<Airplane[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAirplane, setSelectedAirplane] = useState<Airplane | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [airplanesResponse, flightsResponse] = await Promise.all([
          aviationApi.getAirplanes(),
          aviationApi.getActiveFlights(),
        ]);
        setAirplanes(airplanesResponse.data);
        setFlights(flightsResponse);
        setError(null);
      } catch (err) {
        setError('Failed to fetch aircraft data');
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

  const filteredAirplanes = airplanes.filter(airplane =>
    (airplane.registration_number || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (airplane.iata_type || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (airplane.model_name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAirplaneFlights = (registrationNumber: string) => {
    return flights.filter(flight => flight.aircraft_type === registrationNumber);
  };

  const getAirplaneStatus = (airplane: Airplane) => {
    const airplaneFlights = getAirplaneFlights(airplane.registration_number);
    const hasActiveFlights = airplaneFlights.some(flight => flight.status === 'active');
    const hasScheduledFlights = airplaneFlights.some(flight => flight.status === 'scheduled');
    
    if (airplane.plane_status === 'maintenance') return 'maintenance';
    if (!hasActiveFlights && !hasScheduledFlights) return 'grounded';
    if (hasActiveFlights) return 'active';
    if (hasScheduledFlights) return 'scheduled';
    return 'grounded';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Fleet Management</h1>
        <div className="flex items-center space-x-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Aircraft
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Aircraft Fleet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search aircraft..."
                  className="pl-8 mb-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {loading ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="animate-pulse text-gray-500">Loading aircraft data...</div>
                      </div>
                    ) : error ? (
                      <div className="flex items-center justify-center h-32 text-red-500">
                        {error}
                      </div>
                    ) : (
                      filteredAirplanes.map((airplane) => {
                        const status = getAirplaneStatus(airplane);
                        const airplaneFlights = getAirplaneFlights(airplane.registration_number);
                        const activeFlights = airplaneFlights.filter(f => f.status === 'active');
                        const scheduledFlights = airplaneFlights.filter(f => f.status === 'scheduled');

                        return (
                          <div
                            key={airplane.id}
                            className={`p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                              selectedAirplane?.id === airplane.id ? 'bg-accent border-primary' : ''
                            }`}
                            onClick={() => setSelectedAirplane(airplane)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{airplane.registration_number}</div>
                                <div className="text-sm text-muted-foreground">
                                  {airplane.production_line} - {airplane.iata_type}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{airplane.iata_code_short}</Badge>
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
                                <span>{scheduledFlights.length} Scheduled</span>
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
          {selectedAirplane && (
            <Card>
              <CardHeader>
                <CardTitle>Aircraft Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Specifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Registration</span>
                        <span>{selectedAirplane.registration_number}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Model</span>
                        <span>{selectedAirplane.model_name} ({selectedAirplane.model_code})</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Production Line</span>
                        <span>{selectedAirplane.production_line}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Age</span>
                        <span>{selectedAirplane.plane_age} years</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Engines</span>
                        <span>{selectedAirplane.engines_count} x {selectedAirplane.engines_type}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Flight Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Active Flights</span>
                        <span>{getAirplaneFlights(selectedAirplane.registration_number).filter(f => f.status === 'active').length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Scheduled Flights</span>
                        <span>{getAirplaneFlights(selectedAirplane.registration_number).filter(f => f.status === 'scheduled').length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Total Flights</span>
                        <span>{getAirplaneFlights(selectedAirplane.registration_number).length}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">History</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>First Flight</span>
                        <span>{new Date(selectedAirplane.first_flight_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Delivery Date</span>
                        <span>{new Date(selectedAirplane.delivery_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Owner</span>
                        <span>{selectedAirplane.plane_owner}</span>
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