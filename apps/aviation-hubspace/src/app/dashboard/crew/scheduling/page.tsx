'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Badge } from '@repo/ui/components/badge';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { 
  Calendar,
  Clock,
  Users,
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
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  XCircle,
  BarChart,
  Gauge,
  MapPin,
  Activity,
  Award,
  Target,
  BookMarked,
  BookCheck,
  Plane,
  PlaneTakeoff,
  PlaneLanding,
  User,
  UserCheck,
  UserX,
  Timer,
  CalendarDays,
  CalendarCheck,
  CalendarX
} from 'lucide-react';

interface Flight {
  id: string;
  number: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  aircraft: string;
  status: 'scheduled' | 'boarding' | 'departed' | 'arrived' | 'delayed' | 'cancelled';
  crew: {
    captain: string;
    firstOfficer: string;
    cabinCrew: string[];
  };
}

interface CrewMember {
  id: string;
  name: string;
  role: 'pilot' | 'flight-attendant' | 'instructor';
  status: 'active' | 'off-duty' | 'leave' | 'training';
  base: string;
  qualifications: string[];
  dutyTime: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  schedule: {
    date: string;
    flights: string[];
    dutyTime: number;
    restTime: number;
  }[];
  preferences: {
    preferredBase: string;
    preferredRoutes: string[];
    maxDutyTime: number;
    minRestTime: number;
  };
}

const FLIGHTS: Flight[] = [
  {
    id: '1',
    number: 'AA123',
    origin: 'New York (JFK)',
    destination: 'Los Angeles (LAX)',
    departure: '2024-03-15T10:00:00Z',
    arrival: '2024-03-15T13:00:00Z',
    aircraft: 'Boeing 737-800 (N12345)',
    status: 'scheduled',
    crew: {
      captain: 'John Smith',
      firstOfficer: 'Sarah Johnson',
      cabinCrew: ['Mike Wilson', 'Emily Brown', 'David Lee']
    }
  },
  {
    id: '2',
    number: 'AA456',
    origin: 'Los Angeles (LAX)',
    destination: 'Chicago (ORD)',
    departure: '2024-03-15T14:00:00Z',
    arrival: '2024-03-15T20:00:00Z',
    aircraft: 'Airbus A320 (N67890)',
    status: 'scheduled',
    crew: {
      captain: 'Robert Wilson',
      firstOfficer: 'Lisa Chen',
      cabinCrew: ['James Brown', 'Maria Garcia', 'Tom Lee']
    }
  },
  {
    id: '3',
    number: 'AA789',
    origin: 'Chicago (ORD)',
    destination: 'Miami (MIA)',
    departure: '2024-03-16T09:00:00Z',
    arrival: '2024-03-16T12:00:00Z',
    aircraft: 'Boeing 757-200 (N24680)',
    status: 'scheduled',
    crew: {
      captain: 'Michael Brown',
      firstOfficer: 'Jennifer Lee',
      cabinCrew: ['David Wilson', 'Sarah Chen', 'Robert Garcia']
    }
  }
];

const CREW_MEMBERS: CrewMember[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'pilot',
    status: 'active',
    base: 'New York (JFK)',
    qualifications: ['Boeing 737', 'Airbus A320'],
    dutyTime: {
      daily: 8,
      weekly: 35,
      monthly: 120
    },
    schedule: [
      {
        date: '2024-03-15',
        flights: ['AA123', 'AA456'],
        dutyTime: 10,
        restTime: 14
      }
    ],
    preferences: {
      preferredBase: 'New York (JFK)',
      preferredRoutes: ['JFK-LAX', 'JFK-ORD'],
      maxDutyTime: 10,
      minRestTime: 12
    }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'flight-attendant',
    status: 'active',
    base: 'Los Angeles (LAX)',
    qualifications: ['Boeing 737', 'Airbus A320', 'Boeing 757'],
    dutyTime: {
      daily: 8,
      weekly: 35,
      monthly: 120
    },
    schedule: [
      {
        date: '2024-03-15',
        flights: ['AA123'],
        dutyTime: 8,
        restTime: 16
      }
    ],
    preferences: {
      preferredBase: 'Los Angeles (LAX)',
      preferredRoutes: ['LAX-ORD', 'LAX-MIA'],
      maxDutyTime: 9,
      minRestTime: 12
    }
  }
];

const STATUS_COLORS = {
  'scheduled': 'bg-blue-500',
  'boarding': 'bg-yellow-500',
  'departed': 'bg-green-500',
  'arrived': 'bg-purple-500',
  'delayed': 'bg-orange-500',
  'cancelled': 'bg-red-500'
};

export default function SchedulingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredFlights = FLIGHTS.filter(flight => {
    const matchesSearch = 
      flight.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || flight.status === selectedStatus;
    const matchesDate = !selectedDate || flight.departure.startsWith(selectedDate);
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Crew Scheduling</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Assignment
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Flight Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
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
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[flight.status]}`} />
                          <div>
                            <div className="font-medium">{flight.number}</div>
                            <div className="text-sm text-muted-foreground">
                              {flight.origin} → {flight.destination}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={`${STATUS_COLORS[flight.status]}`}>
                            {flight.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Plane className="h-4 w-4" />
                          <span>{flight.aircraft}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {new Date(flight.departure).toLocaleString()} - {new Date(flight.arrival).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{flight.crew.captain}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{flight.crew.cabinCrew.length} Cabin Crew</span>
                        </div>
                      </div>
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
              <CardTitle>Flight Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedFlight ? (
                <div className="space-y-6">
                  {(() => {
                    const flight = FLIGHTS.find(f => f.id === selectedFlight);
                    if (!flight) return null;

                    return (
                      <>
                        <div>
                          <h3 className="font-medium mb-2">Flight Information</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Flight Number</span>
                              <span>{flight.number}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Route</span>
                              <span>{flight.origin} → {flight.destination}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Departure</span>
                              <span>{new Date(flight.departure).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Arrival</span>
                              <span>{new Date(flight.arrival).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Aircraft</span>
                              <span>{flight.aircraft}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Crew Assignment</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Captain</span>
                              <span>{flight.crew.captain}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>First Officer</span>
                              <span>{flight.crew.firstOfficer}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Cabin Crew</span>
                              <span>{flight.crew.cabinCrew.join(', ')}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Duty Time</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Duration</span>
                              <span>3 hours</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Report Time</span>
                              <span>{new Date(new Date(flight.departure).getTime() - 2 * 60 * 60 * 1000).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Release Time</span>
                              <span>{new Date(new Date(flight.arrival).getTime() + 30 * 60 * 1000).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[600px] text-muted-foreground">
                  Select a flight to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 