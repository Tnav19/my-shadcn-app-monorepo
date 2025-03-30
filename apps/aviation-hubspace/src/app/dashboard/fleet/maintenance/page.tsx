'use client';

import { Badge } from '@repo/ui/components/badge';
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

interface MaintenanceTask {
  id: string;
  aircraftId: string;
  type: 'routine' | 'scheduled' | 'emergency' | 'inspection';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  estimatedDuration: string;
  partsRequired: string[];
}

const MAINTENANCE_TASKS: MaintenanceTask[] = [
  {
    id: '1',
    aircraftId: 'N12345',
    type: 'routine',
    status: 'in-progress',
    description: 'A-Check Maintenance',
    assignedTo: 'John Smith',
    dueDate: '2024-03-15',
    priority: 'high',
    estimatedDuration: '48 hours',
    partsRequired: ['Engine Filter', 'Hydraulic System']
  },
  {
    id: '2',
    aircraftId: 'N67890',
    type: 'scheduled',
    status: 'pending',
    description: 'B-Check Inspection',
    assignedTo: 'Sarah Johnson',
    dueDate: '2024-03-20',
    priority: 'medium',
    estimatedDuration: '72 hours',
    partsRequired: ['Landing Gear', 'APU']
  },
  {
    id: '3',
    aircraftId: 'N24680',
    type: 'emergency',
    status: 'pending',
    description: 'Engine Oil Leak',
    assignedTo: 'Michael Brown',
    dueDate: '2024-03-10',
    priority: 'high',
    estimatedDuration: '24 hours',
    partsRequired: ['Oil Seal', 'Gasket']
  }
];

const STATUS_COLORS = {
  pending: 'bg-yellow-500',
  'in-progress': 'bg-blue-500',
  completed: 'bg-green-500',
  cancelled: 'bg-red-500'
};

const PRIORITY_COLORS = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500'
};

export default function FleetMaintenancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredTasks = MAINTENANCE_TASKS.filter(task => {
    const matchesSearch = task.aircraftId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || task.status === selectedStatus;
    const matchesType = !selectedType || task.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Fleet Maintenance</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Work Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Wrench className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 due today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Maintenance Tasks</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
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
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[task.status]}`} />
                    <div>
                      <div className="font-medium">{task.description}</div>
                      <div className="text-sm text-muted-foreground">
                        Aircraft: {task.aircraftId} • {task.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{task.assignedTo}</div>
                      <div className="text-xs text-muted-foreground">
                        Due: {task.dueDate}
                      </div>
                    </div>
                    <Badge variant="outline" className={PRIORITY_COLORS[task.priority]}>
                      {task.priority}
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