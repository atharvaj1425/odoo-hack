import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBoxOpen, FaCalendarAlt, FaSortNumericUp, FaCalendarTimes, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const FoodDonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        
        // Ensure the user is authenticated
        if (!accessToken || !userId) {
          console.error('No access token or user ID found');
          return;
        }

        console.log('Access Token:', accessToken);
        console.log('User ID:', userId);

        // Send the access token as a Bearer token in the Authorization header
        const response = await axios.get("/api/v1/restaurants/donationHistory", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });

        // Log the response data
        console.log('Donation History Response:', response.data);

        // Assuming donations are returned in response.data.data
        setDonations(response.data.data);
      } catch (error) {
        console.error('Error fetching donation history:', error);
      }
    };

    fetchDonations();
  }, []);

  return (
    
    <div className="p-6 bg-green-100">
    <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/retailer')}
              className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 focus:outline-none"
            >
              <FaArrowLeft className="text-xl" />
            </button>
          </div>
      <h2 className="text-3xl font-bold mb-6">Food Donation History</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Food Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Expiry Date</th>
            <th className="py-2 px-4 border-b">Schedule Pickup</th>
            <th className="py-2 px-4 border-b">Food Type</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{donation.foodName}</td>
              <td className="py-2 px-4 border-b">{donation.quantity}</td>
              <td className="py-2 px-4 border-b">{new Date(donation.expiryDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{new Date(donation.schedulePickUp).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{donation.foodType}</td>
              <td className="py-2 px-4 border-b">{donation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodDonationHistory;
