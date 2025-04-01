'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  Search,
  Settings,
  Wrench
} from 'lucide-react';
import { useState } from 'react';

interface ServiceRecord {
  id: string;
  aircraftId: string;
  type: 'maintenance' | 'repair' | 'inspection' | 'modification';
  description: string;
  date: string;
  technician: string;
  status: 'completed' | 'in-progress' | 'scheduled' | 'cancelled';
  duration: string;
  partsReplaced: string[];
  notes: string;
  nextServiceDate: string;
}

const SERVICE_RECORDS: ServiceRecord[] = [
  {
    id: '1',
    aircraftId: 'N12345',
    type: 'maintenance',
    description: 'A-Check Maintenance',
    date: '2024-03-15',
    technician: 'John Smith',
    status: 'completed',
    duration: '48 hours',
    partsReplaced: ['Engine Filter', 'Hydraulic System'],
    notes: 'All systems checked and functioning normally',
    nextServiceDate: '2024-06-15'
  },
  {
    id: '2',
    aircraftId: 'N67890',
    type: 'repair',
    description: 'Landing Gear Repair',
    date: '2024-03-10',
    technician: 'Sarah Johnson',
    status: 'completed',
    duration: '24 hours',
    partsReplaced: ['Landing Gear Actuator', 'Hydraulic Lines'],
    notes: 'Repaired hydraulic leak in landing gear system',
    nextServiceDate: '2024-04-10'
  },
  {
    id: '3',
    aircraftId: 'N24680',
    type: 'inspection',
    description: 'B-Check Inspection',
    date: '2024-03-20',
    technician: 'Michael Brown',
    status: 'scheduled',
    duration: '72 hours',
    partsReplaced: [],
    notes: 'Scheduled comprehensive inspection',
    nextServiceDate: '2024-06-20'
  }
];

const STATUS_COLORS = {
  completed: 'bg-green-500',
  'in-progress': 'bg-blue-500',
  scheduled: 'bg-yellow-500',
  cancelled: 'bg-red-500'
};

const TYPE_COLORS = {
  maintenance: 'bg-blue-500',
  repair: 'bg-red-500',
  inspection: 'bg-yellow-500',
  modification: 'bg-purple-500'
};

export default function ServiceHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus] = useState<string | null>(null);
  const [selectedType] = useState<string | null>(null);

  const filteredRecords = SERVICE_RECORDS.filter(record => {
    const matchesSearch = record.aircraftId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || record.status === selectedStatus;
    const matchesType = !selectedType || record.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const completedServices = SERVICE_RECORDS.filter(record => record.status === 'completed');
  const upcomingServices = SERVICE_RECORDS.filter(record => record.status === 'scheduled');
  const inProgressServices = SERVICE_RECORDS.filter(record => record.status === 'in-progress');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Service History</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Service Record
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Services</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedServices.length}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Services</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingServices.length}</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Wrench className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressServices.length}</div>
            <p className="text-xs text-muted-foreground">Currently being serviced</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Duration</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48h</div>
            <p className="text-xs text-muted-foreground">Per service</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Service Records</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
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
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${TYPE_COLORS[record.type]}`} />
                    <div>
                      <div className="font-medium">{record.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {record.type} • {record.aircraftId}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{record.date}</div>
                      <div className="text-xs text-muted-foreground">
                        {record.technician}
                      </div>
                    </div>
                    <Badge variant="outline" className={STATUS_COLORS[record.status]}>
                      {record.status}
                    </Badge>
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