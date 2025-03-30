'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  AlertTriangle,
  ChevronRight,
  Clock,
  MapPin,
  Plane,
  Search,
  RefreshCw,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import the ClientMap component with no SSR
const ClientMap = dynamic(() => import('@/components/ClientMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading map...</div>
    </div>
  ),
});

// Mock data for aircraft
const aircraft = [
  {
    id: 'AA123',
    type: 'Boeing 737-800',
    status: 'in-flight',
    altitude: '35,000 ft',
    speed: '450 knots',
    location: 'New York, USA',
    destination: 'London, UK',
    eta: '2h 30m',
    alerts: [],
  },
  {
    id: 'BA456',
    type: 'Airbus A320',
    status: 'in-flight',
    altitude: '33,000 ft',
    speed: '440 knots',
    location: 'London Heathrow',
    destination: 'Paris, France',
    eta: '45m',
    alerts: [],
  },
  {
    id: 'AF789',
    type: 'Boeing 777-300ER',
    status: 'in-flight',
    altitude: '38,000 ft',
    speed: '480 knots',
    location: 'Paris, France',
    destination: 'Dubai, UAE',
    eta: '5h 45m',
    alerts: ['Minor turbulence reported'],
  },
];

export default function TrackingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAircraft, setSelectedAircraft] = useState(aircraft[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredAircraft = aircraft.filter((a) =>
    a.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <motion.h1 
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Aircraft Tracking
        </motion.h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search aircraft..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleRefresh} className="relative">
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Aircraft List */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Aircraft Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <AnimatePresence>
                <div className="space-y-2">
                  {filteredAircraft.map((a) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedAircraft.id === a.id
                          ? 'bg-primary/5 border-primary/20 shadow-lg'
                          : 'hover:bg-gray-50 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedAircraft(a)}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div
                          animate={{
                            rotate: a.status === 'in-flight' ? 360 : 0,
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Plane
                            className={`h-6 w-6 ${
                              a.status === 'in-flight'
                                ? 'text-primary'
                                : 'text-yellow-500'
                            }`}
                          />
                        </motion.div>
                        <div>
                          <h3 className="font-medium">{a.id}</h3>
                          <p className="text-sm text-gray-500">{a.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={a.status === 'in-flight' ? 'default' : 'secondary'}
                          className="animate-pulse"
                        >
                          {a.status}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Map and Details */}
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Flight Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Map */}
              <div className="h-[400px] rounded-lg overflow-hidden">
                <ClientMap 
                  selectedAircraftId={selectedAircraft.id}
                  onAircraftClick={(id) => {
                    const aircraft = filteredAircraft.find(a => a.id === id);
                    if (aircraft) setSelectedAircraft(aircraft);
                  }}
                />
              </div>

              {/* Flight Details */}
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Current Location</p>
                      <p className="font-medium">{selectedAircraft.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Plane className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Altitude</p>
                      <p className="font-medium">{selectedAircraft.altitude}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Speed</p>
                      <p className="font-medium">{selectedAircraft.speed}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Destination</p>
                    <p className="font-medium">{selectedAircraft.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ETA</p>
                    <p className="font-medium">{selectedAircraft.eta}</p>
                  </div>
                </div>
              </motion.div>

              {/* Alerts */}
              <AnimatePresence>
                {selectedAircraft.alerts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <h3 className="font-medium">Active Alerts</h3>
                    <div className="space-y-2">
                      {selectedAircraft.alerts.map((alert, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-start space-x-2 p-3 rounded-lg bg-yellow-50 border border-yellow-200"
                        >
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 animate-pulse" />
                          <p className="text-sm text-yellow-800">{alert}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 