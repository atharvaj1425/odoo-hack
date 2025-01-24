import React from 'react';

const Form = () => {
  return (
    <div className="bg-green-300 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      {/* Title Section */}
      <div className="flex items-center justify-center mb-6">
        <img src="/food-donation.png" alt="Donate" className="w-12 h-12 mr-3 " />
        <h2 className="text-3xl font-bold text-gray-800">Food Donation Form</h2>
      </div>

      <form className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        {/* Donor Name */}
        <div className="w-full md:w-1/5">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 transition"
          />
        </div>

        {/* NGO Name */}
        <div className="w-full md:w-1/5">
          <label className="block text-gray-700 font-semibold mb-2">Select NGO</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-900 transition"
          >
            <option value="">Choose NGO</option>
            <option value="ngo1">Helping Hands</option>
            <option value="ngo2">Food for All</option>
            <option value="ngo3">Zero Hunger Mumbai</option>
          </select>
        </div>

        {/* Food Type */}
        <div className="w-full md:w-1/5">
          <label className="block text-gray-700 font-semibold mb-2">Food Type</label>
          <input
            type="text"
            placeholder="e.g., Fruits, Grains"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 transition"
          />
        </div>

        {/* Quantity */}
        <div className="w-full md:w-1/5">
          <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
          <input
            type="text"
            placeholder="e.g., 10 kg"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 transition"
          />
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-1/5">
          <label className="block text-gray-700 font-semibold mb-2">Contact Info</label>
          <input
            type="text"
            placeholder="Phone/Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 transition"
          />
        </div>

        {/* Submit Button */}
        <div className="w-full md:w-auto md:mt-0">
          <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-white hover:text-green-900 hover:border-green-900 hover:border-2 transition duration-300 transform hover:scale-105">
            Donate
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
