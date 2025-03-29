"use client";

import { notFound } from "next/navigation";
import PatientDetails from "../components/PatientDetails";
import { useParams } from "next/navigation";

// Mock data - replace with actual API call
const patientsData: Record<string, {
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
  stats: {
    sleep: { value: string; label: string };
    steps: { value: number; label: string };
    weight: { value: number; unit: string };
    burn: { value: number; unit: string };
    cycle: { value: string };
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
  heartRateData: number[];
}> = {
  "R4L7Y9C2E1": {
    name: "Mary Weather",
    image: "/patients/mary-weather.jpg",
    sex: "F",
    age: 3,
    blood: "O+",
    lastCheckIn: "Year ago",
    department: "Cardiology",
    patientNr: "R4L7Y9C2E1",
    bodyInfo: {
      migraine: true,
      heartRate: "normal",
      cholesterol: "low"
    },
    stats: {
      sleep: {
        value: "7h 30min",
        label: "avg."
      },
      steps: {
        value: 8901,
        label: "avg."
      },
      weight: {
        value: 63,
        unit: "kg"
      },
      burn: {
        value: 2000,
        unit: "kcal"
      },
      cycle: {
        value: "regular"
      }
    },
    appointments: [
      {
        type: "Histology test",
        doctor: "Dr. Dianne Cooper",
        icon: "heart"
      },
      {
        type: "Allergy test",
        doctor: "Dr. Meg Polachek",
        icon: "allergy"
      }
    ],
    prescriptions: [
      {
        name: "Sertraline 50mg",
        schedule: "Prescribed monthly"
      },
      {
        name: "Paracetamol",
        schedule: "One-time prescription"
      }
    ],
    heartRateData: [75, 78, 80, 82, 85, 88, 90, 92, 95, 93, 90, 88, 92, 94, 92, 90, 88, 85, 82, 80]
  },
  "2": {
    name: "John Smith",
    image: "/patients/john-smith.jpg",
    sex: "M",
    age: 45,
    blood: "A+",
    lastCheckIn: "2 months ago",
    department: "Neurology",
    patientNr: "R4L7Y9C2E2",
    bodyInfo: {
      migraine: false,
      heartRate: "high",
      cholesterol: "normal"
    },
    stats: {
      sleep: {
        value: "6h 45min",
        label: "avg."
      },
      steps: {
        value: 10234,
        label: "avg."
      },
      weight: {
        value: 75,
        unit: "kg"
      },
      burn: {
        value: 2500,
        unit: "kcal"
      },
      cycle: {
        value: "N/A"
      }
    },
    appointments: [
      {
        type: "Neurology Consultation",
        doctor: "Dr. Sarah Wilson",
        icon: "heart"
      }
    ],
    prescriptions: [
      {
        name: "Propranolol 40mg",
        schedule: "Twice daily"
      }
    ],
    heartRateData: [85, 88, 92, 90, 95, 92, 88, 85, 82, 80, 78, 75, 72, 70, 68, 65, 63, 60, 58, 55]
  }
};

// Main page component
export default function PatientPage() {
  const params = useParams();
  const patientId = params.id as string;
  const patient = patientsData[patientId as keyof typeof patientsData];

  if (!patient) {
    notFound();
  }

  return <PatientDetails patient={patient} />;
} 