import React from 'react';
import { Link } from 'react-router-dom';
import { LuLeaf } from 'react-icons/lu';
import { TbHeartRateMonitor } from "react-icons/tb";
import { SiGoogleanalytics } from "react-icons/si";
import { FaBowlFood } from "react-icons/fa6";
import { SlGraph } from "react-icons/sl";
import { FaArrowRightToBracket } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 animate-fadeIn">

<Link to="/daily-price">
        <button className="absolute top-4 right-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <span>Daily Market Price</span>
          <FaArrowRightToBracket className="text-white text-lg" />
        </button>
      </Link>
      
      {/* Header Section */}
      <div className="flex items-center mb-4 absolute top-4 left-4">
        <LuLeaf 
          className="text-green-500 text-8xl mr-4 transform transition-transform duration-300 hover:scale-110 hover:rotate-12" 
        />
        <h1 className="text-7xl font-bold text-green-900">NourishAI</h1>
      </div>
      {/* <p className="text-2xl text-green-600 text-center mx-6 my-2 font-bold">
      Harnessing AI to Revolutionize Food Systems, Optimize Resources, and Ensure Every Plate is Sustainable and Waste-Free.
      </p> */}

      {/* Icon Boxes */}
      {/* <div className="flex justify-between items-center w-full px-10 mt-12 space-x-6"> */}
        
        {/* Left Box */}
        {/* <div className="flex flex-col items-center justify-center p-6 rounded-3xl shadow-md w-1/3 h-48 bg-green-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <TbHeartRateMonitor className="text-green-600 text-6xl" />
          <p className="text-green-600 text-xl font-semibold mt-4">Smart AI-Monitoring</p>
        </div> */}

        {/* Center Box */}
        {/* <div className="flex flex-col items-center justify-center p-6 rounded-3xl shadow-md w-1/3 h-48 bg-green-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <SiGoogleanalytics className="text-green-600 text-6xl" />
          <p className="text-green-600 text-xl font-semibold mt-4">Analytics</p>
        </div> */}

        {/* Right Box */}
        {/* <div className="flex flex-col items-center justify-center p-6 rounded-3xl shadow-md w-1/3 h-48 bg-green-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <FaBowlFood className="text-green-600 text-6xl" />
          <p className="text-green-600 text-xl font-semibold mt-4">Waste Reduction</p>
        </div> */}
      </div>
  );
};

export default Header;
