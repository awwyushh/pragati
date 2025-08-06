// components/MapComponent.tsx
"use client"

import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Place {
  name: string;
  lat: number;
  lng: number;
  distance: number;
  address?: string;
  phone?: string;
  website?: string;
  opening_hours?: string;
}

const MapComponent: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 19.076,
    longitude: 72.8777,
  });

  useEffect(() => {
    const stored = localStorage.getItem("userLocation");
    if (stored) {
      setUserLocation(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/nearby', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lat: userLocation.latitude,
        lng: userLocation.longitude,
        xyz: 'hospital',
        radius: 3000
      })
    })
      .then(res => res.json())
      .then((data: Place[]) => setPlaces(data))
      .catch(err => console.error('Failed to fetch:', err));
  }, [userLocation]);

  useEffect(() => {
    if (places.length === 0) return;

    const mapContainer = document.getElementById('map');
    if (mapContainer && (mapContainer as any)._leaflet_id) {
      (mapContainer as any)._leaflet_id = null;
    }

    const map = L.map('map').setView([places[0].lat, places[0].lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    places.forEach(place => {
      const popupContent = `
        <strong>${place.name}</strong><br/>
        ${place.address || 'No address'}<br/>
        ${place.distance.toFixed(1)} meters away<br/>
        ${place.phone ? `📞 ${place.phone}<br/>` : ''}
        ${place.website ? `<a href="${place.website}" target="_blank">Visit Website</a>` : ''}
      `;

      L.marker([place.lat, place.lng])
        .addTo(map)
        .bindPopup(popupContent);
    });

    return () => {
      map.remove();
    };
  }, [places]);

  return (
    <div className="mt-4">
      <div id="map" style={{ height: '500px', width: '100%' }} className="rounded-lg shadow-lg"></div>
    </div>
  );
};

export default MapComponent;
