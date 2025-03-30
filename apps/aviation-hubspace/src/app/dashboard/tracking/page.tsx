'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Badge } from '@repo/ui/components/badge';
import {
  Search,
  Plane,
  MapPin,
  Clock,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

// Mock data for aircraft
const aircraft = [
  {
    id: 'AA123',
    type: 'Boeing 737-800',
    status: 'in-flight',
    altitude: '35,000 ft',
    speed: '450 knots',
    location: 'New York, USA',
    destination: 'London, UK',
    eta: '2h 30m',
    alerts: [],
  },
  {
    id: 'BA456',
    type: 'Airbus A320',
    status: 'maintenance',
    altitude: '0 ft',
    speed: '0 knots',
    location: 'London Heathrow',
    destination: 'Paris, France',
    eta: 'Delayed',
    alerts: ['Scheduled maintenance required'],
  },
  {
    id: 'AF789',
    type: 'Boeing 777-300ER',
    status: 'in-flight',
    altitude: '38,000 ft',
    speed: '480 knots',
    location: 'Paris, France',
    destination: 'Dubai, UAE',
    eta: '5h 45m',
    alerts: ['Minor turbulence reported'],
  },
];

export default function TrackingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAircraft, setSelectedAircraft] = useState(aircraft[0]);

  const filteredAircraft = aircraft.filter((a) =>
    a.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Aircraft Tracking</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search aircraft..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button>Refresh Data</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Aircraft List */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Aircraft Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {filteredAircraft.map((a) => (
                  <div
                    key={a.id}
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedAircraft.id === a.id
                        ? 'bg-gray-100 border-gray-300'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedAircraft(a)}
                  >
                    <div className="flex items-center space-x-4">
                      <Plane
                        className={`h-6 w-6 ${
                          a.status === 'in-flight'
                            ? 'text-blue-500'
                            : 'text-yellow-500'
                        }`}
                      />
                      <div>
                        <h3 className="font-medium">{a.id}</h3>
                        <p className="text-sm text-gray-500">{a.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={a.status === 'in-flight' ? 'default' : 'secondary'}
                      >
                        {a.status}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Map and Details */}
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Flight Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map Integration Coming Soon</p>
              </div>

              {/* Flight Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Current Location</p>
                      <p className="font-medium">{selectedAircraft.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Plane className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Altitude</p>
                      <p className="font-medium">{selectedAircraft.altitude}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Speed</p>
                      <p className="font-medium">{selectedAircraft.speed}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Destination</p>
                    <p className="font-medium">{selectedAircraft.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ETA</p>
                    <p className="font-medium">{selectedAircraft.eta}</p>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {selectedAircraft.alerts.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium">Active Alerts</h3>
                  <div className="space-y-2">
                    {selectedAircraft.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-2 p-3 rounded-lg bg-yellow-50 border border-yellow-200"
                      >
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <p className="text-sm text-yellow-800">{alert}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 