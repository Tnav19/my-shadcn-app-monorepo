import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/components/table';
import { Tool, Plus, Search, Filter } from 'lucide-react';

const parts = [
  {
    id: 'PT001',
    name: 'Engine Turbine Blade',
    category: 'Engine',
    manufacturer: 'GE Aviation',
    stock: 45,
    minStock: 20,
    location: 'Warehouse A-12',
    lastInspection: '2024-03-15',
    status: 'In Stock',
  },
  {
    id: 'PT002',
    name: 'Landing Gear Assembly',
    category: 'Landing System',
    manufacturer: 'Boeing',
    stock: 12,
    minStock: 15,
    location: 'Warehouse B-05',
    lastInspection: '2024-03-10',
    status: 'Low Stock',
  },
  // Add more sample parts...
];

export default function PartsManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Parts Management</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Part
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Parts Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search parts..." className="pl-8" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engine">Engine</SelectItem>
                <SelectItem value="landing">Landing System</SelectItem>
                <SelectItem value="avionics">Avionics</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Part ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Inspection</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parts.map((part) => (
                <TableRow key={part.id}>
                  <TableCell>{part.id}</TableCell>
                  <TableCell>{part.name}</TableCell>
                  <TableCell>{part.category}</TableCell>
                  <TableCell>{part.manufacturer}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span>{part.stock}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        (Min: {part.minStock})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{part.location}</TableCell>
                  <TableCell>{part.lastInspection}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      part.status === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {part.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Tool className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 