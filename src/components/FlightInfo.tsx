import React from 'react';
import { Clock, Route, Plane } from 'lucide-react';
import { FlightPath } from '../utils/calculations';
import { formatDuration, formatDistance } from '../utils/calculations';

interface FlightInfoProps {
  flightPath: FlightPath | null;
}

export const FlightInfo: React.FC<FlightInfoProps> = ({ flightPath }) => {
  if (!flightPath) return null;

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Plane className="w-5 h-5 text-blue-400" />
        Flight Information
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Route className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-gray-300">Distance</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {formatDistance(flightPath.distance)}
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-gray-300">Est. Duration</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {formatDuration(flightPath.duration)}
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-lg p-4 border border-white/10">
        <div className="text-sm text-gray-300 mb-1">Flight Path</div>
        <div className="text-white font-medium">
          Great Circle Route - {flightPath.path.length} waypoints
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Calculated using Haversine formula for optimal distance
        </div>
      </div>
    </div>
  );
};