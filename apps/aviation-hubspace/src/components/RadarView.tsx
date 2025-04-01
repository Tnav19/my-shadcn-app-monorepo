'use client';

import { useEffect, useRef, useState } from 'react';

interface Flight {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  heading: number;
  altitude: number;
  speed: number;
  status: string;
}

interface ClosestFlight {
  flight: Flight | null;
  distance: number;
}

interface RadarViewProps {
  flights: Array<Flight>;
  selectedFlightId?: string;
  onFlightClick?: (id: string) => void;
  zoom: number;
}

export default function RadarView({ flights, selectedFlightId, onFlightClick, zoom }: RadarViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(0);
  const [sweepAngle, setSweepAngle] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      setCenter({ x: canvas.width / 2, y: canvas.height / 2 });
      setRadius(Math.min(canvas.width, canvas.height) / 2 - 40);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw radar background
    const drawRadarBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw outer circle
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw concentric circles with range labels
      for (let i = 1; i <= 5; i++) {
        const range = (radius * i) / 5;
        ctx.beginPath();
        ctx.arc(center.x, center.y, range, 0, 2 * Math.PI);
        ctx.strokeStyle = '#2d2d2d';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Add range labels
        ctx.fillStyle = '#666';
        ctx.font = '10px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`${i * 100}nm`, center.x - 5, center.y - range + 15);
      }

      // Draw radial lines with heading labels
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(
          center.x + radius * Math.cos(angle),
          center.y + radius * Math.sin(angle)
        );
        ctx.strokeStyle = '#2d2d2d';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Add heading labels
        const heading = i * 30;
        ctx.save();
        ctx.translate(center.x + (radius + 15) * Math.cos(angle), center.y + (radius + 15) * Math.sin(angle));
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillStyle = '#666';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${heading}°`, 0, 0);
        ctx.restore();
      }

      // Draw sweep line
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(
        center.x + radius * Math.cos(sweepAngle),
        center.y + radius * Math.sin(sweepAngle)
      );
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw sweep arc
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, sweepAngle - 0.1, sweepAngle + 0.1);
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
      ctx.lineWidth = 20;
      ctx.stroke();
    };

    // Draw aircraft
    const drawAircraft = (flight: Flight) => {
      // Convert lat/lng to radar coordinates (simplified)
      const x = center.x + (flight.position.lng * radius * zoom) / 180;
      const y = center.y - (flight.position.lat * radius * zoom) / 90;

      // Draw aircraft blip with glow effect
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = selectedFlightId === flight.id ? 'rgba(37, 99, 235, 0.8)' : 'rgba(59, 130, 246, 0.8)';
      ctx.fill();

      // Draw blip glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
      gradient.addColorStop(0, selectedFlightId === flight.id ? 'rgba(37, 99, 235, 0.3)' : 'rgba(59, 130, 246, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, 2 * Math.PI);
      ctx.fill();

      // Draw heading line
      const headingLength = 25;
      const headingAngle = (flight.heading * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        x + headingLength * Math.cos(headingAngle),
        y + headingLength * Math.sin(headingAngle)
      );
      ctx.strokeStyle = selectedFlightId === flight.id ? '#2563eb' : '#3b82f6';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw aircraft info box
      const infoBoxWidth = 120;
      const infoBoxHeight = 60;
      const infoBoxX = x + 15;
      const infoBoxY = y - infoBoxHeight / 2;

      // Draw info box background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(infoBoxX, infoBoxY, infoBoxWidth, infoBoxHeight);

      // Draw info box border
      ctx.strokeStyle = selectedFlightId === flight.id ? '#2563eb' : '#3b82f6';
      ctx.lineWidth = 1;
      ctx.strokeRect(infoBoxX, infoBoxY, infoBoxWidth, infoBoxHeight);

      // Draw aircraft information
      ctx.fillStyle = '#fff';
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`FL${flight.altitude}`, infoBoxX + 5, infoBoxY + 15);
      ctx.fillText(`${flight.speed}kts`, infoBoxX + 5, infoBoxY + 30);
      ctx.fillText(`${flight.heading}°`, infoBoxX + 5, infoBoxY + 45);
    };

    const animate = () => {
      drawRadarBackground();
      flights.forEach(drawAircraft);
      setSweepAngle(prev => (prev + 0.02) % (2 * Math.PI));
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [flights, selectedFlightId, center, radius, zoom, sweepAngle]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onClick={(e) => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left - center.x;
          const y = e.clientY - rect.top - center.y;
          const distance = Math.sqrt(x * x + y * y);

          if (distance <= radius) {
            // Find closest aircraft
            const closestFlight = flights.reduce<ClosestFlight>((closest, flight) => {
              const flightX = center.x + (flight.position.lng * radius * zoom) / 180;
              const flightY = center.y - (flight.position.lat * radius * zoom) / 90;
              const flightDistance = Math.sqrt(
                Math.pow(flightX - x, 2) + Math.pow(flightY - y, 2)
              );

              if (flightDistance < closest.distance) {
                return { flight, distance: flightDistance };
              }
              return closest;
            }, { flight: null, distance: Infinity });

            if (closestFlight.distance < 20 && closestFlight.flight) {
              onFlightClick?.(closestFlight.flight.id);
            }
          }
        }}
      />
    </div>
  );
} 