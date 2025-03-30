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
import { useState } from 'react';

interface Flight {
  id: string;
  flightNumber: string;
  aircraft: string;
  altitude: number;
  speed: number;
  heading: number;
  position: {
    lat: number;
    lng: number;
  };
  status: 'on-time' | 'delayed' | 'diverted' | 'cancelled';
  origin: string;
  destination: string;
  eta: string;
  weather: {
    condition: 'clear' | 'partly-cloudy' | 'cloudy' | 'rain' | 'storm' | 'snow';
    visibility: number;
    windSpeed: number;
    windDirection: string;
  };
}

interface WeatherLayer {
  id: string;
  type: 'precipitation' | 'clouds' | 'wind' | 'temperature';
  intensity: number;
  coverage: number;
  timestamp: string;
}

const FLIGHTS: Flight[] = [
  {
    id: '1',
    flightNumber: 'AA123',
    aircraft: 'Boeing 737-800',
    altitude: 35000,
    speed: 450,
    heading: 270,
    position: {
      lat: 40.7128,
      lng: -74.0060
    },
    status: 'on-time',
    origin: 'JFK',
    destination: 'LAX',
    eta: '2024-03-15T15:30:00Z',
    weather: {
      condition: 'clear',
      visibility: 10,
      windSpeed: 12,
      windDirection: 'NE'
    }
  },
  {
    id: '2',
    flightNumber: 'UA456',
    aircraft: 'Airbus A320',
    altitude: 28000,
    speed: 420,
    heading: 180,
    position: {
      lat: 34.0522,
      lng: -118.2437
    },
    status: 'delayed',
    origin: 'LAX',
    destination: 'ORD',
    eta: '2024-03-15T16:45:00Z',
    weather: {
      condition: 'partly-cloudy',
      visibility: 8,
      windSpeed: 15,
      windDirection: 'SW'
    }
  },
  {
    id: '3',
    flightNumber: 'DL789',
    aircraft: 'Boeing 757-200',
    altitude: 32000,
    speed: 430,
    heading: 90,
    position: {
      lat: 41.8781,
      lng: -87.6298
    },
    status: 'diverted',
    origin: 'ORD',
    destination: 'MIA',
    eta: '2024-03-15T17:15:00Z',
    weather: {
      condition: 'storm',
      visibility: 3,
      windSpeed: 25,
      windDirection: 'NW'
    }
  }
];

const WEATHER_LAYERS: WeatherLayer[] = [
  {
    id: '1',
    type: 'precipitation',
    intensity: 0.7,
    coverage: 0.6,
    timestamp: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    type: 'clouds',
    intensity: 0.8,
    coverage: 0.7,
    timestamp: '2024-03-15T10:00:00Z'
  },
  {
    id: '3',
    type: 'wind',
    intensity: 0.5,
    coverage: 1,
    timestamp: '2024-03-15T10:00:00Z'
  }
];

const STATUS_COLORS = {
  'on-time': 'bg-green-500',
  'delayed': 'bg-yellow-500',
  'diverted': 'bg-orange-500',
  'cancelled': 'bg-red-500'
};

export default function RadarPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [selectedLayers, setSelectedLayers] = useState<string[]>(['precipitation', 'clouds']);
  const [zoom, setZoom] = useState(1);

  const filteredFlights = FLIGHTS.filter(flight =>
    flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Radar</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <MapPin className="mr-2 h-4 w-4" />
            Add Flight
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Flight Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-[600px] border rounded-lg bg-muted">
                {/* Placeholder for actual radar visualization */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Radar Visualization
                </div>
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
                {WEATHER_LAYERS.map((layer) => (
                  <div key={layer.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={selectedLayers.includes(layer.type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLayers([...selectedLayers, layer.type]);
                          } else {
                            setSelectedLayers(selectedLayers.filter(l => l !== layer.type));
                          }
                        }}
                      />
                      <Label className="capitalize">{layer.type}</Label>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round(layer.coverage * 100)}% coverage
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
                        className={`p-4 border rounded-lg hover:bg-accent cursor-pointer ${
                          selectedFlight === flight.id ? 'bg-accent' : ''
                        }`}
                        onClick={() => setSelectedFlight(flight.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{flight.flightNumber}</div>
                            <div className="text-sm text-muted-foreground">
                              {flight.origin} → {flight.destination}
                            </div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[flight.status]}`} />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Plane className="h-4 w-4" />
                            <span>{flight.altitude}ft</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Wind className="h-4 w-4" />
                            <span>{flight.speed}kts</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>ETA: {new Date(flight.eta).toLocaleTimeString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4" />
                            <span>{flight.weather.visibility}mi</span>
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