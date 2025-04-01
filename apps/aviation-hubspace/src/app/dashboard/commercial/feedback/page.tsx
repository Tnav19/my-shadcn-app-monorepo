'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  CalendarCheck,
  Filter,
  MessageCircle,
  Plus,
  RefreshCw,
  Search,
  Send,
  Star,
  Tag
} from 'lucide-react';
import { useState } from 'react';

interface Feedback {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  flightNumber: string;
  date: string;
  type: 'complaint' | 'compliment' | 'suggestion' | 'question';
  category: 'service' | 'comfort' | 'safety' | 'food' | 'entertainment' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  sentiment: 'positive' | 'neutral' | 'negative';
  rating: number;
  title: string;
  content: string;
  attachments: {
    name: string;
    url: string;
    type: string;
  }[];
  responses: {
    id: string;
    date: string;
    responder: string;
    content: string;
    status: 'sent' | 'delivered' | 'read';
  }[];
  tags: string[];
  assignedTo: string;
  resolution: {
    date: string;
    resolution: string;
    resolvedBy: string;
  } | null;
}

const FEEDBACK: Feedback[] = [
  {
    id: '1',
    customerId: 'CUST001',
    customerName: 'John Doe',
    customerEmail: 'john.doe@email.com',
    customerPhone: '+1 (555) 123-4567',
    flightNumber: 'AA123',
    date: '2024-03-15T10:30:00Z',
    type: 'compliment',
    category: 'service',
    priority: 'low',
    status: 'resolved',
    sentiment: 'positive',
    rating: 5,
    title: 'Excellent Service on Recent Flight',
    content: 'I would like to commend the flight attendants for their exceptional service on my recent flight from New York to Los Angeles. They were professional, friendly, and went above and beyond to ensure passenger comfort.',
    attachments: [],
    responses: [
      {
        id: 'R1',
        date: '2024-03-15T11:00:00Z',
        responder: 'Sarah Johnson',
        content: 'Thank you for your kind words! We appreciate your feedback and will share it with the crew.',
        status: 'read'
      }
    ],
    tags: ['service-excellence', 'crew-praise'],
    assignedTo: 'Customer Service Team',
    resolution: {
      date: '2024-03-15T11:30:00Z',
      resolution: 'Feedback acknowledged and shared with crew management',
      resolvedBy: 'Sarah Johnson'
    }
  },
  {
    id: '2',
    customerId: 'CUST002',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@email.com',
    customerPhone: '+1 (555) 987-6543',
    flightNumber: 'AA456',
    date: '2024-03-15T14:15:00Z',
    type: 'complaint',
    category: 'comfort',
    priority: 'high',
    status: 'in-progress',
    sentiment: 'negative',
    rating: 2,
    title: 'Uncomfortable Seating Experience',
    content: 'The seats in economy class were extremely uncomfortable. The legroom was insufficient, and the seat padding was worn out. This made my 6-hour flight very unpleasant.',
    attachments: [
      {
        name: 'Seat Photo',
        url: '/feedback/seat-photo.jpg',
        type: 'image'
      }
    ],
    responses: [
      {
        id: 'R2',
        date: '2024-03-15T15:00:00Z',
        responder: 'Mike Wilson',
        content: 'I apologize for your discomfort. We are currently reviewing our seating arrangements and will investigate this issue.',
        status: 'sent'
      }
    ],
    tags: ['seating', 'comfort-issue'],
    assignedTo: 'Customer Experience Team',
    resolution: null
  }
];

const STATUS_COLORS = {
  'new': 'bg-blue-500',
  'in-progress': 'bg-yellow-500',
  'resolved': 'bg-green-500',
  'closed': 'bg-gray-500'
};

const PRIORITY_COLORS = {
  'low': 'bg-green-500',
  'medium': 'bg-yellow-500',
  'high': 'bg-orange-500',
  'urgent': 'bg-red-500'
};

export default function FeedbackPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [selectedStatus] = useState<string | null>(null);
  const [selectedType] = useState<string | null>(null);
  const [selectedPriority] = useState<string | null>(null);

  const filteredFeedback = FEEDBACK.filter(feedback => {
    const matchesSearch = 
      feedback.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || feedback.status === selectedStatus;
    const matchesType = !selectedType || feedback.type === selectedType;
    const matchesPriority = !selectedPriority || feedback.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customer Feedback</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Response
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
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
              <CardTitle>Feedback List</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredFeedback.map((feedback) => (
                    <div
                      key={feedback.id}
                      className={`p-4 border rounded-lg hover:bg-accent cursor-pointer ${
                        selectedFeedback === feedback.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setSelectedFeedback(feedback.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[feedback.status]}`} />
                          <div>
                            <div className="font-medium">{feedback.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {feedback.customerName} • {feedback.flightNumber}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={`${PRIORITY_COLORS[feedback.priority]}`}>
                            {feedback.priority}
                          </Badge>
                          <Badge variant="outline" className={`${STATUS_COLORS[feedback.status]}`}>
                            {feedback.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4" />
                          <span>{feedback.rating}/5 Rating</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CalendarCheck className="h-4 w-4" />
                          <span>{new Date(feedback.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Tag className="h-4 w-4" />
                          <span>{feedback.category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="h-4 w-4" />
                          <span>{feedback.responses.length} Responses</span>
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
              <CardTitle>Feedback Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedFeedback ? (
                <div className="space-y-6">
                  {(() => {
                    const feedback = FEEDBACK.find(f => f.id === selectedFeedback);
                    if (!feedback) return null;

                    return (
                      <>
                        <div>
                          <h3 className="font-medium mb-2">Customer Information</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Name</span>
                              <span>{feedback.customerName}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Email</span>
                              <span>{feedback.customerEmail}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Phone</span>
                              <span>{feedback.customerPhone}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Flight</span>
                              <span>{feedback.flightNumber}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Feedback Content</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Type</span>
                              <Badge variant="outline">{feedback.type}</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Category</span>
                              <Badge variant="outline">{feedback.category}</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Priority</span>
                              <Badge variant="outline" className={`${PRIORITY_COLORS[feedback.priority]}`}>
                                {feedback.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Rating</span>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="mt-2">
                              <div className="text-sm font-medium mb-1">Content</div>
                              <div className="text-sm text-muted-foreground">{feedback.content}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Responses</h3>
                          <div className="space-y-4">
                            {feedback.responses.map((response) => (
                              <div key={response.id} className="p-3 bg-muted rounded-lg">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="font-medium">{response.responder}</span>
                                  <span>{new Date(response.date).toLocaleString()}</span>
                                </div>
                                <div className="mt-2 text-sm">{response.content}</div>
                                <div className="mt-2 flex items-center space-x-2 text-xs text-muted-foreground">
                                  <span>Status:</span>
                                  <Badge variant="outline">{response.status}</Badge>
                                </div>
                              </div>
                            ))}
                            <Button className="w-full">
                              <Send className="mr-2 h-4 w-4" />
                              Send Response
                            </Button>
                          </div>
                        </div>

                        {feedback.resolution && (
                          <div>
                            <h3 className="font-medium mb-2">Resolution</h3>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Resolved By</span>
                                <span>{feedback.resolution.resolvedBy}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Resolution Date</span>
                                <span>{new Date(feedback.resolution.date).toLocaleDateString()}</span>
                              </div>
                              <div className="mt-2">
                                <div className="text-sm font-medium mb-1">Resolution Details</div>
                                <div className="text-sm text-muted-foreground">
                                  {feedback.resolution.resolution}
                                </div>
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
                  Select feedback to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 