import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NGO = () => {
  // State for storing food donations
  const [foodDonations, setFoodDonations] = useState([]);

  useEffect(() => {
    // Fetch food donations when the component mounts
    const fetchFoodDonations = async () => {
      try {
        const ngoId = localStorage.getItem("userId"); // Retrieve volunteerId from local storage
        if (!ngoId) {
          throw new Error("Ngo ID not found in local storage");
        }

        const response = await axios.get(`/api/v1/ngos/getDonations?ngoId=${ngoId}`, {
          withCredentials: true,
        });
        setFoodDonations(response.data.data); // Assuming APIResponse sends data in 'data' key
      } catch (err) {
        console.error("Failed to fetch food donations:", err);
      }
    };

    fetchFoodDonations();
  }, []); // Empty dependency array ensures this runs only once

  const handleAccept = async (donationId) => {
    try {
      const ngoId = localStorage.getItem("userId"); // Retrieve volunteerId from local storage
      if (!ngoId) {
        throw new Error("Volunteer ID not found in local storage");
      }
  
      const response = await axios.post(`/api/v1/ngos/${donationId}/accept`, { ngoId }, {
        withCredentials: true,
      });
      toast.success("Food donation accepted successfully!");
      setFoodDonations(foodDonations.filter(donation => donation._id !== donationId));
    } catch (err) {
      console.error("Failed to accept food donation:", err);
      toast.error("Failed to accept food donation. Please try again later.");
    }
  };

  const handleReject = async (donationId) => {
    try {
      const response = await axios.post(`/api/v1/ngos/${donationId}/reject`, {}, {
        withCredentials: true,
      });
      toast.success("Food donation rejected successfully!");
      setFoodDonations(foodDonations.filter(donation => donation._id !== donationId));
    } catch (err) {
      console.error("Failed to reject food donation:", err);
      toast.error("Failed to reject food donation. Please try again later.");
    }
  };  

  return (
    <div className="bg-white shadow rounded-lg p-4 border border-black w-full min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Food Donations</h2>
      <table className="min-w-full bg-white border border-gray-300 border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Food Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Expiry Date</th>
            <th className="py-2 px-4 border-b">Schedule Pick Up</th>
            <th className="py-2 px-4 border-b">Restaurant Pincode</th>
            <th className="py-2 px-4 border-b">Restaurant Name</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodDonations.map((donation) => (
            <tr key={donation._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{donation.foodName}</td>
              <td className="py-2 px-4 border-b">{donation.quantity}</td>
              <td className="py-2 px-4 border-b">{new Date(donation.expiryDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{new Date(donation.schedulePickUp).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{donation.restaurantPincode}</td>
              <td className="py-2 px-4 border-b">{donation.restaurantName}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  onClick={() => handleAccept(donation._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(donation._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default NGO;