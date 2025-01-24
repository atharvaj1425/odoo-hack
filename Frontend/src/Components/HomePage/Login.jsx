import React, { useState } from 'react';
import { FaHotel } from "react-icons/fa6";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { FaMapMarkerAlt, FaLock } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { FaTractor } from "react-icons/fa";

const Login = () => {
  const [retailerState, setRetailerState] = useState("login");
  const [consumerState, setConsumerState] = useState("login");
  const [ngoState, setNgoState] = useState("login");
  const [farmerState, setFarmerState] = useState("login");

  const toggleFormState = (role) => {
    if (role === "retailer") {
      setRetailerState(retailerState === "login" ? "signup" : "login");
    } else if (role === "consumer") {
      setConsumerState(consumerState === "login" ? "signup" : "login");
    } else if (role === "ngo") {
      setNgoState(ngoState === "login" ? "signup" : "login");
    } else if (role === "farmer") {
      setFarmerState(farmerState === "login" ? "signup" : "login");
    }
  };

  return (
    
    <div className="flex justify-center items-center w-full bg-green-100 animate-fadeIn">
      <div className="w-full p-6 bg-green-100 rounded-lg shadow-lg">
        {/* Title and Description */}
        <h1 className="text-5xl font-bold text-center mb-4 text-green-900 flex items-center justify-center">
          <FaMapMarkerAlt className="text-5xl mr-2 text-green-600" />
          Access your dashboard
        </h1>
        <p className="text-2xl text-center mb-8 text-green-600 font-bold my-6">
          Select your role and access specialized features
        </p>

        {/* Login and Sign Up Forms */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">



        <div className="flex flex-col items-center p-6 rounded-lg shadow-md bg-green-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <FaTractor className="text-5xl mb-4 text-green-600" />
            <h2 className="text-3xl font-semibold mb-4 text-green-800">Farmers</h2>
            <div className="w-full mb-4">
              <label htmlFor="farmer-email" className="block text-sm font-medium text-black mb-2">Email</label>
              <input
                type="email"
                id="farmer-email"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            {farmerState === "signup" && (
              <div className="w-full mb-4">
                <label htmlFor="farmer-username" className="block text-sm font-medium text-black mb-2">Username</label>
                <input
                  type="text"
                  id="farmer-username"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter your username"
                />
              </div>
            )}
            <div className="w-full mb-4">
              <label htmlFor="farmer-password" className="block text-sm font-medium text-black mb-2">Password</label>
              <input
                type="password"
                id="farmer-password"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your password"
              />
            </div>
            <button
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500"
              onClick={() => toggleFormState("farmer")}
            >
              <FaLock className="mr-2 inline" />
              {farmerState === "login" ? "Login" : "Sign Up"}
            </button>
            <p
              className="text-sm text-black mt-4 cursor-pointer"
              onClick={() => toggleFormState("farmer")}
            >
              {farmerState === "login" ? "Not having an account? Click here to register" : "Already have an account? Click here to login"}
            </p>
          </div>


          {/* Retailer Form */}
          <div className="flex flex-col items-center p-6 rounded-lg shadow-md bg-green-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <FaHotel className="text-5xl mb-4 text-green-600" />
            <h2 className="text-3xl font-semibold mb-4 text-green-800">Restaurants</h2>
            <div className="w-full mb-4">
              <label htmlFor="retailer-email" className="block text-sm font-medium text-black mb-2">Email</label>
              <input
                type="email"
                id="retailer-email"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            {retailerState === "signup" && (
              <div className="w-full mb-4">
                <label htmlFor="retailer-username" className="block text-sm font-medium text-black mb-2">Username</label>
                <input
                  type="text"
                  id="retailer-username"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter your username"
                />
              </div>
            )}
            <div className="w-full mb-4">
              <label htmlFor="retailer-password" className="block text-sm font-medium text-black mb-2">Password</label>
              <input
                type="password"
                id="retailer-password"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your password"
              />
            </div>
            <button
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500"
              onClick={() => toggleFormState("retailer")}
            >
              <FaLock className="mr-2 inline" />
              {retailerState === "login" ? "Login" : "Sign Up"}
            </button>
            <p
              className="text-sm text-black mt-4 cursor-pointer"
              onClick={() => toggleFormState("retailer")}
            >
              {retailerState === "login" ? "Not having an account? Click here to register" : "Already have an account? Click here to login"}
            </p>
          </div>

          {/* Consumer Form */}
          <div className="flex flex-col items-center p-6 rounded-lg shadow-md bg-green-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <FaPersonCircleCheck className="text-5xl mb-4 text-green-600" />
            <h2 className="text-3xl font-semibold mb-4 text-green-800">Consumers</h2>
            <div className="w-full mb-4">
              <label htmlFor="consumer-email" className="block text-sm font-medium text-black mb-2">Email</label>
              <input
                type="email"
                id="consumer-email"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            {consumerState === "signup" && (
              <div className="w-full mb-4">
                <label htmlFor="consumer-username" className="block text-sm font-medium text-black mb-2">Username</label>
                <input
                  type="text"
                  id="consumer-username"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter your username"
                />
              </div>
            )}
            <div className="w-full mb-4">
              <label htmlFor="consumer-password" className="block text-sm font-medium text-black mb-2">Password</label>
              <input
                type="password"
                id="consumer-password"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your password"
              />
            </div>
            <button
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500"
              onClick={() => toggleFormState("consumer")}
            >
              <FaLock className="mr-2 inline" />
              {consumerState === "login" ? "Login" : "Sign Up"}
            </button>
            <p
              className="text-sm text-black mt-4 cursor-pointer"
              onClick={() => toggleFormState("consumer")}
            >
              {consumerState === "login" ? "Not having an account? Click here to register" : "Already have an account? Click here to login"}
            </p>
          </div>

          {/* NGO Form */}
          <div className="flex flex-col items-center p-6 rounded-lg shadow-md bg-green-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <FaHandsHelping className="text-5xl mb-4 text-green-600" />
            <h2 className="text-3xl font-semibold mb-4 text-green-800">NGOs / Food Banks</h2>
            <div className="w-full mb-4">
              <label htmlFor="ngo-email" className="block text-sm font-medium text-black mb-2">Email</label>
              <input
                type="email"
                id="ngo-email"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            {ngoState === "signup" && (
              <div className="w-full mb-4">
                <label htmlFor="ngo-username" className="block text-sm font-medium text-black mb-2">Username</label>
                <input
                  type="text"
                  id="ngo-username"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter your username"
                />
              </div>
            )}
            <div className="w-full mb-4">
              <label htmlFor="ngo-password" className="block text-sm font-medium text-black mb-2">Password</label>
              <input
                type="password"
                id="ngo-password"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your password"
              />
            </div>
            <button
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500"
              onClick={() => toggleFormState("ngo")}
            >
              <FaLock className="mr-2 inline" />
              {ngoState === "login" ? "Login" : "Sign Up"}
            </button>
            <p
              className="text-sm text-black mt-4 cursor-pointer"
              onClick={() => toggleFormState("ngo")}
            >
              {ngoState === "login" ? "Not having an account? Click here to register" : "Already have an account? Click here to login"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
