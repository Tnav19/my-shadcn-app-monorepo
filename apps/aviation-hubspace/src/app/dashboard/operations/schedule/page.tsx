'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  AlertCircle,
  Calendar,
  Filter,
  Plane,
  Plus,
  Search,
  Settings,
  Users
} from 'lucide-react';
import { useState } from 'react';

interface Flight {
  id: string;
  flightNumber: string;
  aircraftId: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  status: 'scheduled' | 'boarding' | 'in-flight' | 'landed' | 'delayed' | 'cancelled';
  crew: string[];
  passengers: number;
  gate: string;
  terminal: string;
}

const FLIGHTS: Flight[] = [
  {
    id: '1',
    flightNumber: 'AH123',
    aircraftId: 'N12345',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '2024-03-15T10:00:00',
    arrivalTime: '2024-03-15T13:00:00',
    status: 'scheduled',
    crew: ['John Smith', 'Sarah Johnson'],
    passengers: 180,
    gate: 'A12',
    terminal: 'Terminal 1'
  },
  {
    id: '2',
    flightNumber: 'AH456',
    aircraftId: 'N67890',
    origin: 'LAX',
    destination: 'ORD',
    departureTime: '2024-03-15T11:30:00',
    arrivalTime: '2024-03-15T15:30:00',
    status: 'boarding',
    crew: ['Michael Brown', 'Emily Davis'],
    passengers: 165,
    gate: 'B8',
    terminal: 'Terminal 2'
  },
  {
    id: '3',
    flightNumber: 'AH789',
    aircraftId: 'N24680',
    origin: 'ORD',
    destination: 'MIA',
    departureTime: '2024-03-15T14:00:00',
    arrivalTime: '2024-03-15T17:00:00',
    status: 'delayed',
    crew: ['David Wilson', 'Lisa Anderson'],
    passengers: 190,
    gate: 'C15',
    terminal: 'Terminal 3'
  }
];

const STATUS_COLORS = {
  scheduled: 'bg-blue-500',
  boarding: 'bg-yellow-500',
  'in-flight': 'bg-green-500',
  landed: 'bg-gray-500',
  delayed: 'bg-orange-500',
  cancelled: 'bg-red-500'
};

export default function FlightSchedulePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredFlights = FLIGHTS.filter(flight => {
    const matchesSearch = flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         flight.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         flight.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || flight.status === selectedStatus;
    const matchesDate = !selectedDate || flight.departureTime.startsWith(selectedDate);
    return matchesSearch && matchesStatus && matchesDate;
  });

  const scheduledFlights = FLIGHTS.filter(flight => flight.status === 'scheduled');
  const inProgressFlights = FLIGHTS.filter(flight => flight.status === 'in-flight');
  const delayedFlights = FLIGHTS.filter(flight => flight.status === 'delayed');
  const totalPassengers = FLIGHTS.reduce((sum, flight) => sum + flight.passengers, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Flight Schedule</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Flight
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Flights</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledFlights.length}</div>
            <p className="text-xs text-muted-foreground">Today's schedule</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Flight</CardTitle>
            <Plane className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressFlights.length}</div>
            <p className="text-xs text-muted-foreground">Currently airborne</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed Flights</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{delayedFlights.length}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPassengers}</div>
            <p className="text-xs text-muted-foreground">Today's total</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Flight Schedule</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search flights..."
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
              {filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[flight.status]}`} />
                    <div>
                      <div className="font-medium">{flight.flightNumber}</div>
                      <div className="text-sm text-muted-foreground">
                        {flight.origin} → {flight.destination}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {new Date(flight.departureTime).toLocaleTimeString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Gate {flight.gate}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={STATUS_COLORS[flight.status]}>
                        {flight.status}
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