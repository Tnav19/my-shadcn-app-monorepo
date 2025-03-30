"use client";

import { Button } from "@repo/ui/components/button";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PatientsPage() {
  // Sample patients data
  const patients = [
    {
      id: "A6S9T2D0P5",
      name: "Duncan Pitt",
      image: "/patients/duncan-pitt.jpg"
    },
    {
      id: "R4L7Y9C2E1",
      name: "Mary Weather",
      image: "/patients/mary-weather.jpg"
    },
    {
      id: "N3B8V1M4W7",
      name: "Matthew Abel",
      image: "/patients/matthew-abel.jpg"
    },
    {
      id: "L219K6T3C1",
      name: "Gill Hames",
      image: "/patients/gill-hames.jpg"
    },
    {
      id: "E1M7D4S9T0",
      name: "Finn McDonald",
      image: "/patients/finn-mcdonald.jpg"
    },
    {
      id: "U0H5V2N4Y9",
      name: "Donna Summer",
      image: "/patients/donna-summer.jpg"
    }
  ];

  return (
      <div>
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Patients directory</h1>
          <Button variant="default" className="gap-2">
            <Plus className="h-4 w-4" />
            Add new patient
          </Button>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <div key={patient.id} className="bg-white p-6 rounded-lg border">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
                    <Image
                      src={patient.image}
                      alt={patient.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{patient.name}</h3>
                  <p className="text-sm text-gray-500">{patient.id}</p>
                </div>
                <div className="flex justify-center gap-2">
                  <Link href={`/templates/patients/${patient.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
} 