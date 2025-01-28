import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    expiryDate: "",
    schedulePickup: "",
    foodType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log form data to verify inputs
    console.log("Form Data Submitted:", formData);
  
    try {
      const response = await axios.post(
        "/api/v1/restaurants/donateFood",
        formData,
        {
          withCredentials: true, // To include credentials like cookies
        }
      );
  
      // Check if the response is successful
      if (response.status === 200 || response.status === 201) {
        toast.success("Donation submitted successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
  
        // Log the server response
        console.log("Server Response:", response.data);
  
        // Reset the form fields
        setFormData({
          foodName: "",
          quantity: "",
          expiryDate: "",
          schedulePickup: "",
          foodType: "",
        });
      } else {
        toast.error("Failed to submit donation. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
  
      if (error.response) {
        // Log error response details
        console.error("Error Response Data:", error.response.data);
      }
  
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bg-green-300 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      {/* Toast Container */}
      <ToastContainer />

      {/* Title Section */}
      <div className="flex items-center justify-center mb-6">
        <img src="/food-donation.png" alt="Donate" className="w-12 h-12 mr-3 " />
        <h2 className="text-3xl font-bold text-gray-800">Food Donation Form</h2>
      </div>

      <form
        className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4"
        onSubmit={handleSubmit}
      >
        {/* Food Name */}
        <div className="w-full md:w-1/4">
          <label className="block text-gray-700 font-semibold mb-2">Food Name</label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            placeholder="Your Food Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 transition"
            required
          />
        </div>

        {/* Quantity */}
        <div className="w-full md:w-1/4">
          <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g., 10 kg"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 transition"
            required
          />
        </div>

        {/* Expiry Date */}
        <div className="w-full md:w-1/4">
          <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 transition"
            required
          />
        </div>

        {/* Schedule Pickup */}
        <div className="w-full md:w-1/4">
          <label className="block text-gray-700 font-semibold mb-2">Schedule Pickup</label>
          <input
            type="date"
            name="schedulePickup"
            value={formData.schedulePickup}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 transition"
            required
          />
        </div>

        {/* Food Type */}
        <div className="w-full md:w-1/4">
          <label className="block text-gray-700 font-semibold mb-2">Food Type</label>
          <input
            type="text"
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            placeholder="e.g., Fruits, Grains"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 transition"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="w-full md:w-auto">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-white hover:text-green-900 hover:border-green-900 hover:border-2 transition duration-300 transform hover:scale-105"
          >
            Donate
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
