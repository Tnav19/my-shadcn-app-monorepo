'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { Button } from '@repo/ui/components/button';
import { Plane, Users, Package2, AlertTriangle, CheckCircle } from 'lucide-react';

const stats = [
  {
    name: 'Active Aircraft',
    value: '156',
    change: '+12%',
    trend: 'up',
    icon: Plane,
  },
  {
    name: 'Parts Inventory',
    value: '2,345',
    change: '+5%',
    trend: 'up',
    icon: Package2,
  },
  {
    name: 'Manufacturing Orders',
    value: '89',
    change: '-3%',
    trend: 'down',
    icon: Users,
  },
  {
    name: 'Sales Revenue',
    value: '$12.4M',
    change: '+8%',
    trend: 'up',
    icon: Package2,
  },
];

const alerts = [
  {
    id: 1,
    title: 'Maintenance Required',
    description: 'Aircraft A320-123 requires scheduled maintenance',
    severity: 'warning',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    title: 'Parts Order Delayed',
    description: 'Order #12345 delayed due to supplier issues',
    severity: 'warning',
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    title: 'Manufacturing Complete',
    description: 'Batch #789 completed successfully',
    severity: 'success',
    timestamp: '6 hours ago',
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'flight',
    description: 'Flight AA123 landed at JFK',
    timestamp: '10 minutes ago',
  },
  {
    id: 2,
    type: 'maintenance',
    description: 'Maintenance completed on B737-800',
    timestamp: '1 hour ago',
  },
  {
    id: 3,
    type: 'order',
    description: 'New parts order received',
    timestamp: '2 hours ago',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Generate Report</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Alerts */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start space-x-4 p-4 rounded-lg border"
                  >
                    {alert.severity === 'warning' ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {alert.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 rounded-lg border"
                  >
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                    <div>
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.timestamp}
                      </p>
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