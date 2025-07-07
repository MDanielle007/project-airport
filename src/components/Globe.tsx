import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { Airport } from '../data/airports';
import { FlightPath } from '../utils/calculations';

interface GlobeProps {
  fromAirport: Airport | null;
  toAirport: Airport | null;
  flightPath: FlightPath | null;
}

export const GlobeComponent: React.FC<GlobeProps> = ({ 
  fromAirport, 
  toAirport, 
  flightPath 
}) => {
  const globeRef = useRef<any>();

  useEffect(() => {
    if (globeRef.current) {
      // Set initial globe properties
      globeRef.current.controls().enableZoom = true;
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  // Prepare airport data for visualization
  const airportData = React.useMemo(() => {
    const airports = [];
    if (fromAirport) {
      airports.push({
        ...fromAirport,
        type: 'departure',
        color: '#3B82F6',
        size: 0.8
      });
    }
    if (toAirport) {
      airports.push({
        ...toAirport,
        type: 'arrival',
        color: '#10B981',
        size: 0.8
      });
    }
    return airports;
  }, [fromAirport, toAirport]);

  // Prepare flight path data using arcs instead of paths
  const arcData = React.useMemo(() => {
    if (!flightPath || !fromAirport || !toAirport) return [];
    
    return [{
      startLat: fromAirport.lat,
      startLng: fromAirport.lng,
      endLat: toAirport.lat,
      endLng: toAirport.lng,
      color: '#F59E0B',
      strokeWidth: 3,
      dashLength: 1,
      dashGap: 0.5,
      dashAnimateTime: 2000
    }];
  }, [flightPath, fromAirport, toAirport]);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-black/20 border border-white/10">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Points (Airports)
        pointsData={airportData}
        pointAltitude={0.1}
        pointColor={d => (d as any).color}
        pointRadius={d => (d as any).size}
        pointResolution={12}
        pointLabel={d => {
          const airport = d as any;
          return `
            <div style="
              background: rgba(0, 0, 0, 0.8);
              color: white;
              padding: 8px 12px;
              border-radius: 8px;
              font-size: 12px;
              border: 1px solid ${airport.color};
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            ">
              <div style="font-weight: bold; margin-bottom: 4px;">
                ${airport.iata} - ${airport.name}
              </div>
              <div style="color: #ccc;">
                ${airport.city}, ${airport.country}
              </div>
              <div style="color: ${airport.color}; font-size: 10px; margin-top: 4px;">
                ${airport.type === 'departure' ? '✈️ Departure' : '🛬 Arrival'}
              </div>
            </div>
          `;
        }}
        
        // Arcs (Flight Routes) - Using arcs instead of paths for better visualization
        arcsData={arcData}
        arcColor={d => (d as any).color}
        arcStroke={d => (d as any).strokeWidth}
        arcDashLength={d => (d as any).dashLength}
        arcDashGap={d => (d as any).dashGap}
        arcDashAnimateTime={d => (d as any).dashAnimateTime}
        arcAltitude={0.3}
        arcAltitudeAutoScale={0.5}
        arcsTransitionDuration={2000}
        
        // Globe appearance
        atmosphereColor="rgba(59, 130, 246, 0.6)"
        atmosphereAltitude={0.15}
        
        // Animation settings
        animateIn={true}
        waitForGlobeReady={true}
        
        // Controls
        enablePointerInteraction={true}
        
        // Styling
        width={undefined}
        height={undefined}
      />
    </div>
  );
};