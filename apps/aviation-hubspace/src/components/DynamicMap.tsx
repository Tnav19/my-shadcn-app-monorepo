'use client';

import dynamic from 'next/dynamic';

const ClientMap = dynamic(() => import('./ClientMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-background/80">
      <div className="animate-pulse text-gray-500">Loading map...</div>
    </div>
  ),
});

interface DynamicMapProps {
  selectedAircraftId?: string;
  onAircraftClick?: (id: string) => void;
}

export default function DynamicMap(props: DynamicMapProps) {
  return <ClientMap {...props} />;
} 