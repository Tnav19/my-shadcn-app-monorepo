'use client';

import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { Switch } from '@repo/ui/components/switch';
import {
  Clock,
  Eye,
  MapPin,
  Maximize,
  Plane,
  RefreshCw,
  Search,
  Wind,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { aviationApi, Flight } from '@/services/aviationApi';

// Dynamically import the RadarView component with no SSR
const RadarView = dynamic(() => import('@/components/RadarView'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading radar view...</div>
    </div>
  ),
});

const STATUS_COLORS = {
  'active': 'bg-green-500',
  'scheduled': 'bg-blue-500',
  'landed': 'bg-gray-500',
  'cancelled': 'bg-red-500',
  'incident': 'bg-yellow-500',
  'diverted': 'bg-orange-500'
};

export default function RadarPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [selectedLayers, setSelectedLayers] = useState<string[]>(['precipitation', 'clouds']);
  const [zoom, setZoom] = useState(1);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setStatusMessage('Fetching flight data...');
      const data = await aviationApi.getActiveFlights();
      setFlights(data);
      setError(null);
      setStatusMessage('Flight data updated successfully');
      // Clear status message after 3 seconds
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      setError('Failed to fetch flight data');
      setStatusMessage('Failed to fetch flight data');
      console.error('Error fetching flights:', err);
      // Clear status message after 3 seconds
      setTimeout(() => setStatusMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchFlights, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredFlights = flights.filter(flight =>
    (flight.flight_number || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (flight.departure?.airport || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (flight.arrival?.airport || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = () => {
    fetchFlights();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Radar</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <MapPin className="mr-2 h-4 w-4" />
            Add Flight
          </Button>
        </div>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-lg ${
          statusMessage.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Flight Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-[600px] border rounded-lg overflow-hidden bg-gray-900">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse text-gray-500">Loading radar view...</div>
                  </div>
                ) : error ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-red-500">{error}</div>
                  </div>
                ) : (
                  <RadarView 
                    flights={filteredFlights.map(flight => ({
                      id: flight.id,
                      position: {
                        lat: flight.live?.latitude || 0,
                        lng: flight.live?.longitude || 0,
                      },
                      heading: flight.live?.direction || 0,
                      altitude: flight.live?.altitude || 0,
                      speed: flight.live?.speed_horizontal || 0,
                      status: flight.status,
                    }))}
                    selectedFlightId={selectedFlight || undefined}
                    onFlightClick={setSelectedFlight}
                    zoom={zoom}
                  />
                )}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setZoom(z => Math.min(2, z + 0.1))}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weather Layers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['precipitation', 'clouds', 'wind', 'temperature'].map((layer) => (
                  <div key={layer} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={selectedLayers.includes(layer)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLayers([...selectedLayers, layer]);
                          } else {
                            setSelectedLayers(selectedLayers.filter(l => l !== layer));
                          }
                        }}
                      />
                      <Label className="capitalize">{layer}</Label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {filteredFlights.map((flight) => (
                      <div
                        key={flight.id}
                        className={`p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                          selectedFlight === flight.id ? 'bg-accent border-primary' : ''
                        }`}
                        onClick={() => setSelectedFlight(flight.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{flight.flight_number}</div>
                            <div className="text-sm text-muted-foreground">
                              {flight.departure.airport} → {flight.arrival.airport}
                            </div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[flight.status as keyof typeof STATUS_COLORS]}`} />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Plane className="h-4 w-4" />
                            <span>{flight.live?.altitude ? `${flight.live.altitude}ft` : 'N/A'}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Wind className="h-4 w-4" />
                            <span>{flight.live?.speed_horizontal ? `${flight.live.speed_horizontal}kts` : 'N/A'}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>ETA: {new Date(flight.arrival.scheduled).toLocaleTimeString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4" />
                            <span>{flight.live?.is_ground ? 'On Ground' : 'In Air'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 