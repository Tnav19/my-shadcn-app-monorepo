'use client';

import { Airport, aviationApi, City, Route } from '@/services/aviationApi';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  Clock,
  Globe,
  MapPin,
  Plus,
  Search,
  Settings
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RoutesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [routes, setRoutes] = useState<Route[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [routesResponse, airportsResponse, citiesResponse] = await Promise.all([
          aviationApi.getRoutes(),
          aviationApi.getAirports(),
          aviationApi.getCities(),
        ]);
        setRoutes(routesResponse.data);
        setAirports(airportsResponse.data);
        setCities(citiesResponse.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch route data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  const filteredRoutes = routes.filter(route =>
    route.departure.airport.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.arrival.airport.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.airline.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCityInfo = (cityName: string) => {
    return cities.find(city => city.name === cityName);
  };

  const getAirportInfo = (iata: string) => {
    return airports.find(airport => airport.iata === iata);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Route Management</h1>
        <div className="flex items-center space-x-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Route
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Route List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search routes..."
                  className="pl-8 mb-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {loading ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="animate-pulse text-gray-500">Loading routes...</div>
                      </div>
                    ) : error ? (
                      <div className="flex items-center justify-center h-32 text-red-500">
                        {error}
                      </div>
                    ) : (
                      filteredRoutes.map((route) => {
                        const departureCity = getCityInfo(route.departure.city);
                        const arrivalCity = getCityInfo(route.arrival.city);
                        const departureAirport = getAirportInfo(route.departure.iata);
                        const arrivalAirport = getAirportInfo(route.arrival.iata);

                        return (
                          <div
                            key={route.id}
                            className={`p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                              selectedRoute?.id === route.id ? 'bg-accent border-primary' : ''
                            }`}
                            onClick={() => setSelectedRoute(route)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">
                                  {route.departure.airport} → {route.arrival.airport}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {route.airline.name} ({route.airline.iata})
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{route.aircraft_type}</Badge>
                              </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>
                                  {route.departure.city}, {route.departure.country} → {route.arrival.city}, {route.arrival.country}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Globe className="h-4 w-4" />
                                <span>{route.distance} km</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>{route.duration}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Settings className="h-4 w-4" />
                                <span>{route.aircraft_type}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {selectedRoute && (
            <Card>
              <CardHeader>
                <CardTitle>Route Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Airline Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Name</span>
                        <span>{selectedRoute.airline.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>IATA Code</span>
                        <span>{selectedRoute.airline.iata}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>ICAO Code</span>
                        <span>{selectedRoute.airline.icao}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Route Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Distance</span>
                        <span>{selectedRoute.distance} km</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Duration</span>
                        <span>{selectedRoute.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Aircraft Type</span>
                        <span>{selectedRoute.aircraft_type}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Departure</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Airport</span>
                        <span>{selectedRoute.departure.airport}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>City</span>
                        <span>{selectedRoute.departure.city}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Country</span>
                        <span>{selectedRoute.departure.country}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Arrival</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Airport</span>
                        <span>{selectedRoute.arrival.airport}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>City</span>
                        <span>{selectedRoute.arrival.city}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Country</span>
                        <span>{selectedRoute.arrival.country}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 