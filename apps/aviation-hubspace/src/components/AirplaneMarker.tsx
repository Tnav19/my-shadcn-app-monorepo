'use client';

import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

interface AirplaneMarkerProps {
  position: [number, number];
  rotation: number;
  aircraft: {
    id: string;
    type: string;
    altitude: string;
    speed: string;
    status: string;
  };
  isSelected?: boolean;
  onClick?: () => void;
}

// Create a custom airplane icon
const createAirplaneIcon = (rotation: number, isSelected: boolean = false) => {
  const size = isSelected ? 40 : 32;
  const color = isSelected ? '#2563eb' : '#3b82f6';
  
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="${color}"/>
      <path d="M12 3.5C12 2.67 11.33 2 10.5 2C9.67 2 9 2.67 9 3.5V9L2 14V16L9 13.5V19L7 20.5V22L10.5 21L14 22V20.5L12 19V13.5L19 16V14L12 9V3.5Z" fill="${color}" fill-opacity="0.3"/>
    </svg>
  `;

  return L.divIcon({
    html: `<div style="transform: rotate(${rotation}deg)">${svg}</div>`,
    className: 'custom-airplane-icon',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

export default function AirplaneMarker({ position, rotation, aircraft, isSelected, onClick }: AirplaneMarkerProps) {
  const icon = createAirplaneIcon(rotation, isSelected);

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-semibold">{aircraft.id}</h3>
          <p className="text-sm text-gray-600">{aircraft.type}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm"><span className="font-medium">Altitude:</span> {aircraft.altitude}</p>
            <p className="text-sm"><span className="font-medium">Speed:</span> {aircraft.speed}</p>
            <p className="text-sm"><span className="font-medium">Status:</span> {aircraft.status}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
} 