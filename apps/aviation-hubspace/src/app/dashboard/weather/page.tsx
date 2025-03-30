'use client';

import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Droplets,
  Eye,
  Filter,
  MapPin,
  RefreshCw,
  Search,
  Sun,
  Thermometer,
  Wind
} from 'lucide-react';
import { useState } from 'react';

interface WeatherCondition {
  id: string;
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  pressure: number;
  condition: 'clear' | 'partly-cloudy' | 'cloudy' | 'rain' | 'storm' | 'snow';
  description: string;
  alerts: {
    type: 'warning' | 'advisory' | 'watch';
    message: string;
    issuedAt: string;
  }[];
  forecast: {
    date: string;
    temperature: {
      min: number;
      max: number;
    };
    condition: 'clear' | 'partly-cloudy' | 'cloudy' | 'rain' | 'storm' | 'snow';
    description: string;
  }[];
}

const WEATHER_CONDITIONS: WeatherCondition[] = [
  {
    id: '1',
    location: 'New York (JFK)',
    temperature: 72,
    feelsLike: 75,
    humidity: 65,
    windSpeed: 12,
    windDirection: 'NE',
    visibility: 10,
    pressure: 1015,
    condition: 'partly-cloudy',
    description: 'Partly cloudy with light winds',
    alerts: [
      {
        type: 'advisory',
        message: 'Light rain expected in the evening',
        issuedAt: '2024-03-15T10:00:00Z'
      }
    ],
    forecast: [
      {
        date: '2024-03-15',
        temperature: {
          min: 68,
          max: 75
        },
        condition: 'partly-cloudy',
        description: 'Partly cloudy with light winds'
      },
      {
        date: '2024-03-16',
        temperature: {
          min: 65,
          max: 72
        },
        condition: 'rain',
        description: 'Light rain expected'
      }
    ]
  },
  {
    id: '2',
    location: 'Los Angeles (LAX)',
    temperature: 78,
    feelsLike: 80,
    humidity: 55,
    windSpeed: 8,
    windDirection: 'SW',
    visibility: 15,
    pressure: 1013,
    condition: 'clear',
    description: 'Clear skies with light winds',
    alerts: [],
    forecast: [
      {
        date: '2024-03-15',
        temperature: {
          min: 75,
          max: 82
        },
        condition: 'clear',
        description: 'Clear skies with light winds'
      },
      {
        date: '2024-03-16',
        temperature: {
          min: 72,
          max: 79
        },
        condition: 'partly-cloudy',
        description: 'Partly cloudy with light winds'
      }
    ]
  },
  {
    id: '3',
    location: 'Chicago (ORD)',
    temperature: 68,
    feelsLike: 70,
    humidity: 70,
    windSpeed: 15,
    windDirection: 'NW',
    visibility: 8,
    pressure: 1014,
    condition: 'cloudy',
    description: 'Cloudy with moderate winds',
    alerts: [
      {
        type: 'warning',
        message: 'Thunderstorm warning in effect',
        issuedAt: '2024-03-15T09:30:00Z'
      }
    ],
    forecast: [
      {
        date: '2024-03-15',
        temperature: {
          min: 65,
          max: 72
        },
        condition: 'storm',
        description: 'Thunderstorms expected'
      },
      {
        date: '2024-03-16',
        temperature: {
          min: 62,
          max: 68
        },
        condition: 'rain',
        description: 'Light rain expected'
      }
    ]
  }
];

const CONDITION_ICONS = {
  clear: Sun,
  'partly-cloudy': Cloud,
  cloudy: Cloud,
  rain: CloudRain,
  storm: CloudLightning,
  snow: CloudSnow
};

const ALERT_COLORS = {
  warning: 'bg-red-500',
  advisory: 'bg-yellow-500',
  watch: 'bg-orange-500'
};

export default function WeatherPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const filteredConditions = WEATHER_CONDITIONS.filter(condition =>
    condition.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Weather</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <MapPin className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {filteredConditions.map((condition) => {
                  const ConditionIcon = CONDITION_ICONS[condition.condition];
                  return (
                    <div
                      key={condition.id}
                      className={`p-4 border rounded-lg hover:bg-accent cursor-pointer ${
                        selectedLocation === condition.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setSelectedLocation(condition.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <ConditionIcon className="h-8 w-8" />
                          <div>
                            <div className="font-medium">{condition.location}</div>
                            <div className="text-sm text-muted-foreground">
                              {condition.description}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {condition.temperature}°F
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Feels like {condition.feelsLike}°F
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Wind className="h-4 w-4" />
                          <span>{condition.windSpeed} mph {condition.windDirection}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Droplets className="h-4 w-4" />
                          <span>{condition.humidity}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4" />
                          <span>{condition.visibility} mi</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Thermometer className="h-4 w-4" />
                          <span>{condition.pressure} hPa</span>
                        </div>
                      </div>
                      {condition.alerts.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {condition.alerts.map((alert, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 text-sm"
                            >
                              <div className={`w-2 h-2 rounded-full ${ALERT_COLORS[alert.type]}`} />
                              <span>{alert.message}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedLocation ? (
              <div className="space-y-6">
                {WEATHER_CONDITIONS.find(c => c.id === selectedLocation)?.forecast.map((day, index) => {
                  const ConditionIcon = CONDITION_ICONS[day.condition];
                  return (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <ConditionIcon className="h-6 w-6" />
                        <div>
                          <div className="font-medium">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {day.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {day.temperature.max}°F / {day.temperature.min}°F
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[600px] text-muted-foreground">
                Select a location to view forecast
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 