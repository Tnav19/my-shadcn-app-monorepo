'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  BookCheck,
  BookOpen,
  Clock,
  Filter,
  GraduationCap,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  Users
} from 'lucide-react';
import { useState } from 'react';

interface TrainingModule {
  id: string;
  name: string;
  type: 'recurrent' | 'initial' | 'specialized' | 'emergency' | 'safety';
  status: 'completed' | 'in-progress' | 'scheduled' | 'overdue';
  startDate: string;
  endDate: string;
  duration: number;
  instructor: string;
  location: string;
  participants: string[];
  prerequisites: string[];
  materials: string[];
  progress: number;
  score?: number;
  feedback?: string;
}

const TRAINING_MODULES: TrainingModule[] = [
  {
    id: '1',
    name: 'Emergency Procedures Training',
    type: 'recurrent',
    status: 'in-progress',
    startDate: '2024-03-15T09:00:00Z',
    endDate: '2024-03-15T17:00:00Z',
    duration: 8,
    instructor: 'Captain Robert Wilson',
    location: 'Training Center A',
    participants: ['John Smith', 'Sarah Johnson', 'Mike Wilson'],
    prerequisites: ['Basic Safety Training', 'First Aid Certification'],
    materials: ['Emergency Procedures Manual', 'Safety Equipment Guide'],
    progress: 65,
    score: 92,
    feedback: 'Excellent performance in emergency scenarios'
  },
  {
    id: '2',
    name: 'Aircraft Systems Familiarization',
    type: 'initial',
    status: 'scheduled',
    startDate: '2024-03-20T10:00:00Z',
    endDate: '2024-03-22T16:00:00Z',
    duration: 24,
    instructor: 'Captain Lisa Chen',
    location: 'Simulator Center B',
    participants: ['Emily Brown', 'David Lee', 'James Wilson'],
    prerequisites: ['Basic Aviation Knowledge'],
    materials: ['Aircraft Systems Manual', 'Training Workbook'],
    progress: 0
  },
  {
    id: '3',
    name: 'Crew Resource Management',
    type: 'specialized',
    status: 'completed',
    startDate: '2024-03-10T09:00:00Z',
    endDate: '2024-03-12T17:00:00Z',
    duration: 24,
    instructor: 'Captain Michael Brown',
    location: 'Training Center C',
    participants: ['Robert Garcia', 'Maria Chen', 'Tom Lee'],
    prerequisites: ['Basic CRM Training'],
    materials: ['CRM Handbook', 'Case Studies'],
    progress: 100,
    score: 95,
    feedback: 'Strong team coordination and communication skills'
  }
];

const TYPE_COLORS = {
  'recurrent': 'bg-blue-500',
  'initial': 'bg-green-500',
  'specialized': 'bg-purple-500',
  'emergency': 'bg-red-500',
  'safety': 'bg-yellow-500'
};

const STATUS_COLORS = {
  'completed': 'bg-green-500',
  'in-progress': 'bg-yellow-500',
  'scheduled': 'bg-blue-500',
  'overdue': 'bg-red-500'
};

export default function TrainingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedType] = useState<string | null>(null);
  const [selectedStatus] = useState<string | null>(null);

  const filteredModules = TRAINING_MODULES.filter(module => {
    const matchesSearch = 
      module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || module.type === selectedType;
    const matchesStatus = !selectedStatus || module.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Crew Training</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Training
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search training modules..."
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
              <CardTitle>Training Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredModules.map((module) => (
                    <div
                      key={module.id}
                      className={`p-4 border rounded-lg hover:bg-accent cursor-pointer ${
                        selectedModule === module.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setSelectedModule(module.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[module.status]}`} />
                          <div>
                            <div className="font-medium">{module.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {module.type}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={`${TYPE_COLORS[module.type]}`}>
                            {module.type}
                          </Badge>
                          <Badge variant="outline" className={`${STATUS_COLORS[module.status]}`}>
                            {module.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{module.participants.length} Participants</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{module.duration} Hours</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{module.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-4 w-4" />
                          <span>{module.instructor}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${module.progress}%` }}
                          />
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
              <CardTitle>Module Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedModule ? (
                <div className="space-y-6">
                  {(() => {
                    const moduleData = TRAINING_MODULES.find(m => m.id === selectedModule);
                    if (!moduleData) return null;

                    return (
                      <>
                        <div>
                          <h3 className="font-medium mb-2">Schedule</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Start Date</span>
                              <span>{new Date(moduleData.startDate).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>End Date</span>
                              <span>{new Date(moduleData.endDate).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Duration</span>
                              <span>{moduleData.duration} hours</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Participants</h3>
                          <div className="space-y-2">
                            {moduleData.participants.map((participant, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <Users className="h-4 w-4" />
                                <span>{participant}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Prerequisites</h3>
                          <div className="space-y-2">
                            {moduleData.prerequisites.map((prereq, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <BookCheck className="h-4 w-4" />
                                <span>{prereq}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Training Materials</h3>
                          <div className="space-y-2">
                            {moduleData.materials.map((material, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <BookOpen className="h-4 w-4" />
                                <span>{material}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {moduleData.score && (
                          <div>
                            <h3 className="font-medium mb-2">Results</h3>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Score</span>
                                  <span>{moduleData.score}%</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {moduleData.feedback}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[600px] text-muted-foreground">
                  Select a training module to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 