'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import AirplaneMarker from './AirplaneMarker';
import { aviationApi, FlightTracking } from '@/services/aviationApi';

interface ClientMapProps {
  selectedAircraftId?: string;
  onAircraftClick?: (id: string) => void;
}

function AnimationController({ flight }: { flight: FlightTracking }) {
  const map = useMap();

  useEffect(() => {
    if (flight.live) {
      map.setView([flight.live.latitude, flight.live.longitude], map.getZoom());
    }
  }, [flight.live, map]);

  return null;
}

export default function ClientMap({ selectedAircraftId, onAircraftClick }: ClientMapProps) {
  const [mounted, setMounted] = useState(false);
  const [flights, setFlights] = useState<FlightTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await aviationApi.getFlights({
          flight_status: 'active',
          limit: 100,
        });
        setFlights(response.data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching flights:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchFlights, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const selectedFlight = flights.find(f => f.flight.iata === selectedAircraftId);

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
      {flights.map((flight) => {
        if (!flight.live) return null;
        
        return (
          <AirplaneMarker
            key={flight.flight.iata}
            position={[flight.live.latitude, flight.live.longitude]}
            rotation={flight.live.direction}
            aircraft={{
              id: flight.flight.iata,
              type: flight.aircraft.iata,
              altitude: `${Math.round(flight.live.altitude)}m`,
              speed: `${Math.round(flight.live.speed_horizontal)} km/h`,
              status: flight.flight_status,
            }}
            isSelected={selectedAircraftId === flight.flight.iata}
            onClick={() => onAircraftClick?.(flight.flight.iata)}
          />
        );
      })}
      {selectedFlight && <AnimationController flight={selectedFlight} />}
    </MapContainer>
  );
} 