'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  Clock,
  Filter,
  GraduationCap,
  Search,
  Settings,
  Shield,
  UserPlus,
  Users
} from 'lucide-react';
import { useState } from 'react';

interface CrewMember {
  id: string;
  name: string;
  role: 'pilot' | 'flight-attendant' | 'ground-crew' | 'maintenance';
  status: 'active' | 'off-duty' | 'training' | 'on-leave';
  certifications: {
    name: string;
    expiryDate: string;
    status: 'valid' | 'expired' | 'pending';
  }[];
  dutyTime: {
    current: number;
    weekly: number;
    monthly: number;
    max: number;
  };
  nextFlight: {
    number: string;
    date: string;
    route: string;
  } | null;
  base: string;
}

const CREW_MEMBERS: CrewMember[] = [
  {
    id: '1',
    name: 'Captain John Smith',
    role: 'pilot',
    status: 'active',
    certifications: [
      {
        name: 'Airline Transport Pilot License',
        expiryDate: '2025-03-15',
        status: 'valid'
      },
      {
        name: 'Boeing 737 Type Rating',
        expiryDate: '2024-06-20',
        status: 'valid'
      }
    ],
    dutyTime: {
      current: 4,
      weekly: 35,
      monthly: 85,
      max: 100
    },
    nextFlight: {
      number: 'AH123',
      date: '2024-03-16',
      route: 'JFK-LAX'
    },
    base: 'New York'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'flight-attendant',
    status: 'off-duty',
    certifications: [
      {
        name: 'Cabin Crew License',
        expiryDate: '2024-12-31',
        status: 'valid'
      },
      {
        name: 'Emergency Procedures',
        expiryDate: '2024-09-15',
        status: 'valid'
      }
    ],
    dutyTime: {
      current: 0,
      weekly: 28,
      monthly: 75,
      max: 100
    },
    nextFlight: {
      number: 'AH456',
      date: '2024-03-17',
      route: 'LAX-ORD'
    },
    base: 'Los Angeles'
  },
  {
    id: '3',
    name: 'Michael Brown',
    role: 'ground-crew',
    status: 'training',
    certifications: [
      {
        name: 'Ground Operations License',
        expiryDate: '2024-08-30',
        status: 'valid'
      },
      {
        name: 'Equipment Operation',
        expiryDate: '2024-07-15',
        status: 'pending'
      }
    ],
    dutyTime: {
      current: 2,
      weekly: 20,
      monthly: 65,
      max: 100
    },
    nextFlight: null,
    base: 'Chicago'
  }
];

const STATUS_COLORS = {
  active: 'bg-green-500',
  'off-duty': 'bg-gray-500',
  training: 'bg-yellow-500',
  'on-leave': 'bg-blue-500'
};

const ROLE_COLORS = {
  pilot: 'bg-blue-500',
  'flight-attendant': 'bg-purple-500',
  'ground-crew': 'bg-orange-500',
  maintenance: 'bg-red-500'
};

export default function CrewManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredCrew = CREW_MEMBERS.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.base.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !selectedRole || member.role === selectedRole;
    const matchesStatus = !selectedStatus || member.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeCrew = CREW_MEMBERS.filter(member => member.status === 'active');
  const offDutyCrew = CREW_MEMBERS.filter(member => member.status === 'off-duty');
  const trainingCrew = CREW_MEMBERS.filter(member => member.status === 'training');
  const totalCertifications = CREW_MEMBERS.reduce((sum, member) => sum + member.certifications.length, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Crew Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Crew Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crew</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCrew.length}</div>
            <p className="text-xs text-muted-foreground">Currently on duty</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Off Duty</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offDutyCrew.length}</div>
            <p className="text-xs text-muted-foreground">Rest period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Training</CardTitle>
            <GraduationCap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingCrew.length}</div>
            <p className="text-xs text-muted-foreground">Under training</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certifications</CardTitle>
            <Shield className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCertifications}</div>
            <p className="text-xs text-muted-foreground">Active licenses</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Crew Details</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crew..."
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
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredCrew.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[member.status]}`} />
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.base} • {member.role.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        Duty Time: {member.dutyTime.current}h / {member.dutyTime.max}h
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {member.nextFlight ? `Next: ${member.nextFlight.number}` : 'No upcoming flights'}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={STATUS_COLORS[member.status]}>
                        {member.status}
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