'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Badge } from '@repo/ui/components/badge';
import {
  Search,
  ShoppingCart,
  AlertTriangle,
  Plus,
  Filter,
  ChevronRight,
  CheckCircle,
  Clock,
  DollarSign,
} from 'lucide-react';

// Mock data for sales orders
const orders = [
  {
    id: 'ORD001',
    customer: 'Global Airlines',
    product: 'Boeing 737-800',
    status: 'processing',
    amount: '$85,000,000',
    orderDate: '2024-03-15',
    deliveryDate: '2024-06-15',
    priority: 'high',
    items: 1,
    alerts: ['Payment verification pending'],
  },
  {
    id: 'ORD002',
    customer: 'Regional Air',
    product: 'Airbus A320',
    status: 'completed',
    amount: '$92,000,000',
    orderDate: '2024-03-10',
    deliveryDate: '2024-06-10',
    priority: 'medium',
    items: 1,
    alerts: [],
  },
  {
    id: 'ORD003',
    customer: 'Cargo Express',
    product: 'Boeing 777-300ER',
    status: 'pending',
    amount: '$145,000,000',
    orderDate: '2024-03-20',
    deliveryDate: '2024-09-20',
    priority: 'low',
    items: 1,
    alerts: ['Contract review required'],
  },
];

export default function SalesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);

  const filteredOrders = orders.filter((o) =>
    o.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sales & Orders</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Orders List */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedOrder.id === order.id
                        ? 'bg-gray-100 border-gray-300'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-center space-x-4">
                      <ShoppingCart
                        className={`h-6 w-6 ${
                          order.status === 'completed'
                            ? 'text-green-500'
                            : order.status === 'processing'
                            ? 'text-blue-500'
                            : 'text-gray-500'
                        }`}
                      />
                      <div>
                        <h3 className="font-medium">{order.customer}</h3>
                        <p className="text-sm text-gray-500">{order.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          order.status === 'completed'
                            ? 'default'
                            : order.status === 'processing'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {order.status}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Product</p>
                    <p className="font-medium">{selectedOrder.product}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium">{selectedOrder.orderDate}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <p className="font-medium">{selectedOrder.amount}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Delivery Date</p>
                    <p className="font-medium">{selectedOrder.deliveryDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <Badge
                      variant={
                        selectedOrder.priority === 'high'
                          ? 'destructive'
                          : selectedOrder.priority === 'medium'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {selectedOrder.priority}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Status Information */}
              <div className="flex items-center space-x-2">
                {selectedOrder.status === 'completed' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : selectedOrder.status === 'processing' ? (
                  <Clock className="h-5 w-5 text-blue-500" />
                ) : (
                  <ShoppingCart className="h-5 w-5 text-gray-500" />
                )}
                <span className="capitalize font-medium">{selectedOrder.status}</span>
              </div>

              {/* Alerts */}
              {selectedOrder.alerts.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium">Active Alerts</h3>
                  <div className="space-y-2">
                    {selectedOrder.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-2 p-3 rounded-lg bg-yellow-50 border border-yellow-200"
                      >
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <p className="text-sm text-yellow-800">{alert}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button>Update Status</Button>
                <Button variant="outline">View Contract</Button>
                <Button variant="outline">Generate Invoice</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 