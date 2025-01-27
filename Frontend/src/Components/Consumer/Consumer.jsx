import React, { useState, useEffect } from "react";
import axios from "axios";

const Consumer = () => {
  // State for storing food items
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // Fetch food items when the component mounts
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("/api/v1/users/getFoodItems", {
          withCredentials: true, // To send cookies (accessToken) with the request
        });
        setFoodItems(response.data.data); // Assuming APIResponse sends data in 'data' key
      } catch (err) {
        console.error("Failed to fetch food items:", err);
      }
    };

    fetchFoodItems();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="bg-white shadow rounded-lg p-4 border border-black">
      {/* Scrollable Container for table body */}
      <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 border-b">Name</th>
              <th className="text-left p-2 border-b">Manufacturing Date</th>
              <th className="text-left p-2 border-b">Quantity</th>
              <th className="text-left p-2 border-b">Expiry Date</th>
              <th className="text-left p-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.length > 0 ? (
              foodItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {/* Food Name */}
                  <td className="p-2 border-b flex items-center gap-2">
                    <img
                      src="/diet.png"
                      alt="Food Icon"
                      className="w-6 h-6"
                    />
                    {item.name.toUpperCase()}
                  </td>
                  {/* Manufacturing Date */}
                  <td className="p-2 border-b">
                    {new Date(item.manufacturingDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  {/* Quantity */}
                  <td className="p-2 border-b">{item.quantity}</td>
                  {/* Expiry Date */}
                  <td className="p-2 border-b">
                    {new Date(item.expiryDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  {/* Status */}
                  <td
                    className={`p-2 border-b ${
                      item.status === "expired"
                        ? "text-red-600 font-bold"
                        : item.status === "expiring soon"
                        ? "text-yellow-600 font-bold"
                        : "text-green-600 font-bold"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No food items available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Consumer;
