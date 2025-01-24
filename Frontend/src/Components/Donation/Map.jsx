import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = () => {
  const mapStyles = {
    height: "50vh", // Half screen height
    width: "100%", // Full width
  };

  const defaultCenter = {
    lat: 19.076, // Latitude for Mumbai
    lng: 72.8777, // Longitude for Mumbai
  };

  // Coordinates for Mumbai neighborhoods
  const ngoLocations = [
    { lat: 19.0144, lng: 72.8479 }, // Dadar
    { lat: 19.0558, lng: 72.8405 }, // Bandra
    { lat: 19.1197, lng: 72.8460 }, // Andheri
    { lat: 19.1726, lng: 72.9470 }, // Mulund
  ];

  const onLoad = (map) => {
    // Add default red markers when the map loads
    ngoLocations.forEach((location) => {
      new google.maps.Marker({
        position: location,
        map: map,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Default red marker icon
        },
      });
    });
  };

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex items-center justify-center mb-4">
        <img src="/ngo.png" alt="NGO Icon" className="w-10 h-10 mr-3" />
        <h2 className="text-4xl font-bold">NGOs Near Me</h2>
      </div>

      {/* Google Map */}
      <LoadScript googleMapsApiKey="AIzaSyAJ3KUzqKJfvZeJ5TsYzK00stAtFP_tZS8">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={defaultCenter}
          onLoad={onLoad} // Use the onLoad callback
        />
      </LoadScript>
    </div>
  );
};

export default Map;
