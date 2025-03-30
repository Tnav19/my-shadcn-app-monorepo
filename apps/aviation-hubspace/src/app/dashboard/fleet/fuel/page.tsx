'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Badge } from '@repo/ui/components/badge';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { 
  Droplet, 
  Search, 
  Plus, 
  Filter, 
  TrendingUp,
  DollarSign,
  Gauge,
  Settings,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface FuelRecord {
  id: string;
  aircraftId: string;
  date: string;
  fuelAmount: number;
  cost: number;
  efficiency: number;
  location: string;
  type: 'refuel' | 'consumption' | 'transfer';
  status: 'completed' | 'scheduled' | 'cancelled';
}

const FUEL_RECORDS: FuelRecord[] = [
  {
    id: '1',
    aircraftId: 'N12345',
    date: '2024-03-15',
    fuelAmount: 5000,
    cost: 15000,
    efficiency: 0.85,
    location: 'JFK',
    type: 'refuel',
    status: 'completed'
  },
  {
    id: '2',
    aircraftId: 'N67890',
    date: '2024-03-15',
    fuelAmount: 4500,
    cost: 13500,
    efficiency: 0.82,
    location: 'LAX',
    type: 'consumption',
    status: 'completed'
  },
  {
    id: '3',
    aircraftId: 'N24680',
    date: '2024-03-16',
    fuelAmount: 6000,
    cost: 18000,
    efficiency: 0.88,
    location: 'ORD',
    type: 'refuel',
    status: 'scheduled'
  }
];

const STATUS_COLORS = {
  completed: 'bg-green-500',
  scheduled: 'bg-blue-500',
  cancelled: 'bg-red-500'
};

const TYPE_COLORS = {
  refuel: 'bg-blue-500',
  consumption: 'bg-yellow-500',
  transfer: 'bg-purple-500'
};

export default function FuelManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredRecords = FUEL_RECORDS.filter(record => {
    const matchesSearch = record.aircraftId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || record.status === selectedStatus;
    const matchesType = !selectedType || record.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalFuelCost = FUEL_RECORDS.reduce((sum, record) => sum + record.cost, 0);
  const averageEfficiency = FUEL_RECORDS.reduce((sum, record) => sum + record.efficiency, 0) / FUEL_RECORDS.length;
  const totalFuelAmount = FUEL_RECORDS.reduce((sum, record) => sum + record.fuelAmount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Fuel Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Fuel Record
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fuel Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFuelCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Efficiency</CardTitle>
            <Gauge className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(averageEfficiency * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">+2% improvement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fuel Used</CardTitle>
            <Droplet className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFuelAmount.toLocaleString()}L</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost per Liter</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3.00</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Fuel Records</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
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
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${TYPE_COLORS[record.type]}`} />
                    <div>
                      <div className="font-medium">{record.type.toUpperCase()}</div>
                      <div className="text-sm text-muted-foreground">
                        Aircraft: {record.aircraftId} • {record.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {record.fuelAmount.toLocaleString()}L
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ${record.cost.toLocaleString()}
                      </div>
                    </div>
                    <Badge variant="outline" className={STATUS_COLORS[record.status]}>
                      {record.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
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