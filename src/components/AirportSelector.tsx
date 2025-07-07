import React, { useState, useRef, useEffect } from 'react';
import { Search, Plane, MapPin } from 'lucide-react';
import { Airport, airports } from '../data/airports';

interface AirportSelectorProps {
  label: string;
  selectedAirport: Airport | null;
  onAirportSelect: (airport: Airport) => void;
  placeholder: string;
  icon: React.ReactNode;
}

export const AirportSelector: React.FC<AirportSelectorProps> = ({
  label,
  selectedAirport,
  onAirportSelect,
  placeholder,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = airports.filter(airport =>
      airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.iata.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAirports(filtered.slice(0, 10)); // Limit to 10 results
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAirportSelect = (airport: Airport) => {
    onAirportSelect(airport);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      
      <div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-white/15 transition-all duration-200">
          <Search className="w-5 h-5 text-gray-400" />
          <div className="flex-1 min-w-0">
            {selectedAirport ? (
              <div>
                <div className="text-white font-medium">
                  {selectedAirport.iata} - {selectedAirport.name}
                </div>
                <div className="text-gray-400 text-sm">
                  {selectedAirport.city}, {selectedAirport.country}
                </div>
              </div>
            ) : (
              <div className="text-gray-400">{placeholder}</div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-gray-800/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl max-h-80 overflow-hidden">
          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search airports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {filteredAirports.map((airport) => (
              <div
                key={airport.iata}
                className="px-4 py-3 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-b-0 transition-colors duration-150"
                onClick={() => handleAirportSelect(airport)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Plane className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-white font-medium">
                      {airport.iata} - {airport.name}
                    </div>
                    <div className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {airport.city}, {airport.country}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredAirports.length === 0 && searchTerm && (
              <div className="px-4 py-8 text-center text-gray-400">
                No airports found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};