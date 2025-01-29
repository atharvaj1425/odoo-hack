import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBoxOpen, FaCalendarAlt, FaSortNumericUp, FaCalendarTimes, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodInventory = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    manufacturingDate: '',
    quantity: '',
    expiryDate: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddFoodItem = async () => {
    const { name, manufacturingDate, quantity, expiryDate } = formData;

    if (!name || !manufacturingDate || !quantity || !expiryDate) {
      toast.error('Please fill in all fields!');
      return;
    }

    try {
      console.log("Sending data to backend:", formData);
      const response = await axios.post("/api/v1/restaurants/addFoodItem", formData);
      console.log("Response from backend:", response.data);

      const newFoodItem = {
        id: response.data._id,
        name: response.data.name,
        manufacturingDate: response.data.manufacturingDate,
        quantity: response.data.quantity,
        expiryDate: response.data.expiryDate,
        status: response.data.status,
      };

      const storedFoodItems = JSON.parse(localStorage.getItem("foodItems")) || [];
      const updatedFoodItems = [...storedFoodItems, newFoodItem];

      localStorage.setItem("foodItems", JSON.stringify(updatedFoodItems));
      setFoodItems(updatedFoodItems);

      setFormData({ name: '', manufacturingDate: '', quantity: '', expiryDate: '' });
      toast.success('Food item added successfully!');
    } catch (error) {
      console.error("Error adding food item:", error);

      if (error.response) {
        console.error("Backend error response:", error.response.data);
        toast.error(error.response.data.error || "Failed to add food item.");
      } else {
        toast.error('Failed to add food item. Please try again later.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl space-y-6">
      {/* Back Button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/retailer')}
          className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 focus:outline-none"
        >
          <FaArrowLeft className="text-xl" />
        </button>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 flex justify-center items-center">
        <FaBoxOpen className="mr-3 text-green-600" />
        Food Items Inventory
      </h2>

      {/* Input Form */}
      <div className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaBoxOpen className="mr-2 text-green-500" /> Name of Food Item:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter food item name"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaCalendarAlt className="mr-2 text-green-500" /> Manufacturing Date:
          </label>
          <input
            type="date"
            name="manufacturingDate"
            value={formData.manufacturingDate}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaSortNumericUp className="mr-2 text-green-500" /> Quantity:
          </label>
          <input
            type="String"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Enter quantity"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaCalendarTimes className="mr-2 text-green-500" /> Expiry Date:
          </label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleAddFoodItem}
          className="w-full p-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 flex justify-center items-center text-xl"
        >
          Add Food Item <FaCheckCircle className="ml-2 text-white" />
        </button>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default FoodInventory;
