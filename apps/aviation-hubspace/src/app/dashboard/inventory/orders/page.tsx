'use client';

import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  Filter,
  Package,
  Plus,
  Search,
  ShoppingCart
} from 'lucide-react';
import { useState } from 'react';

interface Order {
  id: string;
  orderNumber: string;
  supplier: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  total: number;
  orderDate: string;
  expectedDelivery: string;
}

const ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    supplier: 'Aerospace Parts Co.',
    status: 'processing',
    items: 5,
    total: 25000,
    orderDate: '2024-03-15',
    expectedDelivery: '2024-03-25'
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    supplier: 'Aviation Components Ltd.',
    status: 'pending',
    items: 3,
    total: 15000,
    orderDate: '2024-03-16',
    expectedDelivery: '2024-03-28'
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    supplier: 'Global Aviation Supplies',
    status: 'shipped',
    items: 8,
    total: 45000,
    orderDate: '2024-03-10',
    expectedDelivery: '2024-03-20'
  }
];

const STATUS_COLORS = {
  pending: 'bg-yellow-500',
  processing: 'bg-blue-500',
  shipped: 'bg-purple-500',
  delivered: 'bg-green-500',
  cancelled: 'bg-red-500'
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = ORDERS.filter(order =>
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ORDERS.length}</div>
            <p className="text-xs text-muted-foreground">Active orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Package className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ORDERS.filter(order => order.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ORDERS.filter(order => order.status === 'processing').length}
            </div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
            <Package className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ORDERS.filter(order => order.status === 'shipped').length}
            </div>
            <p className="text-xs text-muted-foreground">In transit</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Orders List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
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
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[order.status]}`} />
                    <div>
                      <div className="font-medium">{order.orderNumber}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.supplier}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {order.items} items • ${order.total.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Ordered: {order.orderDate}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Package className="h-4 w-4" />
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