import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Card, Title, Text } from "@tremor/react"; // Import components from Tremor

// Define styles
const mapStyles = {
  height: "50vh", // Half screen height
  width: "100%", // Full width for the map
};

const sidebarStyles = {
  height: "50vh", // Match the map's height
  width: "100%", // Sidebar will take the same width as the map
  padding: "10px",
  overflowY: "auto", // Allows scrolling if the content overflows
  border: "2px solid black", // Black outline for the container
  backgroundColor: "#fff", // White background
  marginLeft: "10px", // Adds space between map and sidebar
};

const Map = () => {
  const [donationStatus, setDonationStatus] = useState([
    { id: 1, restaurant: "Taj Hotel", type: "Mixed Meals", quantity: "50kg", status: "Pending" },
    { id: 2, restaurant: "Kumar Residence", type: "Home Cooked", quantity: "10kg", status: "Pending" },
    { id: 3, restaurant: "Green Eatery", type: "Salads", quantity: "20kg", status: "Pending" },
  ]);

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

  // Handlers for Accept and Reject actions
  const handleAcceptDonation = (id) => {
    setDonationStatus(
      donationStatus.map((donation) =>
        donation.id === id ? { ...donation, status: "Accepted" } : donation
      )
    );
  };

  const handleRejectDonation = (id) => {
    setDonationStatus(
      donationStatus.map((donation) =>
        donation.id === id ? { ...donation, status: "Rejected" } : donation
      )
    );
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <LoadScript googleMapsApiKey="AIzaSyAJ3KUzqKJfvZeJ5TsYzK00stAtFP_tZS8">
        <GoogleMap
          mapContainerStyle={{ ...mapStyles, flex: 0.9 }} // Map takes 60% width
          zoom={12}
          center={defaultCenter} // Default center for Mumbai
          onLoad={onLoad} // On map load, add markers
        >
          {/* Markers will be added in onLoad */}
        </GoogleMap>
      </LoadScript>

      {/* Sidebar to show recent donations */}
      <div style={{ ...sidebarStyles, flex: 0.4, backgroundColor: "#f8f9fa", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <Card style={{ backgroundColor: "transparent", boxShadow: "none" }}>
          <Title style={{ textAlign: "center", fontSize: "1.7em", marginBottom: "15px", color: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
            Recent Donations
            <img src="/order.png" alt="Order" style={{ width: "24px", height: "24px", marginLeft: "10px" }} />
          </Title>

          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            {donationStatus.map((donation) => (
              <li key={donation.id} style={{ marginBottom: "15px" }}>
                <Card
                  style={{
                    padding: "15px",
                    borderRadius: "20px",
                    border: "1px solid #ddd", // Subtle border for better aesthetics
                    backgroundColor: "#ffffff",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add subtle shadow
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <div>
                    <Text style={{ fontWeight: "600", marginBottom: "5px", color: "#333" }}>{donation.restaurant}</Text>
                    <Text style={{ fontSize: "0.95em", color: "#555" }}>{donation.type} - {donation.quantity}</Text>
                    <Text style={{ fontSize: "0.8em", color: "#888", marginTop: "5px" }}>
                      {new Date().toLocaleString()}
                    </Text>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {donation.status === "Accepted" ? (
                      <img src="/checked.png" alt="Accepted" style={{ width: "30px", height: "30px" }} />
                    ) : donation.status === "Rejected" ? (
                      <img src="/decline.png" alt="Rejected" style={{ width: "44px", height: "44px" }} />
                    ) : (
                      <>
                        <img
                          onClick={() => handleAcceptDonation(donation.id)}
                          src="/checked.png"
                          alt="Accept"
                          style={{
                            width: "24px",
                            height: "24px",
                            cursor: "pointer",
                            marginRight: "10px",
                            transition: "transform 0.2s",
                          }}
                        />
                        <img
                          onClick={() => handleRejectDonation(donation.id)}
                          src="/decline.png"
                          alt="Reject"
                          style={{
                            width: "34px",
                            height: "34px",
                            cursor: "pointer",
                            transition: "transform 0.2s",
                          }}
                        />
                      </>
                    )}
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Map;
