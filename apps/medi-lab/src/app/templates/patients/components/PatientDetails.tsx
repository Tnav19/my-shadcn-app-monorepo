"use client";

import { Heart, Activity, Droplets, Calendar, Clock, Footprints, Scale, Flame, CircleDot } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/app/templates/components/DashboardLayout";
import { Avatar } from "@repo/ui/components/avatar";
import { Card } from "@repo/ui/components/card";
import Image from "next/image";

interface PatientDetailsProps {
  patient: {
    name: string;
    image: string;
    sex: string;
    age: number;
    blood: string;
    lastCheckIn: string;
    department: string;
    patientNr: string;
    bodyInfo: {
      migraine: boolean;
      heartRate: string;
      cholesterol: string;
    };
    appointments: Array<{
      type: string;
      doctor: string;
      icon: "heart" | "allergy";
    }>;
    prescriptions: Array<{
      name: string;
      schedule: string;
    }>;
    stats: {
      sleep: { value: string; label: string };
      steps: { value: number; label: string };
      weight: { value: number; unit: string };
      burn: { value: number; unit: string };
      cycle: { value: string };
    };
    heartRateData: number[];
  };
}

export default function PatientDetails({ patient }: PatientDetailsProps) {
  const getAppointmentIcon = (type: string) => {
    switch (type) {
      case "heart":
        return <Heart className="h-4 w-4" />;
      case "allergy":
        return <Droplets className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Patient – {patient.name}</h1>

        {/* Patient Info Card */}
        <Card className="p-6 bg-slate-50 mb-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <Image
                src={patient.image}
                alt={patient.name}
                width={96}
                height={96}
                className="rounded-full"
              />
            </Avatar>
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-xl">Patient</h2>
                <h3 className="text-2xl font-bold">{patient.name}</h3>
              </div>
              <div className="grid grid-cols-3 gap-x-16 gap-y-4">
                <div>
                  <p className="text-slate-500">Sex:</p>
                  <p className="font-medium">{patient.sex}</p>
                </div>
                <div>
                  <p className="text-slate-500">Age:</p>
                  <p className="font-medium">{patient.age}</p>
                </div>
                <div>
                  <p className="text-slate-500">Blood:</p>
                  <p className="font-medium">{patient.blood}</p>
                </div>
                <div>
                  <p className="text-slate-500">Last check-in:</p>
                  <p className="font-medium">{patient.lastCheckIn}</p>
                </div>
                <div>
                  <p className="text-slate-500">Dept:</p>
                  <p className="font-medium">{patient.department}</p>
                </div>
                <div>
                  <p className="text-slate-500">Patient nr:</p>
                  <p className="font-medium">{patient.patientNr}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-[2fr_2fr_1fr] gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Appointment History */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Appointment history</h3>
              <div className="space-y-4">
                {patient.appointments.map((appointment) => (
                  <div key={appointment.type} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getAppointmentIcon(appointment.icon)}
                      </div>
                      <div>
                        <p className="font-medium">{appointment.type}</p>
                        <p className="text-sm text-slate-500">{appointment.doctor}</p>
                      </div>
                    </div>
                    <button className="text-blue-500">
                      <Calendar className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Prescription History */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Prescription history</h3>
              <div className="space-y-4">
                {patient.prescriptions.map((prescription) => (
                  <div key={prescription.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Droplets className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{prescription.name}</p>
                        <p className="text-sm text-slate-500">{prescription.schedule}</p>
                      </div>
                    </div>
                    <button className="text-blue-500">
                      <Calendar className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            {/* Body Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Body info</h3>
              <div className="relative">
                <div className="w-48 h-64 mx-auto relative">
                  <Image 
                    src="/body.png"
                    alt="Human body diagram"
                    fill
                    className="object-contain"
                  />
                  {patient.bodyInfo.migraine && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-white px-3 py-1 rounded-full shadow-md text-sm">
                        Migraine detected
                      </div>
                    </div>
                  )}
                  <div className="absolute top-16 left-1/2 -translate-x-1/2">
                    <div className="bg-white px-3 py-1 rounded-full shadow-md text-sm">
                      Heart rate normal
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <div className="bg-white px-3 py-1 rounded-full shadow-md text-sm">
                      Cholesterol rate low
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Heart Rate */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Heart rate</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patient.heartRateData.map(value => ({ value }))}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2196F3"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#2196F3" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            <StatCard
              icon={<Clock className="h-5 w-5" />}
              label="Sleep"
              value={patient.stats.sleep.value}
              subtext={patient.stats.sleep.label}
            />
            <StatCard
              icon={<Footprints className="h-5 w-5" />}
              label="Steps"
              value={`${patient.stats.steps.value.toLocaleString()}`}
              subtext={patient.stats.steps.label}
            />
            <StatCard
              icon={<Scale className="h-5 w-5" />}
              label="Weight"
              value={`${patient.stats.weight.value} ${patient.stats.weight.unit}`}
            />
            <StatCard
              icon={<Flame className="h-5 w-5" />}
              label="Burn"
              value={`${patient.stats.burn.value.toLocaleString()} ${patient.stats.burn.unit}`}
            />
            <StatCard
              icon={<CircleDot className="h-5 w-5" />}
              label="Cycle"
              value={patient.stats.cycle.value}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon, label, value, subtext }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-500">
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <div className="ml-12">
        <p className="font-semibold">{value}</p>
        {subtext && <p className="text-sm text-slate-500">{subtext}</p>}
      </div>
    </Card>
  );
} 