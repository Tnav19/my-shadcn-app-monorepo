'use client';

import { AircraftType, aviationApi, Flight } from '@/services/aviationApi';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  Clock,
  Plane,
  Plus,
  Search
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface HealthMetric {
  id: string;
  aircraftId: string;
  system: string;
  metric: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  timestamp: string;
  trend: 'stable' | 'up' | 'down';
}

interface Alert {
  id: string;
  aircraftId: string;
  type: 'system' | 'maintenance' | 'performance';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

const STATUS_COLORS = {
  normal: 'bg-green-500',
  warning: 'bg-yellow-500',
  critical: 'bg-red-500'
};

const SEVERITY_COLORS = {
  low: 'bg-yellow-500',
  medium: 'bg-orange-500',
  high: 'bg-red-500'
};

export default function FleetHealthPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [aircraftTypes, setAircraftTypes] = useState<AircraftType[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAircraft, setSelectedAircraft] = useState<AircraftType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [aircraftResponse, flightsResponse] = await Promise.all([
          aviationApi.getAircraftTypes(),
          aviationApi.getActiveFlights(),
        ]);
        setAircraftTypes(aircraftResponse.data);
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

  const filteredAircraft = aircraftTypes.filter(aircraft =>
    aircraft.aircraft_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aircraft.iata_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAircraftFlights = (iata: string) => {
    return flights.filter(flight => flight.aircraft_type === iata);
  };

  const getAircraftStatus = (aircraft: AircraftType) => {
    const aircraftFlights = getAircraftFlights(aircraft.iata_code);
    const hasActiveFlights = aircraftFlights.some(flight => flight.status === 'active');
    const hasDelayedFlights = aircraftFlights.some(flight => flight.status === 'delayed');
    
    if (hasDelayedFlights) return 'warning';
    if (hasActiveFlights) return 'normal';
    return 'critical';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Fleet Health</h1>
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
              <CardTitle>Aircraft Status</CardTitle>
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
                      filteredAircraft.map((aircraft) => {
                        const status = getAircraftStatus(aircraft);
                        const aircraftFlights = getAircraftFlights(aircraft.iata_code);
                        const activeFlights = aircraftFlights.filter(f => f.status === 'active');
                        const delayedFlights = aircraftFlights.filter(f => f.status === 'delayed');

                        return (
                          <div
                            key={aircraft.iata_code}
                            className={`p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                              selectedAircraft?.iata_code === aircraft.iata_code ? 'bg-accent border-primary' : ''
                            }`}
                            onClick={() => setSelectedAircraft(aircraft)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{aircraft.aircraft_name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {aircraft.iata_code}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{aircraft.iata_code}</Badge>
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
          {selectedAircraft && (
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
                        <span>Type</span>
                        <span>{selectedAircraft.iata_code}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>IATA Code</span>
                        <span>{selectedAircraft.iata_code}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Performance</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>IATA Code</span>
                        <span>{selectedAircraft.iata_code}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Flight Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Active Flights</span>
                        <span>{getAircraftFlights(selectedAircraft.iata_code).filter(f => f.status === 'active').length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Delayed Flights</span>
                        <span>{getAircraftFlights(selectedAircraft.iata_code).filter(f => f.status === 'delayed').length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Total Flights</span>
                        <span>{getAircraftFlights(selectedAircraft.iata_code).length}</span>
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