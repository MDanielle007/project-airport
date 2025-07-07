import { Airport } from '../data/airports';

export interface FlightPath {
  distance: number;
  duration: number;
  path: Array<{ lat: number; lng: number }>;
}

// Haversine formula to calculate great-circle distance
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

// Calculate intermediate points along the great circle path
export function calculateFlightPath(from: Airport, to: Airport): FlightPath {
  const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng);
  const duration = Math.round(distance / 800 * 60); // Approximate flight time in minutes (800 km/h average speed)
  
  const path = generateGreatCirclePath(from.lat, from.lng, to.lat, to.lng);
  
  return {
    distance: Math.round(distance),
    duration,
    path
  };
}

// Generate intermediate points for smooth arc visualization
function generateGreatCirclePath(lat1: number, lon1: number, lat2: number, lon2: number): Array<{ lat: number; lng: number }> {
  const points: Array<{ lat: number; lng: number }> = [];
  const numPoints = 100;
  
  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);
  
  const d = Math.acos(Math.sin(lat1Rad) * Math.sin(lat2Rad) + 
                     Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lon2Rad - lon1Rad));
  
  for (let i = 0; i <= numPoints; i++) {
    const f = i / numPoints;
    const a = Math.sin((1 - f) * d) / Math.sin(d);
    const b = Math.sin(f * d) / Math.sin(d);
    
    const x = a * Math.cos(lat1Rad) * Math.cos(lon1Rad) + b * Math.cos(lat2Rad) * Math.cos(lon2Rad);
    const y = a * Math.cos(lat1Rad) * Math.sin(lon1Rad) + b * Math.cos(lat2Rad) * Math.sin(lon2Rad);
    const z = a * Math.sin(lat1Rad) + b * Math.sin(lat2Rad);
    
    const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
    const lon = Math.atan2(y, x);
    
    points.push({
      lat: toDegrees(lat),
      lng: toDegrees(lon)
    });
  }
  
  return points;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${mins}m`;
  }
}

export function formatDistance(km: number): string {
  if (km >= 1000) {
    return `${(km / 1000).toFixed(1)}K km`;
  }
  return `${km} km`;
}