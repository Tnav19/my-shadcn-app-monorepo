'use client';

import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  BarChart3,
  Clock,
  Filter,
  Plane,
  Search,
  Users
} from 'lucide-react';
import { useState } from 'react';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target: number;
  status: 'on-track' | 'below-target' | 'above-target';
  data: {
    date: string;
    value: number;
  }[];
}

interface TrendAnalysis {
  id: string;
  name: string;
  category: 'operational' | 'financial' | 'customer' | 'technical';
  currentValue: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  forecast: number;
  confidence: number;
  data: {
    date: string;
    value: number;
    forecast: number;
  }[];
}

const PERFORMANCE_METRICS: PerformanceMetric[] = [
  {
    id: '1',
    name: 'On-Time Performance',
    value: 92.5,
    previousValue: 90.8,
    change: 1.7,
    trend: 'up',
    target: 95,
    status: 'below-target',
    data: [
      { date: '2024-03-01', value: 91.2 },
      { date: '2024-03-02', value: 92.1 },
      { date: '2024-03-03', value: 92.8 },
      { date: '2024-03-04', value: 92.5 }
    ]
  },
  {
    id: '2',
    name: 'Customer Satisfaction',
    value: 4.2,
    previousValue: 4.0,
    change: 0.2,
    trend: 'up',
    target: 4.5,
    status: 'below-target',
    data: [
      { date: '2024-03-01', value: 4.1 },
      { date: '2024-03-02', value: 4.2 },
      { date: '2024-03-03', value: 4.2 },
      { date: '2024-03-04', value: 4.2 }
    ]
  },
  {
    id: '3',
    name: 'Fuel Efficiency',
    value: 85.3,
    previousValue: 84.7,
    change: 0.6,
    trend: 'up',
    target: 87,
    status: 'below-target',
    data: [
      { date: '2024-03-01', value: 84.8 },
      { date: '2024-03-02', value: 85.1 },
      { date: '2024-03-03', value: 85.3 },
      { date: '2024-03-04', value: 85.3 }
    ]
  }
];

const TREND_ANALYSIS: TrendAnalysis[] = [
  {
    id: '1',
    name: 'Passenger Load Factor',
    category: 'operational',
    currentValue: 85.2,
    previousValue: 82.8,
    change: 2.4,
    trend: 'up',
    forecast: 87.5,
    confidence: 0.85,
    data: [
      { date: '2024-03-01', value: 83.5, forecast: 85.0 },
      { date: '2024-03-02', value: 84.2, forecast: 85.5 },
      { date: '2024-03-03', value: 84.8, forecast: 86.0 },
      { date: '2024-03-04', value: 85.2, forecast: 86.5 }
    ]
  },
  {
    id: '2',
    name: 'Revenue per Flight',
    category: 'financial',
    currentValue: 45000,
    previousValue: 42000,
    change: 7.1,
    trend: 'up',
    forecast: 48000,
    confidence: 0.90,
    data: [
      { date: '2024-03-01', value: 43000, forecast: 45000 },
      { date: '2024-03-02', value: 44000, forecast: 46000 },
      { date: '2024-03-03', value: 44500, forecast: 47000 },
      { date: '2024-03-04', value: 45000, forecast: 48000 }
    ]
  },
  {
    id: '3',
    name: 'Technical Reliability',
    category: 'technical',
    currentValue: 98.5,
    previousValue: 98.2,
    change: 0.3,
    trend: 'up',
    forecast: 98.8,
    confidence: 0.95,
    data: [
      { date: '2024-03-01', value: 98.3, forecast: 98.5 },
      { date: '2024-03-02', value: 98.4, forecast: 98.6 },
      { date: '2024-03-03', value: 98.5, forecast: 98.7 },
      { date: '2024-03-04', value: 98.5, forecast: 98.8 }
    ]
  }
];

const CATEGORY_COLORS = {
  operational: 'bg-blue-500',
  financial: 'bg-green-500',
  customer: 'bg-purple-500',
  technical: 'bg-orange-500'
};

const TREND_COLORS = {
  up: 'text-green-500',
  down: 'text-red-500',
  stable: 'text-yellow-500'
};

const STATUS_COLORS = {
  'on-track': 'bg-green-500',
  'below-target': 'bg-yellow-500',
  'above-target': 'bg-blue-500'
};

export default function AnalyticsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory] = useState<string | null>(null);
  const [selectedTrend] = useState<string | null>(null);

  const filteredMetrics = PERFORMANCE_METRICS.filter(metric => {
    const matchesSearch = metric.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrend = !selectedTrend || metric.trend === selectedTrend;
    return matchesSearch && matchesTrend;
  });

  const filteredTrends = TREND_ANALYSIS.filter(trend => {
    const matchesSearch = trend.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || trend.category === selectedCategory;
    const matchesTrend = !selectedTrend || trend.trend === selectedTrend;
    return matchesSearch && matchesCategory && matchesTrend;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <Button>
          <BarChart3 className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.5%</div>
            <p className="text-xs text-muted-foreground">Target: 95%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/5.0</div>
            <p className="text-xs text-muted-foreground">Target: 4.5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Efficiency</CardTitle>
            <Plane className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.3%</div>
            <p className="text-xs text-muted-foreground">Target: 87%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Performance Metrics</CardTitle>
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
                    <div>
                      <div className="font-medium">{metric.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Target: {metric.target}
                        {metric.name === 'On-Time Performance' || metric.name === 'Fuel Efficiency' ? '%' : ''}
                        {metric.name === 'Customer Satisfaction' ? '/5.0' : ''}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {metric.value}
                          {metric.name === 'On-Time Performance' || metric.name === 'Fuel Efficiency' ? '%' : ''}
                          {metric.name === 'Customer Satisfaction' ? '/5.0' : ''}
                        </div>
                        <div className={`text-xs ${TREND_COLORS[metric.trend]}`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}% change
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[metric.status]}`} />
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
              <CardTitle>Trend Analysis</CardTitle>
              <div className="flex items-center space-x-2">
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
                {filteredTrends.map((trend) => (
                  <div
                    key={trend.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[trend.category]}`} />
                      <div>
                        <div className="font-medium">{trend.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Forecast: {trend.forecast}
                          {trend.name === 'Passenger Load Factor' ? '%' : ''}
                          {trend.name === 'Revenue per Flight' ? '$' : ''}
                          {trend.name === 'Technical Reliability' ? '%' : ''}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {trend.currentValue}
                          {trend.name === 'Passenger Load Factor' ? '%' : ''}
                          {trend.name === 'Revenue per Flight' ? '$' : ''}
                          {trend.name === 'Technical Reliability' ? '%' : ''}
                        </div>
                        <div className={`text-xs ${TREND_COLORS[trend.trend]}`}>
                          {trend.change > 0 ? '+' : ''}{trend.change}% change
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round(trend.confidence * 100)}% confidence
                      </div>
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