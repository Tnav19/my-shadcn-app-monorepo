'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  FileText,
  Filter,
  Package,
  Plane,
  Plus,
  RefreshCw,
  Search,
  Settings
} from 'lucide-react';
import { useState } from 'react';

interface Part {
  id: string;
  name: string;
  partNumber: string;
  category: 'engine' | 'avionics' | 'structural' | 'interior' | 'landing-gear' | 'other';
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'ordered' | 'discontinued';
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  unit: string;
  location: string;
  supplier: string;
  lastOrdered: string;
  nextOrderDate: string;
  price: number;
  description: string;
  compatibleAircraft: string[];
  usageHistory: {
    date: string;
    quantity: number;
    type: 'in' | 'out';
    reference: string;
  }[];
}

const PARTS: Part[] = [
  {
    id: '1',
    name: 'Engine Oil Filter',
    partNumber: 'EO-12345',
    category: 'engine',
    status: 'in-stock',
    quantity: 25,
    minQuantity: 10,
    maxQuantity: 50,
    unit: 'pieces',
    location: 'Warehouse A-123',
    supplier: 'AeroParts Inc.',
    lastOrdered: '2024-03-01T10:00:00Z',
    nextOrderDate: '2024-04-01T10:00:00Z',
    price: 150.00,
    description: 'High-performance engine oil filter for commercial aircraft engines',
    compatibleAircraft: ['Boeing 737-800', 'Airbus A320'],
    usageHistory: [
      {
        date: '2024-03-15T08:00:00Z',
        quantity: 2,
        type: 'out',
        reference: 'MAINT-001'
      },
      {
        date: '2024-03-01T10:00:00Z',
        quantity: 20,
        type: 'in',
        reference: 'ORDER-123'
      }
    ]
  },
  {
    id: '2',
    name: 'Landing Gear Actuator',
    partNumber: 'LG-67890',
    category: 'landing-gear',
    status: 'low-stock',
    quantity: 3,
    minQuantity: 5,
    maxQuantity: 15,
    unit: 'pieces',
    location: 'Warehouse B-456',
    supplier: 'Aviation Systems Ltd.',
    lastOrdered: '2024-02-15T14:30:00Z',
    nextOrderDate: '2024-03-15T14:30:00Z',
    price: 2500.00,
    description: 'Hydraulic actuator for main landing gear extension and retraction',
    compatibleAircraft: ['Boeing 757-200', 'Airbus A321'],
    usageHistory: [
      {
        date: '2024-03-14T09:00:00Z',
        quantity: 1,
        type: 'out',
        reference: 'MAINT-002'
      }
    ]
  },
  {
    id: '3',
    name: 'Cockpit Display Unit',
    partNumber: 'CDU-34567',
    category: 'avionics',
    status: 'out-of-stock',
    quantity: 0,
    minQuantity: 2,
    maxQuantity: 10,
    unit: 'pieces',
    location: 'Warehouse C-789',
    supplier: 'Avionics Solutions',
    lastOrdered: '2024-02-01T09:00:00Z',
    nextOrderDate: '2024-03-01T09:00:00Z',
    price: 15000.00,
    description: 'Primary flight display unit for aircraft cockpit',
    compatibleAircraft: ['Airbus A320', 'Airbus A321'],
    usageHistory: [
      {
        date: '2024-02-28T16:00:00Z',
        quantity: 1,
        type: 'out',
        reference: 'MAINT-003'
      }
    ]
  }
];

const STATUS_COLORS = {
  'in-stock': 'bg-green-500',
  'low-stock': 'bg-yellow-500',
  'out-of-stock': 'bg-red-500',
  'ordered': 'bg-blue-500',
  'discontinued': 'bg-gray-500'
};

const CATEGORY_COLORS = {
  'engine': 'bg-red-500',
  'avionics': 'bg-blue-500',
  'structural': 'bg-purple-500',
  'interior': 'bg-green-500',
  'landing-gear': 'bg-orange-500',
  'other': 'bg-gray-500'
};

export default function PartsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredParts = PARTS.filter(part => {
    const matchesSearch = 
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || part.status === selectedStatus;
    const matchesCategory = !selectedCategory || part.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Parts Inventory</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Part
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search parts..."
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
              <CardTitle>Parts List</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredParts.map((part) => (
                    <div
                      key={part.id}
                      className={`p-4 border rounded-lg hover:bg-accent cursor-pointer ${
                        selectedPart === part.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setSelectedPart(part.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[part.status]}`} />
                          <div>
                            <div className="font-medium">{part.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {part.partNumber}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={`${CATEGORY_COLORS[part.category]}`}>
                            {part.category}
                          </Badge>
                          <Badge variant="outline" className={`${STATUS_COLORS[part.status]}`}>
                            {part.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4" />
                          <span>{part.quantity} {part.unit}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Settings className="h-4 w-4" />
                          <span>{part.category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Last ordered: {new Date(part.lastOrdered).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Plane className="h-4 w-4" />
                          <span>{part.compatibleAircraft.join(', ')}</span>
                        </div>
                      </div>
                      {part.status === 'low-stock' && (
                        <div className="mt-4 flex items-center space-x-2 text-sm text-yellow-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Low stock alert: {part.quantity} remaining</span>
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
              <CardTitle>Part Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPart ? (
                <div className="space-y-6">
                  {(() => {
                    const part = PARTS.find(p => p.id === selectedPart);
                    if (!part) return null;

                    return (
                      <>
                        <div>
                          <h3 className="font-medium mb-2">Description</h3>
                          <p className="text-sm text-muted-foreground">{part.description}</p>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Stock Information</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Current Stock</span>
                              <span>{part.quantity} {part.unit}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Minimum Stock</span>
                              <span>{part.minQuantity} {part.unit}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Maximum Stock</span>
                              <span>{part.maxQuantity} {part.unit}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Unit Price</span>
                              <span>${part.price.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Location & Supplier</h3>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                              <Package className="h-4 w-4" />
                              <span>{part.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <FileText className="h-4 w-4" />
                              <span>{part.supplier}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Usage History</h3>
                          <div className="space-y-2">
                            {part.usageHistory.map((usage, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  {usage.type === 'in' ? (
                                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                                  )}
                                  <span>{usage.reference}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span>{usage.quantity} {part.unit}</span>
                                  <span className="text-muted-foreground">
                                    {new Date(usage.date).toLocaleDateString()}
                                  </span>
                                </div>
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
                  Select a part to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 