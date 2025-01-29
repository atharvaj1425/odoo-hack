import { useEffect, useState } from "react";
import axios from "axios";

const DonationHistory = () => {
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    axios
      .get("/api/v1/volunteers/active-donation")
      .then((response) => {
        if (response.data && response.data.data) {
          setDonation(response.data.data);
        } else {
          console.error("Invalid data format:", response.data);
          setDonation(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setDonation(null);
        setLoading(false);
      });
  }, []);

  const getRoute = () => {
    if (!donation) return;

    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const destination = encodeURIComponent(
                    `${donation.restaurantName}, ${donation.restaurantPincode}`
                );
                const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}`;
                window.open(googleMapsUrl, "_blank");
            },
            (error) => {
                console.error("Error getting location:", error);
                alert("Failed to get your location. Please enable GPS.");
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // Force fresh location
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
};


  const updateStatus = async (newStatus) => {
    if (!donation) return;
    setUpdating(true);
    try {
      await axios.put(`/api/v1/volunteers/update-status/${donation._id}`, {
        status: newStatus,
      });
      setDonation({ ...donation, status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
    setUpdating(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 border border-black w-full min-h-screen">
      {loading ? (
        <div>Loading...</div>
      ) : donation ? (
        <table className="min-w-full bg-white border border-gray-300 border-collapse">
          <thead>
            <tr className="hover:bg-gray-100">
              <th className="py-2 px-4 border-b">Food Name</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Expiry Date</th>
              <th className="py-2 px-4 border-b">Pick-up Date</th>
              <th className="py-2 px-4 border-b">Restaurant (Pincode)</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{donation.foodName}</td>
              <td className="py-2 px-4 border-b">{donation.quantity}</td>
              <td className="py-2 px-4 border-b">{new Date(donation.expiryDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{new Date(donation.schedulePickUp).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{donation.restaurantName} ({donation.restaurantPincode})</td>
              <td className="py-2 px-4 border-b">{donation.status}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={getRoute}>
                  Get Route
                </button>
                {donation.status === "Accepted" && (
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 ml-2 rounded"
                    onClick={() => updateStatus("Out for Delivery")}
                    disabled={updating}
                  >
                    Picked Up
                  </button>
                )}
                {donation.status === "Out for Delivery" && (
                  <button
                    className="bg-green-500 text-white px-3 py-1 ml-2 rounded"
                    onClick={() => updateStatus("Delivered")}
                    disabled={updating}
                  >
                    Delivered
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>No donation data available.</div>
      )}
    </div>
  );
};

export default DonationHistory;
