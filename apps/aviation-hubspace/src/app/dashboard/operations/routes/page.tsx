'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Badge } from '@repo/ui/components/badge';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { 
  Map, 
  Search, 
  Plus, 
  Filter, 
  Plane,
  Clock,
  MapPin,
  Cloud,
  Wind,
  Settings,
  AlertCircle,
  CheckCircle2,
  CalendarDays,
  Compass
} from 'lucide-react';

interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  aircraftType: string;
  status: 'active' | 'planned' | 'maintenance' | 'weather-delayed';
  weather: {
    conditions: string;
    windSpeed: number;
    visibility: number;
  };
  fuelEfficiency: number;
  waypoints: string[];
  restrictions: string[];
}

const ROUTES: Route[] = [
  {
    id: '1',
    name: 'JFK-LAX Transcontinental',
    origin: 'JFK',
    destination: 'LAX',
    distance: 2789,
    duration: '5h 30m',
    aircraftType: 'Boeing 737-800',
    status: 'active',
    weather: {
      conditions: 'Clear',
      windSpeed: 15,
      visibility: 10
    },
    fuelEfficiency: 0.85,
    waypoints: ['JFK', 'CHI', 'DEN', 'LAX'],
    restrictions: ['Altitude 35000ft']
  },
  {
    id: '2',
    name: 'LAX-ORD Midwest',
    origin: 'LAX',
    destination: 'ORD',
    distance: 1744,
    duration: '3h 45m',
    aircraftType: 'Airbus A320',
    status: 'weather-delayed',
    weather: {
      conditions: 'Storm',
      windSpeed: 35,
      visibility: 3
    },
    fuelEfficiency: 0.82,
    waypoints: ['LAX', 'DEN', 'ORD'],
    restrictions: ['Altitude 33000ft']
  },
  {
    id: '3',
    name: 'ORD-MIA Southeast',
    origin: 'ORD',
    destination: 'MIA',
    distance: 1198,
    duration: '2h 45m',
    aircraftType: 'Boeing 737-700',
    status: 'planned',
    weather: {
      conditions: 'Partly Cloudy',
      windSpeed: 20,
      visibility: 8
    },
    fuelEfficiency: 0.88,
    waypoints: ['ORD', 'ATL', 'MIA'],
    restrictions: ['Altitude 31000ft']
  }
];

const STATUS_COLORS = {
  active: 'bg-green-500',
  planned: 'bg-blue-500',
  maintenance: 'bg-yellow-500',
  'weather-delayed': 'bg-orange-500'
};

export default function RoutePlanningPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedAircraft, setSelectedAircraft] = useState<string | null>(null);

  const filteredRoutes = ROUTES.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         route.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || route.status === selectedStatus;
    const matchesAircraft = !selectedAircraft || route.aircraftType === selectedAircraft;
    return matchesSearch && matchesStatus && matchesAircraft;
  });

  const activeRoutes = ROUTES.filter(route => route.status === 'active');
  const weatherDelayedRoutes = ROUTES.filter(route => route.status === 'weather-delayed');
  const plannedRoutes = ROUTES.filter(route => route.status === 'planned');
  const totalDistance = ROUTES.reduce((sum, route) => sum + route.distance, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Route Planning</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Route
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
            <Plane className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRoutes.length}</div>
            <p className="text-xs text-muted-foreground">Currently in use</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather Delayed</CardTitle>
            <Cloud className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weatherDelayedRoutes.length}</div>
            <p className="text-xs text-muted-foreground">Requires rerouting</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planned Routes</CardTitle>
            <Map className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plannedRoutes.length}</div>
            <p className="text-xs text-muted-foreground">Future schedules</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
            <Compass className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDistance}nm</div>
            <p className="text-xs text-muted-foreground">All routes combined</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Route Details</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search routes..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {filteredRoutes.map((route) => (
                <div
                  key={route.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[route.status]}`} />
                    <div>
                      <div className="font-medium">{route.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {route.origin} → {route.destination}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {route.distance}nm • {route.duration}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {route.aircraftType}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={STATUS_COLORS[route.status]}>
                        {route.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
} 