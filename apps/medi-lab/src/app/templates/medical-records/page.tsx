"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/table";
import { Badge } from "@repo/ui/components/badge";
import { FileText, Search, Download, Eye } from "lucide-react";

export default function MedicalRecordsTemplate() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Medical Records</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search records..." className="pl-8" />
          </div>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Record
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
          <TabsTrigger value="procedures">Procedures</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Complete Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      <TableCell>March {i}, 2024</TableCell>
                      <TableCell>
                        <Badge variant={i % 2 === 0 ? "default" : "secondary"}>
                          {i % 2 === 0 ? "Diagnosis" : "Procedure"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {i % 2 === 0 
                          ? "Upper Respiratory Infection"
                          : "Blood Test - Complete Blood Count"}
                      </TableCell>
                      <TableCell>Dr. Smith</TableCell>
                      <TableCell>
                        <Badge variant="outline">Completed</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagnoses">
          <Card>
            <CardHeader>
              <CardTitle>Diagnosis History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Upper Respiratory Infection</h4>
                      <p className="text-sm text-muted-foreground">
                        Diagnosed by Dr. Smith on March {i}, 2024
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">View Details</Button>
                      <Button variant="outline">Download Report</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procedures">
          <Card>
            <CardHeader>
              <CardTitle>Medical Procedures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Blood Test - Complete Blood Count</h4>
                      <p className="text-sm text-muted-foreground">
                        Performed by Dr. Wilson on March {i}, 2024
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">View Results</Button>
                      <Button variant="outline">Download Report</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Medication History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Amoxicillin</h4>
                      <p className="text-sm text-muted-foreground">
                        Prescribed by Dr. Jones on March {i}, 2024
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">View Prescription</Button>
                      <Button variant="outline">Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 