import { useEffect, useState } from "react";
import axios from "axios";

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/v1/volunteers/donation-history") // Replace with actual API endpoint
      .then((response) => {
        setDonations(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4 border border-black w-full min-h-screen">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 border-collapse">
          <thead>
            <tr className="hover:bg-gray-100">
              <th className="py-2 px-4 border-b">Food Name</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Food Type</th>
              <th className="py-2 px-4 border-b">Expiry Date</th>
              <th className="py-2 px-4 border-b">Pick-up Date</th>
              <th className="py-2 px-4 border-b">Restaurant</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{donation.foodName}</td>
                <td className="py-2 px-4 border-b">{donation.quantity}</td>
                <td className="py-2 px-4 border-b">{donation.foodType}</td>
                <td className="py-2 px-4 border-b">{new Date(donation.expiryDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{new Date(donation.schedulePickUp).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{donation.restaurantName}</td>
                <td className="py-2 px-4 border-b">{donation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DonationHistory;
