'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Badge } from '@repo/ui/components/badge';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { 
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  PlaneIcon,
  RefreshCw,
  Search,
  Filter,
  Plus,
  AlertCircle,
  FileText,
  ClipboardList,
  ClipboardCheck,
  ClipboardX,
  Settings,
  Clock,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart,
  Gauge,
  Fuel,
  Wrench,
  MapPin,
  Users,
  Package,
  Activity
} from 'lucide-react';

interface Aircraft {
  id: string;
  registration: string;
  type: string;
  status: 'active' | 'maintenance' | 'grounded' | 'scheduled' | 'delayed' | 'cancelled';
  location: string;
  nextFlight: string;
  lastMaintenance: string;
  nextMaintenance: string;
  totalFlightHours: number;
  cycles: number;
  fuelEfficiency: number;
  onTimePerformance: number;
  technicalReliability: number;
  crew: {
    captain: string;
    firstOfficer: string;
    cabinCrew: string[];
  };
  maintenance: {
    lastCheck: string;
    nextCheck: string;
    checkType: string;
    status: string;
    issues: string[];
  };
  performance: {
    fuelConsumption: number;
    averageSpeed: number;
    altitude: number;
    temperature: number;
    pressure: number;
  };
  schedule: {
    departure: string;
    arrival: string;
    origin: string;
    destination: string;
    flightNumber: string;
  };
}

const AIRCRAFT: Aircraft[] = [
  {
    id: '1',
    registration: 'N12345',
    type: 'Boeing 737-800',
    status: 'active',
    location: 'New York (JFK)',
    nextFlight: '2024-03-15T10:00:00Z',
    lastMaintenance: '2024-03-01T08:00:00Z',
    nextMaintenance: '2024-04-01T08:00:00Z',
    totalFlightHours: 12500,
    cycles: 4500,
    fuelEfficiency: 92.5,
    onTimePerformance: 95.2,
    technicalReliability: 98.8,
    crew: {
      captain: 'John Smith',
      firstOfficer: 'Sarah Johnson',
      cabinCrew: ['Mike Wilson', 'Emily Brown', 'David Lee']
    },
    maintenance: {
      lastCheck: '2024-03-01T08:00:00Z',
      nextCheck: '2024-04-01T08:00:00Z',
      checkType: 'A-Check',
      status: 'completed',
      issues: []
    },
    performance: {
      fuelConsumption: 2500,
      averageSpeed: 450,
      altitude: 35000,
      temperature: -45,
      pressure: 1013
    },
    schedule: {
      departure: '2024-03-15T10:00:00Z',
      arrival: '2024-03-15T13:00:00Z',
      origin: 'New York (JFK)',
      destination: 'Los Angeles (LAX)',
      flightNumber: 'AA123'
    }
  },
  {
    id: '2',
    registration: 'N67890',
    type: 'Airbus A320',
    status: 'maintenance',
    location: 'Los Angeles (LAX)',
    nextFlight: '2024-03-16T09:00:00Z',
    lastMaintenance: '2024-02-15T10:00:00Z',
    nextMaintenance: '2024-03-15T10:00:00Z',
    totalFlightHours: 9800,
    cycles: 3200,
    fuelEfficiency: 91.8,
    onTimePerformance: 94.5,
    technicalReliability: 97.9,
    crew: {
      captain: 'Robert Wilson',
      firstOfficer: 'Lisa Chen',
      cabinCrew: ['James Brown', 'Maria Garcia', 'Tom Lee']
    },
    maintenance: {
      lastCheck: '2024-02-15T10:00:00Z',
      nextCheck: '2024-03-15T10:00:00Z',
      checkType: 'B-Check',
      status: 'in-progress',
      issues: ['Engine oil filter replacement needed']
    },
    performance: {
      fuelConsumption: 2200,
      averageSpeed: 440,
      altitude: 34000,
      temperature: -40,
      pressure: 1015
    },
    schedule: {
      departure: '2024-03-16T09:00:00Z',
      arrival: '2024-03-16T12:00:00Z',
      origin: 'Los Angeles (LAX)',
      destination: 'Chicago (ORD)',
      flightNumber: 'AA456'
    }
  },
  {
    id: '3',
    registration: 'N24680',
    type: 'Boeing 757-200',
    status: 'grounded',
    location: 'Chicago (ORD)',
    nextFlight: '2024-03-17T11:00:00Z',
    lastMaintenance: '2024-02-01T09:00:00Z',
    nextMaintenance: '2024-03-01T09:00:00Z',
    totalFlightHours: 15000,
    cycles: 5200,
    fuelEfficiency: 89.5,
    onTimePerformance: 93.8,
    technicalReliability: 97.2,
    crew: {
      captain: 'Michael Brown',
      firstOfficer: 'Jennifer Lee',
      cabinCrew: ['David Wilson', 'Sarah Chen', 'Robert Garcia']
    },
    maintenance: {
      lastCheck: '2024-02-01T09:00:00Z',
      nextCheck: '2024-03-01T09:00:00Z',
      checkType: 'C-Check',
      status: 'delayed',
      issues: ['Hydraulic system malfunction', 'Landing gear inspection required']
    },
    performance: {
      fuelConsumption: 2800,
      averageSpeed: 460,
      altitude: 36000,
      temperature: -50,
      pressure: 1010
    },
    schedule: {
      departure: '2024-03-17T11:00:00Z',
      arrival: '2024-03-17T14:00:00Z',
      origin: 'Chicago (ORD)',
      destination: 'Miami (MIA)',
      flightNumber: 'AA789'
    }
  }
];

const STATUS_COLORS = {
  'active': 'bg-green-500',
  'maintenance': 'bg-yellow-500',
  'grounded': 'bg-red-500',
  'scheduled': 'bg-blue-500',
  'delayed': 'bg-orange-500',
  'cancelled': 'bg-gray-500'
};

export default function AircraftPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAircraft, setSelectedAircraft] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredAircraft = AIRCRAFT.filter(aircraft => {
    const matchesSearch = 
      aircraft.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aircraft.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aircraft.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || aircraft.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Aircraft Fleet</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Aircraft
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search aircraft..."
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Aircraft List</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredAircraft.map((aircraft) => (
                    <div
                      key={aircraft.id}
                      className={`p-4 border rounded-lg hover:bg-accent cursor-pointer ${
                        selectedAircraft === aircraft.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setSelectedAircraft(aircraft.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[aircraft.status]}`} />
                          <div>
                            <div className="font-medium">{aircraft.type}</div>
                            <div className="text-sm text-muted-foreground">
                              {aircraft.registration}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={`${STATUS_COLORS[aircraft.status]}`}>
                            {aircraft.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{aircraft.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Next Flight: {new Date(aircraft.nextFlight).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Gauge className="h-4 w-4" />
                          <span>{aircraft.totalFlightHours} Flight Hours</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4" />
                          <span>{aircraft.cycles} Cycles</span>
                        </div>
                      </div>
                      {aircraft.maintenance.issues.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {aircraft.maintenance.issues.map((issue, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 text-sm text-yellow-600"
                            >
                              <AlertTriangle className="h-4 w-4" />
                              <span>{issue}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aircraft Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAircraft ? (
                <div className="space-y-6">
                  {(() => {
                    const aircraft = AIRCRAFT.find(a => a.id === selectedAircraft);
                    if (!aircraft) return null;

                    return (
                      <>
                        <div>
                          <h3 className="font-medium mb-2">Flight Information</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Next Flight</span>
                              <span>{aircraft.schedule.flightNumber}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Departure</span>
                              <span>{new Date(aircraft.schedule.departure).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Arrival</span>
                              <span>{new Date(aircraft.schedule.arrival).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Route</span>
                              <span>{aircraft.schedule.origin} → {aircraft.schedule.destination}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Performance Metrics</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Fuel Efficiency</span>
                              <span>{aircraft.fuelEfficiency}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>On-Time Performance</span>
                              <span>{aircraft.onTimePerformance}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Technical Reliability</span>
                              <span>{aircraft.technicalReliability}%</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Current Performance</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Fuel Consumption</span>
                              <span>{aircraft.performance.fuelConsumption} kg/h</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Average Speed</span>
                              <span>{aircraft.performance.averageSpeed} knots</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Altitude</span>
                              <span>{aircraft.performance.altitude} ft</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Maintenance Status</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Last Check</span>
                              <span>{new Date(aircraft.maintenance.lastCheck).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Next Check</span>
                              <span>{new Date(aircraft.maintenance.nextCheck).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Check Type</span>
                              <span>{aircraft.maintenance.checkType}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Status</span>
                              <span>{aircraft.maintenance.status}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Crew Assignment</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Captain</span>
                              <span>{aircraft.crew.captain}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>First Officer</span>
                              <span>{aircraft.crew.firstOfficer}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Cabin Crew</span>
                              <span>{aircraft.crew.cabinCrew.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[600px] text-muted-foreground">
                  Select an aircraft to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 