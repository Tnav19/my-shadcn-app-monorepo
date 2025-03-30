'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Clock,
  Factory,
  Filter,
  Plus,
  Search,
} from 'lucide-react';
import { useState } from 'react';

// Mock data for manufacturing orders
const orders = [
  {
    id: 'MFG001',
    product: 'Engine Assembly',
    status: 'in-progress',
    progress: 65,
    startDate: '2024-03-15',
    targetDate: '2024-03-25',
    priority: 'high',
    qualityChecks: 3,
    totalChecks: 5,
    alerts: ['Quality check pending'],
  },
  {
    id: 'MFG002',
    product: 'Wing Section',
    status: 'completed',
    progress: 100,
    startDate: '2024-03-10',
    targetDate: '2024-03-20',
    priority: 'medium',
    qualityChecks: 5,
    totalChecks: 5,
    alerts: [],
  },
  {
    id: 'MFG003',
    product: 'Landing Gear',
    status: 'scheduled',
    progress: 0,
    startDate: '2024-03-25',
    targetDate: '2024-04-05',
    priority: 'low',
    qualityChecks: 0,
    totalChecks: 4,
    alerts: ['Parts delivery delayed'],
  },
];

export default function ManufacturingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);

  const filteredOrders = orders.filter((o) =>
    o.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manufacturing</h1>
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
            <CardTitle>Production Orders</CardTitle>
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
                      <Factory
                        className={`h-6 w-6 ${
                          order.status === 'completed'
                            ? 'text-green-500'
                            : order.status === 'in-progress'
                            ? 'text-blue-500'
                            : 'text-gray-500'
                        }`}
                      />
                      <div>
                        <h3 className="font-medium">{order.product}</h3>
                        <p className="text-sm text-gray-500">{order.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          order.status === 'completed'
                            ? 'default'
                            : order.status === 'in-progress'
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
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Production Progress</p>
                  <p className="text-sm text-gray-500">{selectedOrder.progress}%</p>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${selectedOrder.progress}%` }}
                  />
                </div>
              </div>

              {/* Order Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">{selectedOrder.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Target Date</p>
                    <p className="font-medium">{selectedOrder.targetDate}</p>
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
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Quality Checks</p>
                    <p className="font-medium">
                      {selectedOrder.qualityChecks} / {selectedOrder.totalChecks}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="flex items-center space-x-2">
                      {selectedOrder.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : selectedOrder.status === 'in-progress' ? (
                        <Clock className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Factory className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="capitalize">{selectedOrder.status}</span>
                    </div>
                  </div>
                </div>
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
                <Button>Update Progress</Button>
                <Button variant="outline">Quality Check</Button>
                <Button variant="outline">View Documentation</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 