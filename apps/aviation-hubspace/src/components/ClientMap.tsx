'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import AirplaneMarker from './AirplaneMarker';

// Mock flight paths with multiple waypoints
const flightPaths = {
  'AA123': [
    { lat: 40.7128, lng: -74.0060, rotation: 45 }, // New York
    { lat: 41.8781, lng: -70.5, rotation: 60 }, // Mid-Atlantic
    { lat: 43.5, lng: -60.0, rotation: 75 }, // North Atlantic
    { lat: 48.8566, lng: -40.0, rotation: 85 }, // Mid-Ocean
    { lat: 51.5074, lng: -0.1278, rotation: 90 }, // London
  ],
  'BA456': [
    { lat: 51.5074, lng: -0.1278, rotation: 120 }, // London
    { lat: 51.0, lng: 2.0, rotation: 110 }, // English Channel
    { lat: 48.8566, lng: 2.3522, rotation: 100 }, // Paris
  ],
  'AF789': [
    { lat: 48.8566, lng: 2.3522, rotation: 135 }, // Paris
    { lat: 45.0, lng: 10.0, rotation: 125 }, // Alps
    { lat: 41.0, lng: 20.0, rotation: 115 }, // Mediterranean
    { lat: 25.2048, lng: 55.2708, rotation: 110 }, // Dubai
  ],
};

interface ClientMapProps {
  selectedAircraftId?: string;
  onAircraftClick?: (id: string) => void;
}

function AnimationController({ aircraftId }: { aircraftId: string }) {
  const map = useMap();
  const [waypointIndex, setWaypointIndex] = useState(0);
  const path = flightPaths[aircraftId as keyof typeof flightPaths];

  useEffect(() => {
    const interval = setInterval(() => {
      setWaypointIndex((prev) => (prev + 1) % path.length);
    }, 5000); // Move to next waypoint every 5 seconds

    return () => clearInterval(interval);
  }, [path.length]);

  useEffect(() => {
    const currentPos = path[waypointIndex];
    map.setView([currentPos.lat, currentPos.lng], map.getZoom());
  }, [waypointIndex, map, path]);

  return null;
}

export default function ClientMap({ selectedAircraftId, onAircraftClick }: ClientMapProps) {
  const [mounted, setMounted] = useState(false);
  const [aircraftPositions, setAircraftPositions] = useState<Record<string, { lat: number; lng: number; rotation: number }>>({});

  useEffect(() => {
    setMounted(true);
    
    // Initialize positions
    const initialPositions: Record<string, { lat: number; lng: number; rotation: number }> = {};
    Object.entries(flightPaths).forEach(([id, path]) => {
      initialPositions[id] = { ...path[0] };
    });
    setAircraftPositions(initialPositions);

    // Update positions periodically
    const interval = setInterval(() => {
      setAircraftPositions(prev => {
        const newPositions = { ...prev };
        Object.entries(flightPaths).forEach(([id, path]) => {
          const currentIndex = path.findIndex(
            wp => wp.lat === prev[id]?.lat && wp.lng === prev[id]?.lng
          );
          const nextIndex = (currentIndex + 1) % path.length;
          newPositions[id] = { ...path[nextIndex] };
        });
        return newPositions;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <MapContainer
      center={[45, 0]}
      zoom={3}
      style={{ height: '100%', width: '100%', background: '#f0f0f0' }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.entries(aircraftPositions).map(([id, position]) => (
        <AirplaneMarker
          key={id}
          position={[position.lat, position.lng]}
          rotation={position.rotation}
          aircraft={{
            id,
            type: id === 'AA123' ? 'Boeing 737-800' : id === 'BA456' ? 'Airbus A320' : 'Boeing 777-300ER',
            altitude: '35,000 ft',
            speed: '450 knots',
            status: 'in-flight',
          }}
          isSelected={selectedAircraftId === id}
          onClick={() => onAircraftClick?.(id)}
        />
      ))}
      {selectedAircraftId && <AnimationController aircraftId={selectedAircraftId} />}
    </MapContainer>
  );
} 