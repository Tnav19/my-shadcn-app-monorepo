'use client';

import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  FileText,
  FilePieChart,
  FileSpreadsheet,
  Filter,
  Plus,
  Search
} from 'lucide-react';
import { useState } from 'react';

interface Report {
  id: string;
  name: string;
  type: 'financial' | 'operational' | 'customer' | 'technical';
  format: 'pdf' | 'excel' | 'csv';
  status: 'completed' | 'processing' | 'failed';
  generatedAt: string;
  period: {
    start: string;
    end: string;
  };
  size: number;
  downloadUrl: string;
  parameters: {
    key: string;
    value: string;
  }[];
}

const REPORTS: Report[] = [
  {
    id: '1',
    name: 'Monthly Financial Summary',
    type: 'financial',
    format: 'pdf',
    status: 'completed',
    generatedAt: '2024-03-15T10:30:00Z',
    period: {
      start: '2024-03-01',
      end: '2024-03-31'
    },
    size: 2.5,
    downloadUrl: '/reports/financial-summary-march.pdf',
    parameters: [
      { key: 'period', value: 'March 2024' },
      { key: 'includeCharts', value: 'true' }
    ]
  },
  {
    id: '2',
    name: 'Operational Performance Report',
    type: 'operational',
    format: 'excel',
    status: 'processing',
    generatedAt: '2024-03-15T11:00:00Z',
    period: {
      start: '2024-03-01',
      end: '2024-03-15'
    },
    size: 0,
    downloadUrl: '',
    parameters: [
      { key: 'metrics', value: 'on-time,delays,cancellations' },
      { key: 'fleet', value: 'all' }
    ]
  },
  {
    id: '3',
    name: 'Customer Satisfaction Analysis',
    type: 'customer',
    format: 'csv',
    status: 'failed',
    generatedAt: '2024-03-15T09:15:00Z',
    period: {
      start: '2024-02-01',
      end: '2024-02-29'
    },
    size: 0,
    downloadUrl: '',
    parameters: [
      { key: 'surveyType', value: 'post-flight' },
      { key: 'ratingThreshold', value: '3' }
    ]
  }
];

const TYPE_COLORS = {
  financial: 'bg-green-500',
  operational: 'bg-blue-500',
  customer: 'bg-purple-500',
  technical: 'bg-orange-500'
};

const FORMAT_ICONS = {
  pdf: FileText,
  excel: FileSpreadsheet,
  csv: FilePieChart
};

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = REPORTS.filter(report =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{REPORTS.length}</div>
            <p className="text-xs text-muted-foreground">Generated reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {REPORTS.filter(report => report.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">Ready to download</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <FileText className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {REPORTS.filter(report => report.status === 'processing').length}
            </div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <FileText className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {REPORTS.filter(report => report.status === 'failed').length}
            </div>
            <p className="text-xs text-muted-foreground">Error occurred</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reports List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
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
              {filteredReports.map((report) => {
                const FormatIcon = FORMAT_ICONS[report.format];
                return (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${TYPE_COLORS[report.type]}`} />
                      <div>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.type.charAt(0).toUpperCase() + report.type.slice(1)} • {report.format.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {new Date(report.generatedAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {report.size > 0 ? `${report.size} MB` : 'N/A'}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <FormatIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
} 