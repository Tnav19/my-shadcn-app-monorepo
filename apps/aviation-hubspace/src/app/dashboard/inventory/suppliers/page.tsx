'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  Building,
  CheckCircle2,
  Clock,
  DollarSign,
  Filter,
  Search,
  Settings,
  Star
} from 'lucide-react';
import { useState } from 'react';

interface Supplier {
  id: string;
  name: string;
  category: 'airframe' | 'engine' | 'avionics' | 'interior' | 'consumable';
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  location: string;
  rating: number;
  totalOrders: number;
  totalSpent: number;
  onTimeDelivery: number;
  qualityScore: number;
  lastOrder: {
    date: string;
    amount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  };
  activeOrders: {
    id: string;
    date: string;
    amount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: {
      name: string;
      quantity: number;
      price: number;
    }[];
  }[];
}

const SUPPLIERS: Supplier[] = [
  {
    id: '1',
    name: 'Aerospace Components Inc.',
    category: 'airframe',
    status: 'active',
    contact: {
      name: 'John Smith',
      email: 'john.smith@aerospace.com',
      phone: '+1 (555) 123-4567'
    },
    location: 'Los Angeles, CA',
    rating: 4.8,
    totalOrders: 156,
    totalSpent: 2500000,
    onTimeDelivery: 98,
    qualityScore: 95,
    lastOrder: {
      date: '2024-03-15',
      amount: 75000,
      status: 'delivered'
    },
    activeOrders: [
      {
        id: 'PO-2024-001',
        date: '2024-03-20',
        amount: 45000,
        status: 'processing',
        items: [
          {
            name: 'Landing Gear Assembly',
            quantity: 2,
            price: 22500
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Engine Parts Co.',
    category: 'engine',
    status: 'active',
    contact: {
      name: 'Sarah Johnson',
      email: 'sarah.j@engineparts.com',
      phone: '+1 (555) 234-5678'
    },
    location: 'Houston, TX',
    rating: 4.5,
    totalOrders: 89,
    totalSpent: 1800000,
    onTimeDelivery: 95,
    qualityScore: 92,
    lastOrder: {
      date: '2024-03-10',
      amount: 65000,
      status: 'delivered'
    },
    activeOrders: [
      {
        id: 'PO-2024-002',
        date: '2024-03-25',
        amount: 85000,
        status: 'pending',
        items: [
          {
            name: 'Engine Fan Blade',
            quantity: 5,
            price: 17000
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Avionics Systems Ltd.',
    category: 'avionics',
    status: 'pending',
    contact: {
      name: 'Michael Brown',
      email: 'm.brown@avionics.com',
      phone: '+1 (555) 345-6789'
    },
    location: 'Seattle, WA',
    rating: 4.2,
    totalOrders: 45,
    totalSpent: 950000,
    onTimeDelivery: 90,
    qualityScore: 88,
    lastOrder: {
      date: '2024-02-28',
      amount: 55000,
      status: 'delivered'
    },
    activeOrders: []
  }
];

const STATUS_COLORS = {
  active: 'bg-green-500',
  inactive: 'bg-gray-500',
  pending: 'bg-yellow-500',
  blocked: 'bg-red-500'
};

const CATEGORY_COLORS = {
  airframe: 'bg-blue-500',
  engine: 'bg-red-500',
  avionics: 'bg-purple-500',
  interior: 'bg-orange-500',
  consumable: 'bg-green-500'
};

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredSuppliers = SUPPLIERS.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || supplier.category === selectedCategory;
    const matchesStatus = !selectedStatus || supplier.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const activeSuppliers = SUPPLIERS.filter(supplier => supplier.status === 'active');
  const pendingSuppliers = SUPPLIERS.filter(supplier => supplier.status === 'pending');
  const totalSpent = SUPPLIERS.reduce((sum, supplier) => sum + supplier.totalSpent, 0);
  const averageRating = SUPPLIERS.reduce((sum, supplier) => sum + supplier.rating, 0) / SUPPLIERS.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Suppliers</h1>
        <Button>
          <Building className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSuppliers.length}</div>
            <p className="text-xs text-muted-foreground">Current partners</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingSuppliers.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalSpent / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Out of 5</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Supplier List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers..."
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
              {filteredSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[supplier.category]}`} />
                    <div>
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {supplier.location} • {supplier.contact.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {supplier.onTimeDelivery}% on-time
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {supplier.activeOrders.length} active orders
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={STATUS_COLORS[supplier.status]}>
                        {supplier.status}
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