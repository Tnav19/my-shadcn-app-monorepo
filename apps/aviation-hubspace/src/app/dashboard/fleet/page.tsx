'use client';

import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  Search,
  Settings,
  Wrench
} from 'lucide-react';
import { useState } from 'react';

interface Aircraft {
  id: string;
  registration: string;
  type: string;
  status: 'active' | 'maintenance' | 'grounded' | 'scheduled';
  lastMaintenance: string;
  nextMaintenance: string;
  totalFlightHours: number;
  location: string;
  assignedCrew?: string;
}

const AIRCRAFT: Aircraft[] = [
  {
    id: '1',
    registration: 'N12345',
    type: 'Boeing 737-800',
    status: 'active',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-05-15',
    totalFlightHours: 12500,
    location: 'JFK',
    assignedCrew: 'John Smith'
  },
  {
    id: '2',
    registration: 'N67890',
    type: 'Airbus A320',
    status: 'maintenance',
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-04-20',
    totalFlightHours: 8900,
    location: 'LAX',
    assignedCrew: 'Sarah Johnson'
  },
  {
    id: '3',
    registration: 'N24680',
    type: 'Boeing 777-300ER',
    status: 'scheduled',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-05-01',
    totalFlightHours: 15600,
    location: 'ORD',
    assignedCrew: 'Michael Brown'
  }
];

const STATUS_COLORS = {
  active: 'bg-green-500',
  maintenance: 'bg-yellow-500',
  grounded: 'bg-red-500',
  scheduled: 'bg-blue-500'
};

export default function FleetPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredAircraft = AIRCRAFT.filter(aircraft => {
    const matchesSearch = aircraft.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         aircraft.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || aircraft.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Fleet Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Aircraft
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Aircraft</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">-1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Maintenance</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grounded</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">All aircraft operational</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Aircraft List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
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
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {filteredAircraft.map((aircraft) => (
                <div
                  key={aircraft.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[aircraft.status]}`} />
                    <div>
                      <div className="font-medium">{aircraft.registration}</div>
                      <div className="text-sm text-muted-foreground">{aircraft.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{aircraft.location}</div>
                      <div className="text-xs text-muted-foreground">
                        {aircraft.assignedCrew || 'Unassigned'}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
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