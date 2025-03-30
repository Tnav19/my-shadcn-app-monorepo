import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Aircraft {
  id: string;
  position: [number, number];
  altitude: string;
  speed: string;
  heading: number;
}

export default function Map() {
  const [aircraft, setAircraft] = useState<Aircraft[]>([
    {
      id: 'FL001',
      position: [34.0522, -118.2437], // LAX
      altitude: '35,000 ft',
      speed: '450 kts',
      heading: 90,
    },
    {
      id: 'FL002',
      position: [41.8781, -87.6298], // ORD
      altitude: '0 ft',
      speed: '0 kts',
      heading: 0,
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAircraft(prev => prev.map(plane => ({
        ...plane,
        position: [
          plane.position[0] + (Math.random() - 0.5) * 0.1,
          plane.position[1] + (Math.random() - 0.5) * 0.1,
        ],
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[39.8283, -98.5795]}
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
            <div className="p-2">
              <h3 className="font-bold">Flight {plane.id}</h3>
              <p>Altitude: {plane.altitude}</p>
              <p>Speed: {plane.speed}</p>
              <p>Heading: {plane.heading}°</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 