'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  AlertTriangle,
  ChevronRight,
  Filter,
  Package,
  Plus,
  Search,
} from 'lucide-react';
import { useState } from 'react';

// Mock data for parts
const parts = [
  {
    id: 'PT001',
    name: 'Landing Gear Assembly',
    category: 'Structural',
    quantity: 12,
    minQuantity: 5,
    location: 'Warehouse A',
    status: 'in-stock',
    lastRestocked: '2024-03-15',
    supplier: 'Aerospace Components Inc.',
  },
  {
    id: 'PT002',
    name: 'Engine Fan Blade',
    category: 'Propulsion',
    quantity: 3,
    minQuantity: 10,
    location: 'Warehouse B',
    status: 'low-stock',
    lastRestocked: '2024-03-10',
    supplier: 'Jet Parts Co.',
  },
  {
    id: 'PT003',
    name: 'Avionics Control Unit',
    category: 'Electronics',
    quantity: 8,
    minQuantity: 5,
    location: 'Warehouse A',
    status: 'in-stock',
    lastRestocked: '2024-03-18',
    supplier: 'Avionics Systems Ltd.',
  },
];

export default function PartsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPart, setSelectedPart] = useState(parts[0]);

  const filteredParts = parts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Parts Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search parts..."
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
        {/* Parts List */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {filteredParts.map((part) => (
                  <div
                    key={part.id}
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedPart.id === part.id
                        ? 'bg-gray-100 border-gray-300'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedPart(part)}
                  >
                    <div className="flex items-center space-x-4">
                      <Package
                        className={`h-6 w-6 ${
                          part.status === 'in-stock'
                            ? 'text-green-500'
                            : 'text-yellow-500'
                        }`}
                      />
                      <div>
                        <h3 className="font-medium">{part.name}</h3>
                        <p className="text-sm text-gray-500">{part.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={part.status === 'in-stock' ? 'default' : 'secondary'}
                      >
                        {part.status}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Part Details */}
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Part Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Stock Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Quantity</p>
                    <p className="text-2xl font-bold">{selectedPart.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Minimum Quantity</p>
                    <p className="font-medium">{selectedPart.minQuantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{selectedPart.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{selectedPart.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Restocked</p>
                    <p className="font-medium">{selectedPart.lastRestocked}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Supplier</p>
                    <p className="font-medium">{selectedPart.supplier}</p>
                  </div>
                </div>
              </div>

              {/* Low Stock Alert */}
              {selectedPart.quantity <= selectedPart.minQuantity && (
                <div className="flex items-start space-x-2 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    Stock level is below minimum quantity. Consider placing a new order.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button>Place Order</Button>
                <Button variant="outline">View History</Button>
                <Button variant="outline">Update Stock</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 