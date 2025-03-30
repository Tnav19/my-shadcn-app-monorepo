'use client';

import {
  FilePieChart,
  FileSpreadsheet,
  FileText
} from 'lucide-react';

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

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'financial' | 'operational' | 'customer' | 'technical';
  format: 'pdf' | 'excel' | 'csv';
  parameters: {
    key: string;
    label: string;
    type: 'date' | 'select' | 'text' | 'number';
    options?: string[];
    required: boolean;
  }[];
  lastUsed: string;
  isFavorite: boolean;
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

const TEMPLATES: ReportTemplate[] = [
  {
    id: '1',
    name: 'Financial Performance Report',
    description: 'Comprehensive financial analysis including revenue, expenses, and profitability metrics',
    type: 'financial',
    format: 'pdf',
    parameters: [
      {
        key: 'period',
        label: 'Report Period',
        type: 'date',
        required: true
      },
      {
        key: 'includeCharts',
        label: 'Include Charts',
        type: 'select',
        options: ['true', 'false'],
        required: false
      }
    ],
    lastUsed: '2024-03-15T10:30:00Z',
    isFavorite: true
  },
  {
    id: '2',
    name: 'Operational Metrics Dashboard',
    description: 'Key operational performance indicators and trends',
    type: 'operational',
    format: 'excel',
    parameters: [
      {
        key: 'metrics',
        label: 'Metrics to Include',
        type: 'select',
        options: ['on-time', 'delays', 'cancellations', 'maintenance'],
        required: true
      },
      {
        key: 'fleet',
        label: 'Fleet Selection',
        type: 'select',
        options: ['all', 'narrow-body', 'wide-body'],
        required: true
      }
    ],
    lastUsed: '2024-03-15T11:00:00Z',
    isFavorite: false
  },
  {
    id: '3',
    name: 'Customer Feedback Analysis',
    description: 'Customer satisfaction metrics and feedback analysis',
    type: 'customer',
    format: 'csv',
    parameters: [
      {
        key: 'surveyType',
        label: 'Survey Type',
        type: 'select',
        options: ['post-flight', 'general', 'loyalty'],
        required: true
      },
      {
        key: 'ratingThreshold',
        label: 'Minimum Rating',
        type: 'number',
        required: false
      }
    ],
    lastUsed: '2024-03-15T09:15:00Z',
    isFavorite: true
  }
];

const TYPE_COLORS = {
  financial: 'bg-green-500',
  operational: 'bg-blue-500',
  customer: 'bg-purple-500',
  technical: 'bg-orange-500'
};

const STATUS_COLORS = {
  completed: 'bg-green-500',
  processing: 'bg-yellow-500',
  failed: 'bg-red-500'
};

const FORMAT_ICONS = {
  pdf: FileText,
  excel: FileSpreadsheet,
  csv: FilePieChart
}; 