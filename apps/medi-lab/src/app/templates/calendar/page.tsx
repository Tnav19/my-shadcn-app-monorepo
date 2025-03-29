"use client";

import DashboardLayout from "../components/DashboardLayout";
import { Button } from "@repo/ui/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { ChevronLeft, ChevronRight, Plus, LayoutGrid, List, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@repo/ui/components/checkbox";

export default function CalendarPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Sample appointment data with ID codes
  const appointments = [
    {
      id: "K8L5ZOI7F2",
      date: "8",
      time: "11:00",
      patient: "Millie Simons",
      fullDate: "8/6/2023",
      avatars: ["/avatars/millie.png", "/avatars/doctor.png"]
    },
    {
      id: "D3X9Y2A6R1",
      date: "12",
      time: "09:00",
      patient: "Betty Haise",
      fullDate: "13/6/2023",
      avatars: ["/avatars/betty.png", "/avatars/doctor2.png"]
    },
    {
      id: "G5N2M1U9V4",
      date: "15",
      time: "08:00",
      patient: "Penny Minister",
      fullDate: "16/6/2023",
      avatars: ["/avatars/penny.png", "/avatars/doctor.png"]
    },
    {
      id: "J2T1W4K3P0",
      date: "21",
      time: "11:00",
      patient: "Mark Brent",
      fullDate: "21/6/2023",
      avatars: ["/avatars/mark.png", "/avatars/doctor4.png"]
    },
    {
      id: "R9O4E2L1D7",
      date: "23",
      time: "15:00",
      patient: "Petra Collins",
      fullDate: "23/6/2023",
      avatars: ["/avatars/petra.png", "/avatars/doctor3.png"]
    },
    {
      id: "S6C5V3B9H2",
      date: "26",
      time: "07:00",
      patient: "John Pope",
      fullDate: "26/6/2023",
      avatars: ["/avatars/john.png", "/avatars/doctor5.png"]
    }
  ];

  return (
    <DashboardLayout>
      <div>
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <div className="flex items-center gap-4">
            <Button variant="default" className="gap-2">
              <Plus className="h-4 w-4" />
              New appointment
            </Button>
            <div className="flex gap-2 border rounded-lg p-1">
              <Button 
                variant={view === 'grid' ? 'default' : 'ghost'} 
                size="icon"
                onClick={() => setView('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button 
                variant={view === 'list' ? 'default' : 'ghost'} 
                size="icon"
                onClick={() => setView('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">June</h2>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {view === 'grid' ? (
            <div className="bg-white rounded-lg p-6">
              <div className="grid grid-cols-5 gap-4">
                {/* Header */}
                <div className="text-sm text-gray-500 font-medium">Monday</div>
                <div className="text-sm text-gray-500 font-medium">Tuesday</div>
                <div className="text-sm text-gray-500 font-medium">Wednesday</div>
                <div className="text-sm text-gray-500 font-medium">Thursday</div>
                <div className="text-sm text-gray-500 font-medium">Friday</div>

                {/* Calendar Grid */}
                {Array.from({ length: 25 }, (_, i) => {
                  const day = i + 1;
                  const appointment = appointments.find(a => a.date === day.toString());
                  
                  return (
                    <div
                      key={i}
                      className="min-h-[120px] p-2 border rounded-lg relative"
                    >
                      <span className="text-sm">{day}</span>
                      {appointment && (
                        <div className="mt-2 bg-blue-50 p-2 rounded-lg">
                          <div className="text-xs text-gray-500">{appointment.time}</div>
                          <div className="text-sm font-medium">{appointment.patient}</div>
                          <div className="flex -space-x-2 mt-2">
                            {appointment.avatars.map((avatar, index) => (
                              <Avatar key={index} className="h-6 w-6 border-2 border-white">
                                <AvatarImage src={avatar} />
                                <AvatarFallback>
                                  {appointment.patient.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left w-8">
                      <Checkbox />
                    </th>
                    <th className="p-4 text-left text-sm text-gray-500 font-medium">ID Code</th>
                    <th className="p-4 text-left text-sm text-gray-500 font-medium">Name</th>
                    <th className="p-4 text-left text-sm text-gray-500 font-medium">Date/Time</th>
                    <th className="p-4 text-left text-sm text-gray-500 font-medium">Notes</th>
                    <th className="p-4 text-left text-sm text-gray-500 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b">
                      <td className="p-4">
                        <Checkbox />
                      </td>
                      <td className="p-4 font-medium">{appointment.id}</td>
                      <td className="p-4">{appointment.patient}</td>
                      <td className="p-4">{appointment.fullDate}, {appointment.time}</td>
                      <td className="p-4"></td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 