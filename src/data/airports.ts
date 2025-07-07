export interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export const airports: Airport[] = [
  // Major US Airports
  { iata: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "USA", lat: 40.6413, lng: -73.7781 },
  { iata: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "USA", lat: 33.9425, lng: -118.4081 },
  { iata: "ORD", name: "Chicago O'Hare International Airport", city: "Chicago", country: "USA", lat: 41.9786, lng: -87.9048 },
  { iata: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta", country: "USA", lat: 33.6407, lng: -84.4277 },
  { iata: "DFW", name: "Dallas/Fort Worth International Airport", city: "Dallas", country: "USA", lat: 32.8998, lng: -97.0403 },
  { iata: "DEN", name: "Denver International Airport", city: "Denver", country: "USA", lat: 39.8617, lng: -104.6731 },
  { iata: "SFO", name: "San Francisco International Airport", city: "San Francisco", country: "USA", lat: 37.6213, lng: -122.3790 },
  { iata: "SEA", name: "Seattle-Tacoma International Airport", city: "Seattle", country: "USA", lat: 47.4502, lng: -122.3088 },
  { iata: "LAS", name: "McCarran International Airport", city: "Las Vegas", country: "USA", lat: 36.0840, lng: -115.1537 },
  { iata: "MIA", name: "Miami International Airport", city: "Miami", country: "USA", lat: 25.7959, lng: -80.2870 },
  { iata: "BOS", name: "Boston Logan International Airport", city: "Boston", country: "USA", lat: 42.3656, lng: -71.0096 },
  { iata: "PHX", name: "Phoenix Sky Harbor International Airport", city: "Phoenix", country: "USA", lat: 33.4484, lng: -112.0740 },
  
  // Major European Airports
  { iata: "LHR", name: "London Heathrow Airport", city: "London", country: "UK", lat: 51.4700, lng: -0.4543 },
  { iata: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France", lat: 49.0097, lng: 2.5479 },
  { iata: "FRA", name: "Frankfurt am Main Airport", city: "Frankfurt", country: "Germany", lat: 50.0379, lng: 8.5622 },
  { iata: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands", lat: 52.3105, lng: 4.7683 },
  { iata: "MAD", name: "Madrid-Barajas Airport", city: "Madrid", country: "Spain", lat: 40.4719, lng: -3.5626 },
  { iata: "FCO", name: "Leonardo da Vinci International Airport", city: "Rome", country: "Italy", lat: 41.8003, lng: 12.2389 },
  { iata: "MUC", name: "Munich Airport", city: "Munich", country: "Germany", lat: 48.3538, lng: 11.7861 },
  { iata: "ZUR", name: "Zurich Airport", city: "Zurich", country: "Switzerland", lat: 47.4647, lng: 8.5492 },
  
  // Major Asian Airports
  { iata: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan", lat: 35.7720, lng: 140.3929 },
  { iata: "HND", name: "Tokyo Haneda Airport", city: "Tokyo", country: "Japan", lat: 35.5494, lng: 139.7798 },
  { iata: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea", lat: 37.4602, lng: 126.4407 },
  { iata: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China", lat: 40.0799, lng: 116.6031 },
  { iata: "PVG", name: "Shanghai Pudong International Airport", city: "Shanghai", country: "China", lat: 31.1443, lng: 121.8083 },
  { iata: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "China", lat: 22.3080, lng: 113.9185 },
  { iata: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore", lat: 1.3644, lng: 103.9915 },
  { iata: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand", lat: 13.6900, lng: 100.7501 },
  { iata: "KUL", name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia", lat: 2.7456, lng: 101.7072 },
  { iata: "BOM", name: "Chhatrapati Shivaji International Airport", city: "Mumbai", country: "India", lat: 19.0896, lng: 72.8656 },
  { iata: "DEL", name: "Indira Gandhi International Airport", city: "New Delhi", country: "India", lat: 28.5562, lng: 77.1000 },
  
  // Major Middle Eastern Airports
  { iata: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE", lat: 25.2532, lng: 55.3657 },
  { iata: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar", lat: 25.2731, lng: 51.6080 },
  { iata: "AUH", name: "Abu Dhabi International Airport", city: "Abu Dhabi", country: "UAE", lat: 24.4330, lng: 54.6511 },
  { iata: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey", lat: 41.2753, lng: 28.7519 },
  
  // Major Australian/Oceania Airports
  { iata: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia", lat: -33.9399, lng: 151.1753 },
  { iata: "MEL", name: "Melbourne Airport", city: "Melbourne", country: "Australia", lat: -37.6690, lng: 144.8410 },
  { iata: "AKL", name: "Auckland Airport", city: "Auckland", country: "New Zealand", lat: -37.0082, lng: 174.7850 },
  
  // Major African Airports
  { iata: "CPT", name: "Cape Town International Airport", city: "Cape Town", country: "South Africa", lat: -33.9715, lng: 18.6021 },
  { iata: "JNB", name: "O.R. Tambo International Airport", city: "Johannesburg", country: "South Africa", lat: -26.1367, lng: 28.2411 },
  { iata: "CAI", name: "Cairo International Airport", city: "Cairo", country: "Egypt", lat: 30.1219, lng: 31.4056 },
  
  // Major South American Airports
  { iata: "GRU", name: "São Paulo/Guarulhos International Airport", city: "São Paulo", country: "Brazil", lat: -23.4356, lng: -46.4731 },
  { iata: "GIG", name: "Rio de Janeiro/Galeão International Airport", city: "Rio de Janeiro", country: "Brazil", lat: -22.8099, lng: -43.2436 },
  { iata: "EZE", name: "Ezeiza International Airport", city: "Buenos Aires", country: "Argentina", lat: -34.8222, lng: -58.5358 },
  { iata: "LIM", name: "Jorge Chávez International Airport", city: "Lima", country: "Peru", lat: -12.0219, lng: -77.1143 },
  
  // Major Canadian Airports
  { iata: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada", lat: 43.6777, lng: -79.6248 },
  { iata: "YVR", name: "Vancouver International Airport", city: "Vancouver", country: "Canada", lat: 49.1939, lng: -123.1844 },
  { iata: "YUL", name: "Montreal-Pierre Elliott Trudeau International Airport", city: "Montreal", country: "Canada", lat: 45.4706, lng: -73.7408 },
];