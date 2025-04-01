'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  AlertCircle,
  AlertTriangle,
  Boxes,
  CheckCircle2,
  Filter,
  PackagePlus,
  Search,
  Settings
} from 'lucide-react';
import { useState } from 'react';

interface Part {
  id: string;
  name: string;
  partNumber: string;
  category: 'airframe' | 'engine' | 'avionics' | 'interior' | 'consumable';
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'on-order';
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  unit: string;
  location: string;
  supplier: string;
  lastReceived: string;
  lastUsed: string;
  price: number;
  history: {
    date: string;
    type: 'received' | 'used' | 'ordered' | 'returned';
    quantity: number;
    reference: string;
    notes?: string;
  }[];
}

const PARTS: Part[] = [
  {
    id: '1',
    name: 'Landing Gear Assembly',
    partNumber: 'LG-737-800-001',
    category: 'airframe',
    status: 'in-stock',
    quantity: 5,
    minQuantity: 2,
    maxQuantity: 10,
    unit: 'unit',
    location: 'Warehouse A-12',
    supplier: 'Aerospace Components Inc.',
    lastReceived: '2024-03-10',
    lastUsed: '2024-03-15',
    price: 25000,
    history: [
      {
        date: '2024-03-15',
        type: 'used',
        quantity: 1,
        reference: 'AH123 Maintenance',
        notes: 'Regular replacement'
      },
      {
        date: '2024-03-10',
        type: 'received',
        quantity: 2,
        reference: 'PO-2024-001',
        notes: 'Emergency order'
      }
    ]
  },
  {
    id: '2',
    name: 'Engine Fan Blade',
    partNumber: 'CFM56-7B-001',
    category: 'engine',
    status: 'low-stock',
    quantity: 3,
    minQuantity: 5,
    maxQuantity: 15,
    unit: 'unit',
    location: 'Warehouse B-05',
    supplier: 'Engine Parts Co.',
    lastReceived: '2024-02-28',
    lastUsed: '2024-03-14',
    price: 15000,
    history: [
      {
        date: '2024-03-14',
        type: 'used',
        quantity: 2,
        reference: 'AH456 Engine Overhaul',
        notes: 'Scheduled maintenance'
      }
    ]
  },
  {
    id: '3',
    name: 'Flight Control Computer',
    partNumber: 'FCC-737-800-002',
    category: 'avionics',
    status: 'out-of-stock',
    quantity: 0,
    minQuantity: 1,
    maxQuantity: 5,
    unit: 'unit',
    location: 'Warehouse C-08',
    supplier: 'Avionics Systems Ltd.',
    lastReceived: '2024-01-15',
    lastUsed: '2024-03-13',
    price: 45000,
    history: [
      {
        date: '2024-03-13',
        type: 'used',
        quantity: 1,
        reference: 'AH789 Repair',
        notes: 'System failure replacement'
      }
    ]
  }
];

const STATUS_COLORS = {
  'in-stock': 'bg-green-500',
  'low-stock': 'bg-yellow-500',
  'out-of-stock': 'bg-red-500',
  'on-order': 'bg-blue-500'
};

const CATEGORY_COLORS = {
  airframe: 'bg-blue-500',
  engine: 'bg-red-500',
  avionics: 'bg-purple-500',
  interior: 'bg-orange-500',
  consumable: 'bg-green-500'
};

export default function PartsInventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory] = useState<string | null>(null);
  const [selectedStatus] = useState<string | null>(null);

  const filteredParts = PARTS.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         part.partNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || part.category === selectedCategory;
    const matchesStatus = !selectedStatus || part.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const inStockParts = PARTS.filter(part => part.status === 'in-stock');
  const lowStockParts = PARTS.filter(part => part.status === 'low-stock');
  const outOfStockParts = PARTS.filter(part => part.status === 'out-of-stock');
  const totalValue = PARTS.reduce((sum, part) => sum + (part.quantity * part.price), 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Parts Inventory</h1>
        <Button>
          <PackagePlus className="mr-2 h-4 w-4" />
          Add Part
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inStockParts.length}</div>
            <p className="text-xs text-muted-foreground">Available parts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockParts.length}</div>
            <p className="text-xs text-muted-foreground">Needs reorder</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockParts.length}</div>
            <p className="text-xs text-muted-foreground">Critical items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Boxes className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Inventory value</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Parts List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
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
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredParts.map((part) => (
                <div
                  key={part.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[part.category]}`} />
                    <div>
                      <div className="font-medium">{part.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {part.partNumber} • {part.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {part.quantity} {part.unit}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ${part.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={STATUS_COLORS[part.status]}>
                        {part.status}
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