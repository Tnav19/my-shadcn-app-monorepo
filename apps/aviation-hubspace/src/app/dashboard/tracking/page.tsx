import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/components/table';
import { Plane, MapPin, Clock, AlertCircle } from 'lucide-react';
import ClientMap from '@/components/ClientMap';

const flights = [
  {
    id: 'FL001',
    aircraft: 'Boeing 737-800',
    registration: 'N12345',
    status: 'In Flight',
    departure: 'LAX',
    arrival: 'JFK',
    altitude: '35,000 ft',
    speed: '450 kts',
    eta: '2h 30m',
    alerts: [],
  },
  {
    id: 'FL002',
    aircraft: 'Airbus A320',
    registration: 'N67890',
    status: 'On Ground',
    departure: 'ORD',
    arrival: 'MIA',
    altitude: '0 ft',
    speed: '0 kts',
    eta: '3h 15m',
    alerts: ['Maintenance Required'],
  },
  // Add more sample flights...
];

export default function AircraftTrackingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Aircraft Tracking</h2>
        <div className="flex items-center space-x-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Aircraft</SelectItem>
              <SelectItem value="in-flight">In Flight</SelectItem>
              <SelectItem value="ground">On Ground</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
          <Button>Refresh Data</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Aircraft Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] w-full">
              <ClientMap />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flight Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Flight</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead>Alerts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flights.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Plane className="h-4 w-4 mr-2" />
                        <div>
                          <div className="font-medium">{flight.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {flight.aircraft} ({flight.registration})
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {flight.status === 'In Flight' ? (
                          <MapPin className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                        )}
                        <span>{flight.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>{flight.eta}</TableCell>
                    <TableCell>
                      {flight.alerts.length > 0 ? (
                        <div className="flex items-center text-red-500">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>{flight.alerts.join(', ')}</span>
                        </div>
                      ) : (
                        <span className="text-green-500">No Alerts</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 