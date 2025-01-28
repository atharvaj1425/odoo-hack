import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Calendar, Package } from 'lucide-react'; // Icons from lucide-react

const Donation = () => {
  const [donations, setDonations] = useState([]);

  // Simulated data for demonstration
  useEffect(() => {
    const fetchedDonations = [
      {
        foodName: "Biryani",
        quantity: "10 kg",
        expiryDate: "2025-01-30",
        schedulePickUp: "2025-01-31",
        status: "Pending"
      },
      {
        foodName: "Pasta",
        quantity: "5 kg",
        expiryDate: "2025-02-10",
        schedulePickUp: "2025-02-12",
        status: "Completed"
      }
      // Add more donation data here...
    ];

    setDonations(fetchedDonations);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-4">Food Donation History</h2>
        <p className="text-gray-500 mb-6">Here you can view the history of all food donations.</p>
        
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 font-medium text-gray-700">Food Name</th>
              <th className="px-4 py-2 font-medium text-gray-700">Quantity</th>
              <th className="px-4 py-2 font-medium text-gray-700">Expiry Date</th>
              <th className="px-4 py-2 font-medium text-gray-700">Schedule Pickup</th>
              <th className="px-4 py-2 font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-800">{donation.foodName}</td>
                <td className="px-4 py-2 text-gray-800">{donation.quantity}</td>
                <td className="px-4 py-2 text-gray-800">{donation.expiryDate}</td>
                <td className="px-4 py-2 text-gray-800">{donation.schedulePickUp}</td>
                <td className="px-4 py-2">
                  {donation.status === "Completed" ? (
                    <span className="text-green-500 flex items-center">
                      <CheckCircle className="mr-2" size={16} /> Completed
                    </span>
                  ) : (
                    <span className="text-yellow-500 flex items-center">
                      <XCircle className="mr-2" size={16} /> Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 text-white p-2 rounded-lg flex items-center">
                      <Calendar className="mr-2" size={16} />
                      View Details
                    </button>
                    <button className="bg-gray-500 text-white p-2 rounded-lg flex items-center">
                      <Package className="mr-2" size={16} />
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donation;
