// components/MapComponent.tsx
"use client"

import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/navigation';

interface Place {
  name: string;
  lat: number;
  lng: number;
  distance: number;
  place_type: string;
  address?: string;
  phone?: string;
  website?: string;
  opening_hours?: string;
}

const MapComponent: React.FC = () => {
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number }>({    
    latitude: 19.076,
    longitude: 72.8777,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get user's current location
  useEffect(() => {
    const stored = localStorage.getItem("userLocation");
    if (stored) {
      setUserLocation(JSON.parse(stored));
    }

    // Try to get current position using geolocation API
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation(newLocation);
          localStorage.setItem("userLocation", JSON.stringify(newLocation));
          setLoading(false);
        },
        (err) => {
          console.error("Error getting location:", err);
          setError("Could not get your current location. Using default location.");
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      setError("Geolocation is not supported by your browser. Using default location.");
      setLoading(false);
    }
  }, []);

  // Fix for Leaflet marker icon issue in Next.js
  useEffect(() => {
    // This is needed to fix the marker icon issue with Leaflet in Next.js
    const fixLeafletIcon = async () => {
      // Only run on client side
      if (typeof window !== 'undefined') {
        // @ts-ignore
        delete L.Icon.Default.prototype._getIconUrl;
        
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });
      }
    };
    
    fixLeafletIcon();
  }, []);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const fetchNearbyHospitals = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8001/nearby', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: userLocation.latitude,
          lng: userLocation.longitude,
          xyz: 'hospital',
          radius: 5000
        })
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data: Place[] = await response.json();
      setPlaces(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch:', err);
      // Set some default places when offline or API fails
      setPlaces([
        {
          name: "Local Health Center",
          lat: userLocation.latitude + 0.01,
          lng: userLocation.longitude + 0.01,
          distance: 1200,
          place_type: "hospital",
          address: "123 Health St, Local Village",
          phone: "+91 9876543210"
        },
        {
          name: "District Hospital",
          lat: userLocation.latitude - 0.01,
          lng: userLocation.longitude - 0.005,
          distance: 2500,
          place_type: "hospital",
          address: "45 Hospital Road, District Center",
          phone: "+91 9876543211"
        }
      ]);
      setError("Could not fetch nearby hospitals. Showing default locations.");
      setLoading(false);
    }
  };

  // Call the fetch function when userLocation changes
  useEffect(() => {
    if (userLocation) {
      fetchNearbyHospitals();
    }
  }, [userLocation]);

  useEffect(() => {
    if (places.length === 0 || typeof window === 'undefined' || loading) return;

    // Check if map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Clear previous map instance if it exists
    if ((mapContainer as any)._leaflet_id) {
      (mapContainer as any)._leaflet_id = null;
    }

    try {
      // Create map centered on first place or user location
      const map = L.map('map').setView(
        [userLocation.latitude, userLocation.longitude], 
        13
      );

      // Add tile layer (map imagery)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Add user location marker with red icon
      const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      L.marker([userLocation.latitude, userLocation.longitude], {icon: redIcon})
        .addTo(map)
        .bindPopup('<strong>Your Current Location</strong>')
        .openPopup();

      // Add markers for each place with hospital emoji
      places.forEach(place => {
        const formattedDistance = place.distance > 1000 
          ? `${(place.distance / 1000).toFixed(2)} km` 
          : `${place.distance.toFixed(0)} meters`;

        const popupContent = `
          <div class="hospital-popup">
            <h3>${place.name}</h3>
            <p>${place.address || 'No address available'}</p>
            <p>📍 ${formattedDistance} away</p>
            ${place.phone ? `<p>📞 <a href="tel:${place.phone}">${place.phone}</a></p>` : ''}
            ${place.website ? `<p>🌐 <a href="${place.website}" target="_blank">Visit Website</a></p>` : ''}
            ${place.opening_hours ? `<p>⏰ ${place.opening_hours}</p>` : ''}
          </div>
        `;

        // Create custom hospital icon
        const hospitalIcon = L.divIcon({
          html: '🏥',
          className: 'hospital-marker',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -15]
        });

        const marker = L.marker([place.lat, place.lng], {icon: hospitalIcon})
          .addTo(map)
          .bindPopup(popupContent);

        // Add click handler to marker
        marker.on('click', () => {
          setSelectedPlace(place);
        });
      });

      // Cleanup function to remove map when component unmounts
      return () => {
        map.remove();
      };
    } catch (error) {
      console.error('Error creating map:', error);
      // Fallback to a simple message if map creation fails
      if (mapContainer) {
        mapContainer.innerHTML = '<div class="p-4 text-center">Unable to load map. Please check your connection.</div>';
      }
    }
  }, [places, userLocation]);

  // Function to clear selected place
  const clearSelectedPlace = () => {
    setSelectedPlace(null);
  };

  return (
    <div className="mt-4">
      {loading ? (
        <div className="flex justify-center items-center h-[500px] bg-gray-100 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading map...</p>
          </div>
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
              <p>{error}</p>
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-2/3">
              <div id="map" style={{ height: '500px', width: '100%' }} className="rounded-lg shadow-lg"></div>
            </div>
            
            {selectedPlace && (
              <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">{selectedPlace.name}</h2>
                  <button 
                    onClick={clearSelectedPlace}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close details"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-xl mr-2">🏥</span>
                    <div>
                      <p className="text-sm text-gray-500">Hospital</p>
                      <p className="font-medium">{selectedPlace.address || 'Address not available'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-xl mr-2">📍</span>
                    <div>
                      <p className="text-sm text-gray-500">Distance</p>
                      <p className="font-medium">
                        {selectedPlace.distance > 1000 
                          ? `${(selectedPlace.distance / 1000).toFixed(2)} kilometers` 
                          : `${selectedPlace.distance.toFixed(0)} meters`} away
                      </p>
                    </div>
                  </div>
                  
                  {selectedPlace.phone && (
                    <div className="flex items-start">
                      <span className="text-xl mr-2">📞</span>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <a href={`tel:${selectedPlace.phone}`} className="font-medium text-blue-600 hover:underline">
                          {selectedPlace.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {selectedPlace.website && (
                    <div className="flex items-start">
                      <span className="text-xl mr-2">🌐</span>
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <a 
                          href={selectedPlace.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {selectedPlace.opening_hours && (
                    <div className="flex items-start">
                      <span className="text-xl mr-2">⏰</span>
                      <div>
                        <p className="text-sm text-gray-500">Opening Hours</p>
                        <p className="font-medium">{selectedPlace.opening_hours}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            )}
          </div>
          
          <style jsx global>{`
            .hospital-marker {
              font-size: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              text-shadow: 0px 0px 3px white, 0px 0px 5px white;
            }
            
            .hospital-popup h3 {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            
            .hospital-popup p {
              margin: 3px 0;
            }
          `}</style>
        </>
      )}
    </div>
  );
};

export default MapComponent;