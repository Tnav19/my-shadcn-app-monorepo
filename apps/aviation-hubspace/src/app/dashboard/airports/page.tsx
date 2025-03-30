'use client';

import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/components/table';
import { Building2, Plane, Users, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const airportData = [
  { name: 'LAX', flights: 120, gates: 45, utilization: 85 },
  { name: 'JFK', flights: 95, gates: 38, utilization: 82 },
  { name: 'ORD', flights: 110, gates: 42, utilization: 88 },
  { name: 'DFW', flights: 105, gates: 40, utilization: 85 },
  { name: 'MIA', flights: 85, gates: 35, utilization: 80 },
  { name: 'SEA', flights: 75, gates: 30, utilization: 78 },
];

const gates = [
  {
    id: 'LAX-A1',
    airport: 'LAX',
    terminal: 'Terminal 1',
    status: 'Occupied',
    currentFlight: 'AA123',
    nextFlight: 'UA456',
    maintenance: false,
  },
  {
    id: 'JFK-B3',
    airport: 'JFK',
    terminal: 'Terminal 4',
    status: 'Available',
    currentFlight: null,
    nextFlight: 'DL789',
    maintenance: false,
  },
  {
    id: 'ORD-C5',
    airport: 'ORD',
    terminal: 'Terminal 2',
    status: 'Maintenance',
    currentFlight: null,
    nextFlight: 'AA234',
    maintenance: true,
  },
];

export default function AirportManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Airport Management</h2>
        <Button>
          <Building2 className="mr-2 h-4 w-4" />
          Add Airport
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Airports</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">active locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Flights</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">590</div>
            <p className="text-xs text-muted-foreground">scheduled today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ground Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">active personnel</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gate Utilization</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">average rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Airport Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={airportData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="flights"
                  fill="#8884d8"
                  name="Daily Flights"
                />
                <Bar
                  yAxisId="right"
                  dataKey="gates"
                  fill="#82ca9d"
                  name="Available Gates"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gate Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gate ID</TableHead>
                <TableHead>Airport</TableHead>
                <TableHead>Terminal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Flight</TableHead>
                <TableHead>Next Flight</TableHead>
                <TableHead>Maintenance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gates.map((gate) => (
                <TableRow key={gate.id}>
                  <TableCell>{gate.id}</TableCell>
                  <TableCell>{gate.airport}</TableCell>
                  <TableCell>{gate.terminal}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      gate.status === 'Available' ? 'bg-green-100 text-green-700' :
                      gate.status === 'Occupied' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {gate.status}
                    </span>
                  </TableCell>
                  <TableCell>{gate.currentFlight || '-'}</TableCell>
                  <TableCell>{gate.nextFlight}</TableCell>
                  <TableCell>
                    {gate.maintenance ? (
                      <div className="flex items-center text-red-500">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Required
                      </div>
                    ) : (
                      <div className="flex items-center text-green-500">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        OK
                      </div>
                    )}
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