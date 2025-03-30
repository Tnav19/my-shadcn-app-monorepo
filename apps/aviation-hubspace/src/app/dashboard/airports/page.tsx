'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Badge } from '@repo/ui/components/badge';
import {
  Search,
  Building2,
  AlertTriangle,
  Plus,
  Filter,
  ChevronRight,
  CheckCircle,
  Clock,
  Plane,
  Users,
} from 'lucide-react';

// Mock data for airports
const airports = [
  {
    id: 'JFK',
    name: 'John F. Kennedy International Airport',
    location: 'New York, USA',
    status: 'active',
    gates: 12,
    activeGates: 8,
    flights: 45,
    passengers: 25000,
    alerts: ['Gate A3 maintenance required'],
  },
  {
    id: 'LHR',
    name: 'London Heathrow Airport',
    location: 'London, UK',
    status: 'active',
    gates: 15,
    activeGates: 12,
    flights: 52,
    passengers: 28000,
    alerts: [],
  },
  {
    id: 'DXB',
    name: 'Dubai International Airport',
    location: 'Dubai, UAE',
    status: 'maintenance',
    gates: 10,
    activeGates: 7,
    flights: 38,
    passengers: 22000,
    alerts: ['Terminal 2 renovation in progress'],
  },
];

export default function AirportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAirport, setSelectedAirport] = useState(airports[0]);

  const filteredAirports = airports.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Airports</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search airports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Airport
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Airports List */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Airports</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {filteredAirports.map((airport) => (
                  <div
                    key={airport.id}
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedAirport.id === airport.id
                        ? 'bg-gray-100 border-gray-300'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedAirport(airport)}
                  >
                    <div className="flex items-center space-x-4">
                      <Building2
                        className={`h-6 w-6 ${
                          airport.status === 'active'
                            ? 'text-green-500'
                            : 'text-yellow-500'
                        }`}
                      />
                      <div>
                        <h3 className="font-medium">{airport.name}</h3>
                        <p className="text-sm text-gray-500">{airport.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          airport.status === 'active'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {airport.status}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Airport Details */}
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Airport Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Airport Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{selectedAirport.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Gates</p>
                    <p className="font-medium">{selectedAirport.gates}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Gates</p>
                    <p className="font-medium">{selectedAirport.activeGates}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Active Flights</p>
                    <div className="flex items-center space-x-2">
                      <Plane className="h-4 w-4 text-blue-500" />
                      <p className="font-medium">{selectedAirport.flights}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Daily Passengers</p>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-green-500" />
                      <p className="font-medium">{selectedAirport.passengers}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge
                      variant={
                        selectedAirport.status === 'active'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {selectedAirport.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Status Information */}
              <div className="flex items-center space-x-2">
                {selectedAirport.status === 'active' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-yellow-500" />
                )}
                <span className="capitalize font-medium">{selectedAirport.status}</span>
              </div>

              {/* Alerts */}
              {selectedAirport.alerts.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium">Active Alerts</h3>
                  <div className="space-y-2">
                    {selectedAirport.alerts.map((alert, index) => (
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

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button>View Gates</Button>
                <Button variant="outline">Ground Operations</Button>
                <Button variant="outline">View Analytics</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 