"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Calendar, Mail, Phone, MapPin } from "lucide-react";

export default function PatientProfileTemplate() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card className="md:w-1/3">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">Patient ID: #12345</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">Active</Badge>
                <Badge variant="outline">Regular Patient</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:w-2/3">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Date of Birth: Jan 1, 1990</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>123 Medical Street, City</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="medical-history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="medical-history">Medical History</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="medical-history">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Blood Type</h4>
                    <p className="text-sm text-muted-foreground">O+</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Height</h4>
                    <p className="text-sm text-muted-foreground">180 cm</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Weight</h4>
                    <p className="text-sm text-muted-foreground">75 kg</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Allergies</h4>
                    <p className="text-sm text-muted-foreground">Penicillin</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">General Checkup</h4>
                      <p className="text-sm text-muted-foreground">Dr. Smith - March 15, 2024</p>
                    </div>
                    <Button variant="outline">View Details</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab-results">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Complete Blood Count</h4>
                      <p className="text-sm text-muted-foreground">March 10, 2024</p>
                    </div>
                    <Button variant="outline">Download</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Current Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Amoxicillin</h4>
                      <p className="text-sm text-muted-foreground">500mg - Twice daily</p>
                    </div>
                    <Button variant="outline">View Details</Button>
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