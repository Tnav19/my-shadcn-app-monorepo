"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import {
    ChevronLeft,
    ChevronRight,
    MessageSquare,
    Star,
    Syringe,
    Users
} from "lucide-react";

export default function DashboardTemplate() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Daily overview</h2>
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">78</div>
                  <div className="text-sm text-gray-500">patients</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Star className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-gray-500">reviews</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <MessageSquare className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">13</div>
                  <div className="text-sm text-gray-500">appointments</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Syringe className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm text-gray-500">surgery</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-6">
        {/* Schedule Section */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Schedule</h2>
          <div className="space-y-6">
            <div className="flex gap-4 text-sm text-gray-500">
              {["08:00", "09:00", "10:00", "11:00", "12:0", "13:0", "14:00"].map((time) => (
                <div key={time} className="flex-1">{time}</div>
              ))}
            </div>
            {["Maria", "Patrick", "Norris"].map((name) => (
              <div key={name} className="flex items-center gap-4">
                <div className="w-24 font-medium">{name}</div>
                <div className="flex-1 grid grid-cols-7 gap-2">
                  <div className="bg-blue-100 text-blue-700 rounded px-2 py-1">Appointment</div>
                  <div className="bg-pink-100 text-pink-700 rounded px-2 py-1 col-span-2">Patient Examination</div>
                  <div className="col-span-2" />
                  <div className="bg-pink-100 text-pink-700 rounded px-2 py-1 col-span-2">Patient Examination</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Upcoming Appointments</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-4">Name</th>
                <th className="pb-4">Diagnosis</th>
                <th className="pb-4">Date and time</th>
                <th className="pb-4">Notes</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="py-2">Emilia Fox</td>
                <td>Eczema</td>
                <td>29/06/2023, 08:00</td>
                <td></td>
              </tr>
              <tr>
                <td className="py-2">Ingrid Donald</td>
                <td>Flu</td>
                <td>29/06/2023, 09:00</td>
                <td></td>
              </tr>
              <tr>
                <td className="py-2">Barry Dove</td>
                <td>-</td>
                <td>29/06/2023, 09:20</td>
                <td>First appointment</td>
              </tr>
              <tr>
                <td className="py-2">Daniel Howell</td>
                <td>Depression</td>
                <td>29/06/2023, 08:00</td>
                <td>Pill prescription</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Calendar and Notifications */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">June 2023</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                  <div key={day} className="py-2 text-gray-500">{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant="ghost"
                    className="aspect-square p-0"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Notification</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <MessageSquare className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="font-medium">You have 38</p>
                    <p className="text-sm text-gray-500">appointment requests.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/doctor-avatar.png" />
                    <AvatarFallback>DK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Your vacation request</p>
                    <p className="text-sm text-gray-500">was denied.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/tom-avatar.png" />
                    <AvatarFallback>TD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Tom Daley cancelled</p>
                    <p className="text-sm text-gray-500">his appointment.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium">Someone wants to</p>
                    <p className="text-sm text-gray-500">become your patient.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
} 