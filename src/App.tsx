import React, { useState, useEffect } from 'react';
import { Plane, ArrowRight, Globe as GlobeIcon } from 'lucide-react';
import { AirportSelector } from './components/AirportSelector';
import { FlightInfo } from './components/FlightInfo';
import { GlobeComponent } from './components/Globe';
import { Airport } from './data/airports';
import { FlightPath, calculateFlightPath } from './utils/calculations';

function App() {
  const [fromAirport, setFromAirport] = useState<Airport | null>(null);
  const [toAirport, setToAirport] = useState<Airport | null>(null);
  const [flightPath, setFlightPath] = useState<FlightPath | null>(null);

  // Calculate flight path when both airports are selected
  useEffect(() => {
    if (fromAirport && toAirport) {
      const path = calculateFlightPath(fromAirport, toAirport);
      setFlightPath(path);
    } else {
      setFlightPath(null);
    }
  }, [fromAirport, toAirport]);

  const handleSwapAirports = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 pt-8 pb-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">
                Flight Path Visualizer
              </h1>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Explore flight routes between airports worldwide with our interactive 3D globe. 
              Calculate distances and visualize great-circle paths in real-time.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Controls Panel */}
            <div className="lg:col-span-4 space-y-6">
              {/* Airport Selection */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <GlobeIcon className="w-5 h-5 text-blue-400" />
                  Flight Route
                </h2>
                
                <div className="space-y-6">
                  <AirportSelector
                    label="Departure Airport"
                    selectedAirport={fromAirport}
                    onAirportSelect={setFromAirport}
                    placeholder="Select departure airport"
                    icon={<Plane className="w-4 h-4 text-blue-400" />}
                  />
                  
                  <div className="flex justify-center">
                    <button
                      onClick={handleSwapAirports}
                      className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-200 group"
                      disabled={!fromAirport || !toAirport}
                    >
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                  </div>
                  
                  <AirportSelector
                    label="Arrival Airport"
                    selectedAirport={toAirport}
                    onAirportSelect={setToAirport}
                    placeholder="Select arrival airport"
                    icon={<div className="w-4 h-4 text-emerald-400 flex items-center justify-center">🛬</div>}
                  />
                </div>
              </div>

              {/* Flight Information */}
              <FlightInfo flightPath={flightPath} />

              {/* Instructions */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">How to Use</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Select departure and arrival airports using the dropdowns above
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    View the calculated flight path on the interactive 3D globe
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Drag to rotate the globe and scroll to zoom in/out
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Hover over airports for detailed information
                  </li>
                </ul>
              </div>
            </div>

            {/* Globe Visualization */}
            <div className="lg:col-span-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Interactive Globe</h2>
                  {flightPath && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Departure</span>
                      <div className="w-3 h-3 bg-emerald-500 rounded-full ml-4"></div>
                      <span>Arrival</span>
                      <div className="w-8 h-1 bg-amber-500 rounded ml-4"></div>
                      <span>Flight Path</span>
                    </div>
                  )}
                </div>
                
                <div className="aspect-video w-full">
                  <GlobeComponent
                    fromAirport={fromAirport}
                    toAirport={toAirport}
                    flightPath={flightPath}
                  />
                </div>
                
                {!fromAirport && !toAirport && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
                    <div className="text-center">
                      <GlobeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 text-lg">
                        Select airports to visualize flight path
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;