'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Badge } from '@repo/ui/components/badge';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { 
  Activity, 
  Search, 
  Plus, 
  Filter, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Settings,
  Thermometer,
  Gauge,
  AlertTriangle,
  Heart
} from 'lucide-react';

interface HealthMetric {
  id: string;
  aircraftId: string;
  system: string;
  metric: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  timestamp: string;
  trend: 'up' | 'down' | 'stable';
}

interface Alert {
  id: string;
  aircraftId: string;
  type: 'system' | 'performance' | 'maintenance' | 'safety';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'acknowledged';
}

const HEALTH_METRICS: HealthMetric[] = [
  {
    id: '1',
    aircraftId: 'N12345',
    system: 'Engine',
    metric: 'Temperature',
    value: 850,
    unit: '°C',
    status: 'normal',
    timestamp: '2024-03-15T10:30:00',
    trend: 'stable'
  },
  {
    id: '2',
    aircraftId: 'N67890',
    system: 'Hydraulics',
    metric: 'Pressure',
    value: 2800,
    unit: 'PSI',
    status: 'warning',
    timestamp: '2024-03-15T10:30:00',
    trend: 'up'
  },
  {
    id: '3',
    aircraftId: 'N24680',
    system: 'APU',
    metric: 'Fuel Flow',
    value: 120,
    unit: 'kg/h',
    status: 'normal',
    timestamp: '2024-03-15T10:30:00',
    trend: 'down'
  }
];

const ALERTS: Alert[] = [
  {
    id: '1',
    aircraftId: 'N67890',
    type: 'system',
    severity: 'high',
    message: 'Hydraulic pressure exceeding normal range',
    timestamp: '2024-03-15T10:25:00',
    status: 'active'
  },
  {
    id: '2',
    aircraftId: 'N12345',
    type: 'maintenance',
    severity: 'medium',
    message: 'Engine oil level below recommended',
    timestamp: '2024-03-15T10:20:00',
    status: 'acknowledged'
  }
];

const STATUS_COLORS = {
  normal: 'bg-green-500',
  warning: 'bg-yellow-500',
  critical: 'bg-red-500'
};

const SEVERITY_COLORS = {
  low: 'bg-yellow-500',
  medium: 'bg-orange-500',
  high: 'bg-red-500'
};

export default function HealthMonitoringPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  const filteredMetrics = HEALTH_METRICS.filter(metric => {
    const matchesSearch = metric.aircraftId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         metric.system.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || metric.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredAlerts = ALERTS.filter(alert => {
    const matchesSearch = alert.aircraftId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = !selectedSeverity || alert.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  const activeAlerts = ALERTS.filter(alert => alert.status === 'active');
  const criticalMetrics = HEALTH_METRICS.filter(metric => metric.status === 'critical');
  const warningMetrics = HEALTH_METRICS.filter(metric => metric.status === 'warning');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Health Monitoring</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Alert
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlerts.length}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Metrics</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalMetrics.length}</div>
            <p className="text-xs text-muted-foreground">Immediate action needed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning Metrics</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warningMetrics.length}</div>
            <p className="text-xs text-muted-foreground">Monitor closely</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Systems</CardTitle>
            <Heart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Health Metrics</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search metrics..."
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
                {filteredMetrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[metric.status]}`} />
                      <div>
                        <div className="font-medium">{metric.system}</div>
                        <div className="text-sm text-muted-foreground">
                          {metric.metric} • {metric.aircraftId}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {metric.value} {metric.unit}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                        </div>
                      </div>
                      <Badge variant="outline" className={STATUS_COLORS[metric.status]}>
                        {metric.status}
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

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Alerts</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alerts..."
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
                {filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                  >
                    <div className="flex items-center space-x-4">
                      <AlertCircle className={`h-4 w-4 ${SEVERITY_COLORS[alert.severity]}`} />
                      <div>
                        <div className="font-medium">{alert.message}</div>
                        <div className="text-sm text-muted-foreground">
                          {alert.type} • {alert.aircraftId}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{alert.timestamp}</div>
                        <div className="text-xs text-muted-foreground">{alert.status}</div>
                      </div>
                      <Badge variant="outline" className={SEVERITY_COLORS[alert.severity]}>
                        {alert.severity}
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
    </div>
  );
} 