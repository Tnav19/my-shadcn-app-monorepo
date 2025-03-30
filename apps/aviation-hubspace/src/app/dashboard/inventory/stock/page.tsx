'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Filter,
  PackagePlus,
  Search,
  Settings
} from 'lucide-react';
import { useState } from 'react';

interface StockItem {
  id: string;
  name: string;
  partNumber: string;
  category: 'airframe' | 'engine' | 'avionics' | 'interior' | 'consumable';
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  reorderPoint: number;
  unit: string;
  location: string;
  lastReceived: string;
  lastUsed: string;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'on-order';
  movement: {
    date: string;
    type: 'received' | 'used' | 'ordered' | 'returned';
    quantity: number;
    reference: string;
    notes?: string;
  }[];
  forecast: {
    date: string;
    expectedUsage: number;
    confidence: number;
  }[];
}

const STOCK_ITEMS: StockItem[] = [
  {
    id: '1',
    name: 'Landing Gear Assembly',
    partNumber: 'LG-737-800-001',
    category: 'airframe',
    currentStock: 5,
    minimumStock: 2,
    maximumStock: 10,
    reorderPoint: 3,
    unit: 'unit',
    location: 'Warehouse A-12',
    lastReceived: '2024-03-15',
    lastUsed: '2024-03-16',
    price: 25000,
    status: 'in-stock',
    movement: [
      {
        date: '2024-03-16',
        type: 'used',
        quantity: 1,
        reference: 'AH123 Maintenance',
        notes: 'Regular replacement'
      },
      {
        date: '2024-03-15',
        type: 'received',
        quantity: 2,
        reference: 'PO-2024-001',
        notes: 'Emergency order'
      }
    ],
    forecast: [
      {
        date: '2024-03-20',
        expectedUsage: 1,
        confidence: 0.85
      },
      {
        date: '2024-03-25',
        expectedUsage: 2,
        confidence: 0.75
      }
    ]
  },
  {
    id: '2',
    name: 'Engine Fan Blade',
    partNumber: 'CFM56-7B-001',
    category: 'engine',
    currentStock: 3,
    minimumStock: 5,
    maximumStock: 15,
    reorderPoint: 6,
    unit: 'unit',
    location: 'Warehouse B-05',
    lastReceived: '2024-02-28',
    lastUsed: '2024-03-14',
    price: 15000,
    status: 'low-stock',
    movement: [
      {
        date: '2024-03-14',
        type: 'used',
        quantity: 2,
        reference: 'AH456 Engine Overhaul',
        notes: 'Scheduled maintenance'
      }
    ],
    forecast: [
      {
        date: '2024-03-18',
        expectedUsage: 3,
        confidence: 0.95
      }
    ]
  },
  {
    id: '3',
    name: 'Flight Control Computer',
    partNumber: 'FCC-737-800-002',
    category: 'avionics',
    currentStock: 0,
    minimumStock: 1,
    maximumStock: 5,
    reorderPoint: 2,
    unit: 'unit',
    location: 'Warehouse C-08',
    lastReceived: '2024-01-15',
    lastUsed: '2024-03-13',
    price: 45000,
    status: 'out-of-stock',
    movement: [
      {
        date: '2024-03-13',
        type: 'used',
        quantity: 1,
        reference: 'AH789 Repair',
        notes: 'System failure replacement'
      }
    ],
    forecast: [
      {
        date: '2024-03-17',
        expectedUsage: 1,
        confidence: 0.90
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

export default function StockLevelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredItems = STOCK_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.partNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesStatus = !selectedStatus || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const inStockItems = STOCK_ITEMS.filter(item => item.status === 'in-stock');
  const lowStockItems = STOCK_ITEMS.filter(item => item.status === 'low-stock');
  const outOfStockItems = STOCK_ITEMS.filter(item => item.status === 'out-of-stock');
  const totalValue = STOCK_ITEMS.reduce((sum, item) => sum + (item.currentStock * item.price), 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Stock Levels</h1>
        <Button>
          <PackagePlus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Available items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Needs reorder</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Critical items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
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
            <CardTitle>Stock Items</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
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
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[item.category]}`} />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.partNumber} • {item.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {item.currentStock}/{item.maximumStock} {item.unit}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Reorder: {item.reorderPoint}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={STATUS_COLORS[item.status]}>
                        {item.status}
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