'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  AlertCircle,
  CheckCircle,
  ClipboardList,
  Clock,
  FileText,
  Filter,
  Plane,
  Plus,
  RefreshCw,
  Search,
  Settings,
  User
} from 'lucide-react';
import { useState } from 'react';

interface MaintenanceTask {
  id: string;
  aircraft: string;
  type: 'routine' | 'preventive' | 'corrective' | 'inspection';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  assignedTo: string;
  startDate: string;
  endDate: string;
  parts: {
    id: string;
    name: string;
    quantity: number;
    status: 'ordered' | 'in-stock' | 'installed';
  }[];
  checklist: {
    id: string;
    task: string;
    completed: boolean;
  }[];
  notes: string[];
}

const MAINTENANCE_TASKS: MaintenanceTask[] = [
  {
    id: '1',
    aircraft: 'Boeing 737-800 (N12345)',
    type: 'routine',
    status: 'in-progress',
    priority: 'high',
    title: 'A-Check Maintenance',
    description: 'Regular A-check maintenance including system inspections and component replacements',
    assignedTo: 'John Smith',
    startDate: '2024-03-15T08:00:00Z',
    endDate: '2024-03-17T16:00:00Z',
    parts: [
      {
        id: 'p1',
        name: 'Engine Oil Filter',
        quantity: 2,
        status: 'in-stock'
      },
      {
        id: 'p2',
        name: 'Brake Pads',
        quantity: 4,
        status: 'ordered'
      }
    ],
    checklist: [
      {
        id: 'c1',
        task: 'Inspect engine components',
        completed: true
      },
      {
        id: 'c2',
        task: 'Check hydraulic systems',
        completed: false
      },
      {
        id: 'c3',
        task: 'Test landing gear',
        completed: false
      }
    ],
    notes: [
      'Additional inspection required for hydraulic system',
      'Waiting for brake pads delivery'
    ]
  },
  {
    id: '2',
    aircraft: 'Airbus A320 (N67890)',
    type: 'preventive',
    status: 'scheduled',
    priority: 'medium',
    title: 'Engine Inspection',
    description: 'Preventive maintenance for engine components and systems',
    assignedTo: 'Sarah Johnson',
    startDate: '2024-03-18T09:00:00Z',
    endDate: '2024-03-19T17:00:00Z',
    parts: [
      {
        id: 'p3',
        name: 'Engine Air Filter',
        quantity: 1,
        status: 'in-stock'
      }
    ],
    checklist: [
      {
        id: 'c4',
        task: 'Inspect engine fan blades',
        completed: false
      },
      {
        id: 'c5',
        task: 'Check engine oil levels',
        completed: false
      }
    ],
    notes: []
  },
  {
    id: '3',
    aircraft: 'Boeing 757-200 (N24680)',
    type: 'corrective',
    status: 'completed',
    priority: 'critical',
    title: 'Emergency Brake System Repair',
    description: 'Repair of malfunctioning brake system components',
    assignedTo: 'Mike Wilson',
    startDate: '2024-03-14T10:00:00Z',
    endDate: '2024-03-14T18:00:00Z',
    parts: [
      {
        id: 'p4',
        name: 'Brake Actuator',
        quantity: 1,
        status: 'installed'
      }
    ],
    checklist: [
      {
        id: 'c6',
        task: 'Replace brake actuator',
        completed: true
      },
      {
        id: 'c7',
        task: 'Test brake system',
        completed: true
      }
    ],
    notes: [
      'All tests passed successfully',
      'System functioning normally'
    ]
  }
];

const STATUS_COLORS = {
  'scheduled': 'bg-blue-500',
  'in-progress': 'bg-yellow-500',
  'completed': 'bg-green-500',
  'cancelled': 'bg-red-500'
};

const PRIORITY_COLORS = {
  'low': 'bg-green-500',
  'medium': 'bg-yellow-500',
  'high': 'bg-orange-500',
  'critical': 'bg-red-500'
};

const TYPE_COLORS = {
  'routine': 'bg-blue-500',
  'preventive': 'bg-purple-500',
  'corrective': 'bg-red-500',
  'inspection': 'bg-green-500'
};

export default function MaintenancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

  const filteredTasks = MAINTENANCE_TASKS.filter(task => {
    const matchesSearch = 
      task.aircraft.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || task.status === selectedStatus;
    const matchesType = !selectedType || task.type === selectedType;
    const matchesPriority = !selectedPriority || task.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Maintenance</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 border rounded-lg hover:bg-accent cursor-pointer ${
                        selectedTask === task.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setSelectedTask(task.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[task.status]}`} />
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {task.aircraft}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={`${TYPE_COLORS[task.type]}`}>
                            {task.type}
                          </Badge>
                          <Badge variant="outline" className={`${PRIORITY_COLORS[task.priority]}`}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Plane className="h-4 w-4" />
                          <span>{task.aircraft}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Settings className="h-4 w-4" />
                          <span>{task.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{task.assignedTo}</span>
                        </div>
                      </div>
                      {task.notes.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {task.notes.map((note, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 text-sm text-muted-foreground"
                            >
                              <AlertCircle className="h-4 w-4" />
                              <span>{note}</span>
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
              <CardTitle>Task Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTask ? (
                <div className="space-y-6">
                  {(() => {
                    const task = MAINTENANCE_TASKS.find(t => t.id === selectedTask);
                    if (!task) return null;

                    return (
                      <>
                        <div>
                          <h3 className="font-medium mb-2">Description</h3>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Parts Required</h3>
                          <div className="space-y-2">
                            {task.parts.map((part) => (
                              <div key={part.id} className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <FileText className="h-4 w-4" />
                                  <span>{part.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-muted-foreground">x{part.quantity}</span>
                                  <Badge variant="outline">{part.status}</Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Checklist</h3>
                          <div className="space-y-2">
                            {task.checklist.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2 text-sm">
                                {item.completed ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span>{item.task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[600px] text-muted-foreground">
                  Select a task to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 