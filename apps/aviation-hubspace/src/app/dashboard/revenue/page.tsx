'use client';

import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  DollarSign,
  Filter,
  Percent,
  Search,
  Settings,
  TrendingUp,
  Users
} from 'lucide-react';
import { useState } from 'react';

interface RevenueStream {
  id: string;
  name: string;
  category: 'passenger' | 'cargo' | 'ancillary' | 'maintenance' | 'other';
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  growth: number;
  forecast: number;
  lastUpdated: string;
}

interface FinancialMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target: number;
  status: 'on-track' | 'below-target' | 'above-target';
}

const REVENUE_STREAMS: RevenueStream[] = [
  {
    id: '1',
    name: 'Passenger Revenue',
    category: 'passenger',
    amount: 2500000,
    percentage: 65,
    trend: 'up',
    growth: 12.5,
    forecast: 2800000,
    lastUpdated: '2024-03-17'
  },
  {
    id: '2',
    name: 'Cargo Services',
    category: 'cargo',
    amount: 800000,
    percentage: 20,
    trend: 'up',
    growth: 8.3,
    forecast: 850000,
    lastUpdated: '2024-03-17'
  },
  {
    id: '3',
    name: 'Ancillary Services',
    category: 'ancillary',
    amount: 400000,
    percentage: 10,
    trend: 'stable',
    growth: 2.1,
    forecast: 410000,
    lastUpdated: '2024-03-17'
  },
  {
    id: '4',
    name: 'Maintenance Services',
    category: 'maintenance',
    amount: 150000,
    percentage: 4,
    trend: 'down',
    growth: -3.2,
    forecast: 145000,
    lastUpdated: '2024-03-17'
  },
  {
    id: '5',
    name: 'Other Revenue',
    category: 'other',
    amount: 50000,
    percentage: 1,
    trend: 'stable',
    growth: 0.5,
    forecast: 50000,
    lastUpdated: '2024-03-17'
  }
];

const FINANCIAL_METRICS: FinancialMetric[] = [
  {
    id: '1',
    name: 'Total Revenue',
    value: 3900000,
    previousValue: 3500000,
    change: 11.4,
    trend: 'up',
    target: 4000000,
    status: 'on-track'
  },
  {
    id: '2',
    name: 'Operating Margin',
    value: 28.5,
    previousValue: 25.2,
    change: 3.3,
    trend: 'up',
    target: 30,
    status: 'below-target'
  },
  {
    id: '3',
    name: 'Load Factor',
    value: 85.2,
    previousValue: 82.8,
    change: 2.4,
    trend: 'up',
    target: 88,
    status: 'below-target'
  },
  {
    id: '4',
    name: 'Average Fare',
    value: 450,
    previousValue: 420,
    change: 7.1,
    trend: 'up',
    target: 460,
    status: 'on-track'
  }
];

const CATEGORY_COLORS = {
  passenger: 'bg-blue-500',
  cargo: 'bg-green-500',
  ancillary: 'bg-purple-500',
  maintenance: 'bg-orange-500',
  other: 'bg-gray-500'
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

export default function RevenuePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);

  const filteredStreams = REVENUE_STREAMS.filter(stream => {
    const matchesSearch = stream.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || stream.category === selectedCategory;
    const matchesTrend = !selectedTrend || stream.trend === selectedTrend;
    return matchesSearch && matchesCategory && matchesTrend;
  });

  const totalRevenue = REVENUE_STREAMS.reduce((sum, stream) => sum + stream.amount, 0);
  const totalGrowth = REVENUE_STREAMS.reduce((sum, stream) => sum + stream.growth, 0) / REVENUE_STREAMS.length;
  const totalForecast = REVENUE_STREAMS.reduce((sum, stream) => sum + stream.forecast, 0);
  const projectedGrowth = ((totalForecast - totalRevenue) / totalRevenue) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Revenue</h1>
        <Button>
          <DollarSign className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              {totalGrowth > 0 ? '+' : ''}{totalGrowth.toFixed(1)}% vs last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projected Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalForecast / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              {projectedGrowth > 0 ? '+' : ''}{projectedGrowth.toFixed(1)}% forecast
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operating Margin</CardTitle>
            <Percent className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.5%</div>
            <p className="text-xs text-muted-foreground">Target: 30%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Load Factor</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.2%</div>
            <p className="text-xs text-muted-foreground">Target: 88%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Streams</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search streams..."
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
                {filteredStreams.map((stream) => (
                  <div
                    key={stream.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[stream.category]}`} />
                      <div>
                        <div className="font-medium">{stream.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {stream.percentage}% of total revenue
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          ${(stream.amount / 1000).toFixed(1)}K
                        </div>
                        <div className={`text-xs ${TREND_COLORS[stream.trend]}`}>
                          {stream.growth > 0 ? '+' : ''}{stream.growth}% growth
                        </div>
                      </div>
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
            <CardTitle>Financial Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {FINANCIAL_METRICS.map((metric) => (
                  <div
                    key={metric.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                  >
                    <div>
                      <div className="font-medium">{metric.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Target: {metric.target}
                        {metric.name === 'Operating Margin' || metric.name === 'Load Factor' ? '%' : ''}
                        {metric.name === 'Total Revenue' ? 'M' : ''}
                        {metric.name === 'Average Fare' ? '$' : ''}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {metric.value}
                          {metric.name === 'Operating Margin' || metric.name === 'Load Factor' ? '%' : ''}
                          {metric.name === 'Total Revenue' ? 'M' : ''}
                          {metric.name === 'Average Fare' ? '$' : ''}
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
      </div>
    </div>
  );
} 