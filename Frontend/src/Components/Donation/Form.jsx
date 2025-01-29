import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    expiryDate: "",
    schedulePickUp: "",
    foodType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    const formattedData = {
      ...formData,
      expiryDate: formatDate(formData.expiryDate),
      schedulePickUp: formatDate(formData.schedulePickUp),
    };

    console.log("Formatted Data:", formattedData);

    try {
      const response = await axios.post(
        "/api/v1/restaurants/donateFood",
        formattedData,
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Donation submitted successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        console.log("Server Response:", response.data);
        setFormData({
          foodName: "",
          quantity: "",
          expiryDate: "",
          schedulePickUp: "",
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
      <ToastContainer />
      <div className="flex items-center justify-center mb-6">
        <img src="/food-donation.png" alt="Donate" className="w-12 h-12 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">Food Donation Form</h2>
      </div>

      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold mb-1">Food Name</label>
          <input type="text" name="foodName" value={formData.foodName} onChange={handleChange} placeholder="Food Name" className="p-3 border rounded-lg w-full" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Quantity</label>
          <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="e.g., 10 kg" className="p-3 border rounded-lg w-full" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Expiry Date</label>
          <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="p-3 border rounded-lg w-full" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Schedule Pick-Up</label>
          <input type="date" name="schedulePickUp" value={formData.schedulePickUp} onChange={handleChange} className="p-3 border rounded-lg w-full" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Food Type</label>
          <input type="text" name="foodType" value={formData.foodType} onChange={handleChange} placeholder="e.g., Fruits, Grains" className="p-3 border rounded-lg w-full" required />
        </div>
      </form>

      <div className="flex justify-center gap-4 mt-6">
        <button type="submit" onClick={handleSubmit} className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-white hover:text-green-900 border-2 border-green-600 transition">Donate</button>
        <button onClick={() => navigate("/donate")} className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-white hover:text-blue-900 border-2 border-blue-600 transition">Donation History</button>
      </div>
    </div>
  );
};

export default Form;
