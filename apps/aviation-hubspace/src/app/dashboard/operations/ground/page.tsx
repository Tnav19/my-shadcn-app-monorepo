'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  Building2,
  Filter,
  Luggage,
  Plane,
  Plus,
  Search,
  Settings,
  Wrench
} from 'lucide-react';
import { useState } from 'react';

interface Gate {
  id: string;
  number: string;
  terminal: string;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  currentFlight: string | null;
  nextFlight: string | null;
  groundCrew: string[];
  equipment: string[];
}

interface BaggageOperation {
  id: string;
  flightNumber: string;
  gate: string;
  status: 'loading' | 'unloading' | 'completed' | 'delayed';
  items: number;
  crew: string[];
  startTime: string;
  estimatedCompletion: string;
}

const GATES: Gate[] = [
  {
    id: '1',
    number: 'A12',
    terminal: 'Terminal 1',
    status: 'occupied',
    currentFlight: 'AH123',
    nextFlight: 'AH456',
    groundCrew: ['John Smith', 'Sarah Johnson'],
    equipment: ['Baggage Cart', 'Pushback Tractor']
  },
  {
    id: '2',
    number: 'B8',
    terminal: 'Terminal 2',
    status: 'maintenance',
    currentFlight: null,
    nextFlight: 'AH789',
    groundCrew: ['Michael Brown'],
    equipment: ['Maintenance Cart']
  },
  {
    id: '3',
    number: 'C15',
    terminal: 'Terminal 3',
    status: 'cleaning',
    currentFlight: null,
    nextFlight: 'AH101',
    groundCrew: ['Emily Davis'],
    equipment: ['Cleaning Cart']
  }
];

const BAGGAGE_OPERATIONS: BaggageOperation[] = [
  {
    id: '1',
    flightNumber: 'AH123',
    gate: 'A12',
    status: 'loading',
    items: 180,
    crew: ['John Smith', 'Sarah Johnson'],
    startTime: '2024-03-15T10:00:00',
    estimatedCompletion: '2024-03-15T10:30:00'
  },
  {
    id: '2',
    flightNumber: 'AH456',
    gate: 'B8',
    status: 'unloading',
    items: 165,
    crew: ['Michael Brown'],
    startTime: '2024-03-15T11:30:00',
    estimatedCompletion: '2024-03-15T12:00:00'
  },
  {
    id: '3',
    flightNumber: 'AH789',
    gate: 'C15',
    status: 'delayed',
    items: 190,
    crew: ['Emily Davis'],
    startTime: '2024-03-15T14:00:00',
    estimatedCompletion: '2024-03-15T14:45:00'
  }
];

const STATUS_COLORS = {
  available: 'bg-green-500',
  occupied: 'bg-blue-500',
  maintenance: 'bg-yellow-500',
  cleaning: 'bg-purple-500',
  loading: 'bg-blue-500',
  unloading: 'bg-orange-500',
  completed: 'bg-green-500',
  delayed: 'bg-red-500'
};

export default function GroundOperationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedTerminal, setSelectedTerminal] = useState<string | null>(null);

  const filteredGates = GATES.filter(gate => {
    const matchesSearch = gate.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gate.terminal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || gate.status === selectedStatus;
    const matchesTerminal = !selectedTerminal || gate.terminal === selectedTerminal;
    return matchesSearch && matchesStatus && matchesTerminal;
  });

  const availableGates = GATES.filter(gate => gate.status === 'available');
  const occupiedGates = GATES.filter(gate => gate.status === 'occupied');
  const maintenanceGates = GATES.filter(gate => gate.status === 'maintenance');
  const totalBaggage = BAGGAGE_OPERATIONS.reduce((sum, op) => sum + op.items, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ground Operations</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Operation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Gates</CardTitle>
            <Building2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableGates.length}</div>
            <p className="text-xs text-muted-foreground">Ready for use</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied Gates</CardTitle>
            <Plane className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupiedGates.length}</div>
            <p className="text-xs text-muted-foreground">Currently in use</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Gates</CardTitle>
            <Wrench className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceGates.length}</div>
            <p className="text-xs text-muted-foreground">Under maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Baggage</CardTitle>
            <Luggage className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBaggage}</div>
            <p className="text-xs text-muted-foreground">Items being handled</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Gate Status</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search gates..."
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
                {filteredGates.map((gate) => (
                  <div
                    key={gate.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[gate.status]}`} />
                      <div>
                        <div className="font-medium">Gate {gate.number}</div>
                        <div className="text-sm text-muted-foreground">
                          {gate.terminal}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {gate.currentFlight || 'No current flight'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Next: {gate.nextFlight || 'None'}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={STATUS_COLORS[gate.status]}>
                          {gate.status}
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

        <Card>
          <CardHeader>
            <CardTitle>Baggage Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {BAGGAGE_OPERATIONS.map((operation) => (
                  <div
                    key={operation.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[operation.status]}`} />
                      <div>
                        <div className="font-medium">Flight {operation.flightNumber}</div>
                        <div className="text-sm text-muted-foreground">
                          Gate {operation.gate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {operation.items} items
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(operation.estimatedCompletion).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={STATUS_COLORS[operation.status]}>
                          {operation.status}
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
    </div>
  );
} 