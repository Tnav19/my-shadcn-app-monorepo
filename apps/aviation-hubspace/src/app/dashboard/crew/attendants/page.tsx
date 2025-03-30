'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Badge } from '@repo/ui/components/badge';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { 
  User,
  Search,
  Filter,
  Plus,
  RefreshCw,
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
  UserCheck,
  UserX,
  Timer,
  CalendarDays,
  CalendarCheck,
  CalendarX
} from 'lucide-react';

interface FlightAttendant {
  id: string;
  name: string;
  rank: 'Lead Flight Attendant' | 'Senior Flight Attendant' | 'Flight Attendant';
  status: 'active' | 'training' | 'leave' | 'inactive';
  base: string;
  qualifications: {
    type: string;
    aircraft: string[];
    expiryDate: string;
    status: 'valid' | 'expired' | 'pending';
  }[];
  serviceTraining: {
    type: string;
    date: string;
    status: 'completed' | 'scheduled' | 'failed';
    instructor: string;
    notes: string;
  }[];
  certifications: {
    type: string;
    number: string;
    issueDate: string;
    expiryDate: string;
    status: 'valid' | 'expired' | 'pending';
  }[];
  languages: {
    language: string;
    proficiency: 'native' | 'fluent' | 'intermediate' | 'basic';
  }[];
  dutyHours: {
    total: number;
    last90Days: number;
    last30Days: number;
    byAircraft: {
      [key: string]: number;
    };
  };
  schedule: {
    date: string;
    flights: string[];
    dutyTime: number;
    restTime: number;
  }[];
  performance: {
    serviceRating: number;
    punctuality: number;
    customerFeedback: {
      positive: number;
      negative: number;
      neutral: number;
    };
  };
}

const FLIGHT_ATTENDANTS: FlightAttendant[] = [
  {
    id: '1',
    name: 'Emily Brown',
    rank: 'Lead Flight Attendant',
    status: 'active',
    base: 'New York (JFK)',
    qualifications: [
      {
        type: 'Safety Training',
        aircraft: ['Boeing 737', 'Airbus A320'],
        expiryDate: '2025-03-15',
        status: 'valid'
      },
      {
        type: 'Emergency Procedures',
        aircraft: ['All Fleet'],
        expiryDate: '2024-06-30',
        status: 'valid'
      }
    ],
    serviceTraining: [
      {
        type: 'Premium Service',
        date: '2024-02-15',
        status: 'completed',
        instructor: 'Lisa Chen',
        notes: 'Excellent performance in premium cabin service'
      },
      {
        type: 'Cultural Awareness',
        date: '2024-04-01',
        status: 'scheduled',
        instructor: 'Mike Wilson',
        notes: 'Annual review'
      }
    ],
    certifications: [
      {
        type: 'Flight Attendant License',
        number: 'FAL123456',
        issueDate: '2015-03-15',
        expiryDate: '2025-03-15',
        status: 'valid'
      },
      {
        type: 'First Aid',
        number: 'FA789012',
        issueDate: '2023-12-01',
        expiryDate: '2024-12-01',
        status: 'valid'
      }
    ],
    languages: [
      { language: 'English', proficiency: 'native' },
      { language: 'Spanish', proficiency: 'fluent' },
      { language: 'French', proficiency: 'intermediate' }
    ],
    dutyHours: {
      total: 4500,
      last90Days: 180,
      last30Days: 65,
      byAircraft: {
        'Boeing 737': 2500,
        'Airbus A320': 1500,
        'Boeing 757': 500
      }
    },
    schedule: [
      {
        date: '2024-03-15',
        flights: ['AA123', 'AA456'],
        dutyTime: 10,
        restTime: 14
      }
    ],
    performance: {
      serviceRating: 4.8,
      punctuality: 98,
      customerFeedback: {
        positive: 95,
        negative: 2,
        neutral: 3
      }
    }
  },
  {
    id: '2',
    name: 'David Lee',
    rank: 'Senior Flight Attendant',
    status: 'active',
    base: 'Los Angeles (LAX)',
    qualifications: [
      {
        type: 'Safety Training',
        aircraft: ['Boeing 737', 'Airbus A320'],
        expiryDate: '2024-12-31',
        status: 'valid'
      },
      {
        type: 'Emergency Procedures',
        aircraft: ['All Fleet'],
        expiryDate: '2024-08-15',
        status: 'valid'
      }
    ],
    serviceTraining: [
      {
        type: 'Customer Service Excellence',
        date: '2024-01-15',
        status: 'completed',
        instructor: 'Sarah Johnson',
        notes: 'Outstanding performance in customer service'
      },
      {
        type: 'Conflict Resolution',
        date: '2024-05-15',
        status: 'scheduled',
        instructor: 'Robert Wilson',
        notes: 'Annual review'
      }
    ],
    certifications: [
      {
        type: 'Flight Attendant License',
        number: 'FAL789012',
        issueDate: '2018-06-15',
        expiryDate: '2028-06-15',
        status: 'valid'
      },
      {
        type: 'First Aid',
        number: 'FA345678',
        issueDate: '2023-11-15',
        expiryDate: '2024-11-15',
        status: 'valid'
      }
    ],
    languages: [
      { language: 'English', proficiency: 'native' },
      { language: 'Japanese', proficiency: 'fluent' },
      { language: 'Korean', proficiency: 'intermediate' }
    ],
    dutyHours: {
      total: 3500,
      last90Days: 150,
      last30Days: 45,
      byAircraft: {
        'Boeing 737': 2000,
        'Airbus A320': 1500
      }
    },
    schedule: [
      {
        date: '2024-03-15',
        flights: ['AA123'],
        dutyTime: 8,
        restTime: 16
      }
    ],
    performance: {
      serviceRating: 4.9,
      punctuality: 99,
      customerFeedback: {
        positive: 98,
        negative: 1,
        neutral: 1
      }
    }
  }
];

const STATUS_COLORS = {
  'active': 'bg-green-500',
  'training': 'bg-yellow-500',
  'leave': 'bg-blue-500',
  'inactive': 'bg-red-500'
};

const CERTIFICATION_STATUS_COLORS = {
  'valid': 'bg-green-500',
  'expired': 'bg-red-500',
  'pending': 'bg-yellow-500',
  'completed': 'bg-green-500',
  'scheduled': 'bg-yellow-500',
  'failed': 'bg-red-500'
};

export default function FlightAttendantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAttendant, setSelectedAttendant] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedRank, setSelectedRank] = useState<string | null>(null);

  const filteredAttendants = FLIGHT_ATTENDANTS.filter(attendant => {
    const matchesSearch = 
      attendant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendant.base.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || attendant.status === selectedStatus;
    const matchesRank = !selectedRank || attendant.rank === selectedRank;
    return matchesSearch && matchesStatus && matchesRank;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Flight Attendants</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Attendant
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search attendants..."
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
              <CardTitle>Attendant List</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredAttendants.map((attendant) => (
                    <div
                      key={attendant.id}
                      className={`p-4 border rounded-lg hover:bg-accent cursor-pointer ${
                        selectedAttendant === attendant.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setSelectedAttendant(attendant.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[attendant.status]}`} />
                          <div>
                            <div className="font-medium">{attendant.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {attendant.rank} • {attendant.base}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{attendant.rank}</Badge>
                          <Badge variant="outline" className={`${STATUS_COLORS[attendant.status]}`}>
                            {attendant.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Plane className="h-4 w-4" />
                          <span>{attendant.qualifications[0].aircraft.join(', ')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Timer className="h-4 w-4" />
                          <span>{attendant.dutyHours.total} Total Hours</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CalendarCheck className="h-4 w-4" />
                          <span>{attendant.dutyHours.last90Days} Hours (90 Days)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4" />
                          <span>{attendant.performance.serviceRating.toFixed(1)} Service Rating</span>
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
              <CardTitle>Attendant Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAttendant ? (
                <div className="space-y-6">
                  {(() => {
                    const attendant = FLIGHT_ATTENDANTS.find(a => a.id === selectedAttendant);
                    if (!attendant) return null;

                    return (
                      <>
                        <div>
                          <h3 className="font-medium mb-2">Qualifications</h3>
                          <div className="space-y-2">
                            {attendant.qualifications.map((qual, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <span>{qual.type}</span>
                                <div className="flex items-center space-x-2">
                                  <span>{qual.aircraft.join(', ')}</span>
                                  <Badge variant="outline" className={`${CERTIFICATION_STATUS_COLORS[qual.status]}`}>
                                    {qual.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Service Training</h3>
                          <div className="space-y-2">
                            {attendant.serviceTraining.map((train, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <div>
                                  <div>{train.type}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {new Date(train.date).toLocaleDateString()} • {train.instructor}
                                  </div>
                                </div>
                                <Badge variant="outline" className={`${CERTIFICATION_STATUS_COLORS[train.status]}`}>
                                  {train.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Languages</h3>
                          <div className="space-y-2">
                            {attendant.languages.map((lang, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <span>{lang.language}</span>
                                <Badge variant="outline">{lang.proficiency}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Performance</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Service Rating</span>
                              <span>{attendant.performance.serviceRating.toFixed(1)}/5.0</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Punctuality</span>
                              <span>{attendant.performance.punctuality}%</span>
                            </div>
                            <div className="mt-2">
                              <div className="text-sm font-medium mb-1">Customer Feedback</div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Positive</span>
                                <span>{attendant.performance.customerFeedback.positive}%</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Negative</span>
                                <span>{attendant.performance.customerFeedback.negative}%</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Neutral</span>
                                <span>{attendant.performance.customerFeedback.neutral}%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Duty Hours</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Total Hours</span>
                              <span>{attendant.dutyHours.total}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Last 90 Days</span>
                              <span>{attendant.dutyHours.last90Days}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Last 30 Days</span>
                              <span>{attendant.dutyHours.last30Days}</span>
                            </div>
                            <div className="mt-2">
                              <div className="text-sm font-medium mb-1">By Aircraft</div>
                              {Object.entries(attendant.dutyHours.byAircraft).map(([aircraft, hours]) => (
                                <div key={aircraft} className="flex items-center justify-between text-sm">
                                  <span>{aircraft}</span>
                                  <span>{hours}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[600px] text-muted-foreground">
                  Select an attendant to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 