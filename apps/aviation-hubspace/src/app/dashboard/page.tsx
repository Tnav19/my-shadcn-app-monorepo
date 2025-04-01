'use client';

import { aviationApi, Flight } from '@/services/aviationApi';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Clock,
  Plane,
  RefreshCw
} from 'lucide-react';
import { useEffect, useState } from 'react';

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500',
  delayed: 'bg-yellow-500',
  diverted: 'bg-orange-500',
  incident: 'bg-red-500',
  scheduled: 'bg-blue-500',
  cancelled: 'bg-red-500',
  completed: 'bg-green-500',
  landed: 'bg-purple-500'
};

export default function DashboardPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const activeFlights = await aviationApi.getActiveFlights();
      setFlights(activeFlights);
      setError(null);
    } catch (err) {
      setError('Failed to fetch flight data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Calculate statistics
  const activeFlights = flights.filter(flight => flight.status === 'active');
  const delayedFlights = flights.filter(flight => flight.status === 'delayed');
  const divertedFlights = flights.filter(flight => flight.status === 'diverted');
  const incidentFlights = flights.filter(flight => flight.status === 'incident');

  // Get recent flights (last 24 hours)
  const recentFlights = flights.filter(flight => {
    const flightDate = new Date(flight.departure.scheduled);
    const now = new Date();
    return now.getTime() - flightDate.getTime() <= 24 * 60 * 60 * 1000;
  });

  // Get alerts
  const alerts = [
    ...delayedFlights.map(flight => ({
      type: 'delay',
      message: `Flight ${flight.flight_number} is delayed`,
      flight,
    })),
    ...divertedFlights.map(flight => ({
      type: 'diverted',
      message: `Flight ${flight.flight_number} has been diverted`,
      flight,
    })),
    ...incidentFlights.map(flight => ({
      type: 'incident',
      message: `Flight ${flight.flight_number} reported an incident`,
      flight,
    })),
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <Button onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Flights</CardTitle>
            <Plane className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeFlights.length}</div>
            <p className="text-xs text-muted-foreground">Currently in air</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed Flights</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{delayedFlights.length}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diverted Flights</CardTitle>
            <ArrowRight className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{divertedFlights.length}</div>
            <p className="text-xs text-muted-foreground">Route changes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incidentFlights.length}</div>
            <p className="text-xs text-muted-foreground">Critical issues</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Flights</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-pulse text-gray-500">Loading flights...</div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-32 text-red-500">
                    {error}
                  </div>
                ) : (
                  recentFlights.map((flight) => (
                    <div
                      key={flight.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[flight.status]}`} />
                        <div>
                          <div className="font-medium">
                            {flight.airline.name} - {flight.flight_number}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {flight.departure.airport} → {flight.arrival.airport}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {formatDate(flight.departure.scheduled)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {flight.aircraft_type}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {alerts.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    No active alerts
                  </div>
                ) : (
                  alerts.map((alert, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 border rounded-lg"
                    >
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium">{alert.message}</div>
                        <div className="text-sm text-muted-foreground">
                          {alert.flight.airline.name} - {alert.flight.flight_number}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatDate(alert.flight.departure.scheduled)}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          alert.type === 'delay'
                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            : alert.type === 'diverted'
                            ? 'bg-orange-50 text-orange-700 border-orange-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }
                      >
                        {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 