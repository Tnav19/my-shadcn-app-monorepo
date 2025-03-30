"use client";

import { Avatar } from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";

// Mock data for staff schedule
const staffSchedule = [
  {
    name: "Boris Hahn",
    role: "Doctor",
    image: "/staff/boris-hahn.jpg",
    shift: { start: 11, end: 14 }
  },
  {
    name: "Dominic Proque",
    role: "Assistant",
    image: "/staff/dominic-proque.jpg",
    shift: { start: 12, end: 15 }
  },
  {
    name: "Lin Tran",
    role: "Doctor",
    image: "/staff/lin-tran.jpg",
    shift: { start: 12, end: 16 }
  },
  {
    name: "Alicia Munoz",
    role: "Doctor",
    image: "/staff/alicia-munoz.jpg",
    shift: { start: 13, end: 17 }
  },
  {
    name: "Sandra Brockmann",
    role: "Doctor",
    image: "/staff/sandra-brockmann.jpg",
    shift: { start: 10, end: 15 }
  },
  {
    name: "Lorenzo Santi",
    role: "Doctor",
    image: "/staff/lorenzo-santi.jpg",
    shift: { start: 11, end: 15 }
  },
  {
    name: "Philip Glass",
    role: "Assistant",
    image: "/staff/philip-glass.jpg",
    shift: { start: 12, end: 16 }
  },
  {
    name: "Michael Brompton",
    role: "Doctor",
    image: "/staff/michael-brompton.jpg",
    shift: { start: 13, end: 16 }
  }
];

const timeSlots = Array.from({ length: 8 }, (_, i) => i + 10); // 10:00 to 17:00

export default function StaffSchedulePage() {
  return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Staff schedule</h1>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus className="h-5 w-5 mr-2" />
            Add to schedule
          </Button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="p-2">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg">June, Friday 5th 2023</h2>
            <button className="p-2">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Emergency shift</h3>
        </div>

        <div className="relative">
          {/* Time slots header */}
          <div className="grid grid-cols-[200px_1fr] gap-4">
            <div></div>
            <div className="grid grid-cols-8 gap-4">
              {timeSlots.map((time) => (
                <div key={time} className="text-center text-slate-500">
                  {time}:00
                </div>
              ))}
            </div>
          </div>

          {/* Staff schedule rows */}
          <div className="mt-6 space-y-4">
            {staffSchedule.map((staff) => (
              <div key={staff.name} className="grid grid-cols-[200px_1fr] gap-4 items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <Image
                      src={staff.image}
                      alt={staff.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </Avatar>
                  <div>
                    <p className="font-medium">{staff.name}</p>
                    <p className="text-sm text-slate-500">{staff.role}</p>
                  </div>
                </div>
                <div className="relative h-12">
                  <div
                    className={`absolute h-full rounded-lg ${
                      staff.role === "Doctor" ? "bg-red-100" : "bg-yellow-100"
                    }`}
                    style={{
                      left: `${((staff.shift.start - 10) / 8) * 100}%`,
                      width: `${((staff.shift.end - staff.shift.start) / 8) * 100}%`
                    }}
                  >
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                      <button className="px-2 py-1 text-xs rounded border border-slate-200 bg-white">
                        Edit
                      </button>
                      <button className="px-2 py-1 text-xs rounded border border-slate-200 bg-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vertical time guides */}
          <div className="absolute top-0 left-[200px] right-0 h-full grid grid-cols-8 gap-4 -z-10">
            {timeSlots.map((time) => (
              <div key={time} className="h-full border-l border-slate-200"></div>
            ))}
          </div>
        </div>
      </div>
  );
} 