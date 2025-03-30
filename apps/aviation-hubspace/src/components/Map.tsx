'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Aircraft {
  id: string;
  position: LatLngTuple;
  callsign: string;
  altitude: string;
  speed: string;
}

const DEFAULT_CENTER: LatLngTuple = [39.8283, -98.5795];

export default function Map() {
  const [aircraft, setAircraft] = useState<Aircraft[]>([
    {
      id: '1',
      position: DEFAULT_CENTER,
      callsign: 'N12345',
      altitude: '35,000 ft',
      speed: '450 kts',
    },
    {
      id: '2',
      position: [34.0522, -118.2437],
      callsign: 'N67890',
      altitude: '28,000 ft',
      speed: '420 kts',
    },
    {
      id: '3',
      position: [41.8781, -87.6298],
      callsign: 'N24680',
      altitude: '32,000 ft',
      speed: '430 kts',
    },
  ]);

  useEffect(() => {
    // Simulate aircraft movement
    const interval = setInterval(() => {
      setAircraft((prev) =>
        prev.map((plane) => ({
          ...plane,
          position: [
            plane.position[0] + (Math.random() - 0.5) * 0.1,
            plane.position[1] + (Math.random() - 0.5) * 0.1,
          ] as LatLngTuple,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={4}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {aircraft.map((plane) => (
        <Marker key={plane.id} position={plane.position}>
          <Popup>
            <div>
              <strong>Callsign:</strong> {plane.callsign}
              <br />
              <strong>Altitude:</strong> {plane.altitude}
              <br />
              <strong>Speed:</strong> {plane.speed}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 