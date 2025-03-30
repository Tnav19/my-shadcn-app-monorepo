'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  AlertCircle,
  BarChart3,
  Boxes,
  CheckCircle2,
  Filter,
  Search,
  Settings,
  Warehouse
} from 'lucide-react';
import { useState } from 'react';

interface StorageLocation {
  id: string;
  name: string;
  type: 'warehouse' | 'hangar' | 'storage' | 'maintenance';
  status: 'active' | 'maintenance' | 'full' | 'empty';
  capacity: number;
  used: number;
  temperature: number;
  humidity: number;
  lastInspection: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    category: 'airframe' | 'engine' | 'avionics' | 'interior' | 'consumable';
    lastMoved: string;
    status: 'in-stock' | 'reserved' | 'in-transit' | 'damaged';
  }[];
  staff: {
    name: string;
    role: string;
    shift: 'morning' | 'afternoon' | 'night';
  }[];
}

const LOCATIONS: StorageLocation[] = [
  {
    id: '1',
    name: 'Main Warehouse A',
    type: 'warehouse',
    status: 'active',
    capacity: 1000,
    used: 750,
    temperature: 20,
    humidity: 45,
    lastInspection: '2024-03-15',
    items: [
      {
        id: '1',
        name: 'Landing Gear Assembly',
        quantity: 5,
        category: 'airframe',
        lastMoved: '2024-03-15',
        status: 'in-stock'
      },
      {
        id: '2',
        name: 'Engine Fan Blade',
        quantity: 3,
        category: 'engine',
        lastMoved: '2024-03-14',
        status: 'reserved'
      }
    ],
    staff: [
      {
        name: 'John Smith',
        role: 'Warehouse Manager',
        shift: 'morning'
      },
      {
        name: 'Sarah Johnson',
        role: 'Inventory Specialist',
        shift: 'afternoon'
      }
    ]
  },
  {
    id: '2',
    name: 'Hangar Storage B',
    type: 'hangar',
    status: 'maintenance',
    capacity: 500,
    used: 200,
    temperature: 18,
    humidity: 40,
    lastInspection: '2024-03-10',
    items: [
      {
        id: '3',
        name: 'Flight Control Computer',
        quantity: 2,
        category: 'avionics',
        lastMoved: '2024-03-13',
        status: 'in-stock'
      }
    ],
    staff: [
      {
        name: 'Michael Brown',
        role: 'Hangar Supervisor',
        shift: 'morning'
      }
    ]
  },
  {
    id: '3',
    name: 'Maintenance Storage C',
    type: 'maintenance',
    status: 'active',
    capacity: 300,
    used: 250,
    temperature: 22,
    humidity: 50,
    lastInspection: '2024-03-12',
    items: [
      {
        id: '4',
        name: 'Cabin Interior Panel',
        quantity: 8,
        category: 'interior',
        lastMoved: '2024-03-16',
        status: 'in-stock'
      }
    ],
    staff: [
      {
        name: 'Emily Davis',
        role: 'Maintenance Coordinator',
        shift: 'afternoon'
      }
    ]
  }
];

const STATUS_COLORS = {
  active: 'bg-green-500',
  maintenance: 'bg-yellow-500',
  full: 'bg-red-500',
  empty: 'bg-gray-500'
};

const TYPE_COLORS = {
  warehouse: 'bg-blue-500',
  hangar: 'bg-purple-500',
  storage: 'bg-orange-500',
  maintenance: 'bg-red-500'
};

export default function WarehousePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredLocations = LOCATIONS.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || location.type === selectedType;
    const matchesStatus = !selectedStatus || location.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const activeLocations = LOCATIONS.filter(location => location.status === 'active');
  const maintenanceLocations = LOCATIONS.filter(location => location.status === 'maintenance');
  const totalCapacity = LOCATIONS.reduce((sum, location) => sum + location.capacity, 0);
  const totalUsed = LOCATIONS.reduce((sum, location) => sum + location.used, 0);
  const utilizationRate = (totalUsed / totalCapacity) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Warehouse Management</h1>
        <Button>
          <Warehouse className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Locations</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeLocations.length}</div>
            <p className="text-xs text-muted-foreground">In operation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Maintenance</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceLocations.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled work</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Boxes className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity}</div>
            <p className="text-xs text-muted-foreground">Storage units</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{utilizationRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Space used</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Storage Locations</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search locations..."
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
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${TYPE_COLORS[location.type]}`} />
                    <div>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {location.type} • {location.staff.length} staff members
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {location.used}/{location.capacity} units
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {location.items.length} items stored
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={STATUS_COLORS[location.status]}>
                        {location.status}
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