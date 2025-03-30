'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import {
  FileCheck,
  FileClock,
  FileWarning,
  Filter,
  History,
  Search,
  Settings,
  Upload
} from 'lucide-react';
import { useState } from 'react';

interface Document {
  id: string;
  title: string;
  type: 'manual' | 'certificate' | 'report' | 'procedure' | 'compliance';
  status: 'active' | 'pending' | 'expired' | 'archived';
  category: 'operations' | 'maintenance' | 'safety' | 'training' | 'regulatory';
  lastUpdated: string;
  updatedBy: string;
  expiryDate?: string;
  versions: {
    version: string;
    date: string;
    updatedBy: string;
    changes: string[];
  }[];
  approvers: string[];
  comments: {
    id: string;
    user: string;
    date: string;
    text: string;
  }[];
}

const DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Aircraft Maintenance Manual',
    type: 'manual',
    status: 'active',
    category: 'maintenance',
    lastUpdated: '2024-03-15',
    updatedBy: 'John Smith',
    versions: [
      {
        version: '3.2',
        date: '2024-03-15',
        updatedBy: 'John Smith',
        changes: ['Updated maintenance procedures', 'Added new safety protocols']
      },
      {
        version: '3.1',
        date: '2024-02-20',
        updatedBy: 'Sarah Johnson',
        changes: ['Revised inspection checklist']
      }
    ],
    approvers: ['John Smith', 'Sarah Johnson'],
    comments: [
      {
        id: '1',
        user: 'Michael Brown',
        date: '2024-03-15',
        text: 'Please review the new safety protocols'
      }
    ]
  },
  {
    id: '2',
    title: 'Air Operator Certificate',
    type: 'certificate',
    status: 'pending',
    category: 'regulatory',
    lastUpdated: '2024-03-10',
    updatedBy: 'Admin',
    expiryDate: '2024-12-31',
    versions: [
      {
        version: '2.0',
        date: '2024-03-10',
        updatedBy: 'Admin',
        changes: ['Updated regulatory requirements']
      }
    ],
    approvers: ['Admin', 'Regulatory Officer'],
    comments: [
      {
        id: '2',
        user: 'Regulatory Officer',
        date: '2024-03-10',
        text: 'Pending final approval'
      }
    ]
  },
  {
    id: '3',
    title: 'Safety Management System',
    type: 'procedure',
    status: 'active',
    category: 'safety',
    lastUpdated: '2024-03-01',
    updatedBy: 'Safety Officer',
    versions: [
      {
        version: '1.5',
        date: '2024-03-01',
        updatedBy: 'Safety Officer',
        changes: ['Enhanced risk assessment procedures']
      }
    ],
    approvers: ['Safety Officer', 'Operations Manager'],
    comments: []
  }
];

const STATUS_COLORS = {
  active: 'bg-green-500',
  pending: 'bg-yellow-500',
  expired: 'bg-red-500',
  archived: 'bg-gray-500'
};

const TYPE_COLORS = {
  manual: 'bg-blue-500',
  certificate: 'bg-purple-500',
  report: 'bg-orange-500',
  procedure: 'bg-green-500',
  compliance: 'bg-red-500'
};

export default function DocumentManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredDocuments = DOCUMENTS.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || doc.type === selectedType;
    const matchesStatus = !selectedStatus || doc.status === selectedStatus;
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const activeDocuments = DOCUMENTS.filter(doc => doc.status === 'active');
  const pendingDocuments = DOCUMENTS.filter(doc => doc.status === 'pending');
  const expiredDocuments = DOCUMENTS.filter(doc => doc.status === 'expired');
  const totalVersions = DOCUMENTS.reduce((sum, doc) => sum + doc.versions.length, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Document Management</h1>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Documents</CardTitle>
            <FileCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDocuments.length}</div>
            <p className="text-xs text-muted-foreground">Currently valid</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <FileWarning className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingDocuments.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Documents</CardTitle>
            <FileClock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiredDocuments.length}</div>
            <p className="text-xs text-muted-foreground">Needs renewal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Versions</CardTitle>
            <History className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVersions}</div>
            <p className="text-xs text-muted-foreground">Document revisions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Document List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
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
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${TYPE_COLORS[doc.type]}`} />
                    <div>
                      <div className="font-medium">{doc.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {doc.category} • Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        Version {doc.versions[0].version}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {doc.approvers.length} approvers
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={STATUS_COLORS[doc.status]}>
                        {doc.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
} 