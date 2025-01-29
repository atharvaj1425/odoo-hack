import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHotel } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
      // Retrieve email from localStorage when the component is mounted
      const name = localStorage.getItem("userName");
      if (name) {
        setUserName(name); 
      }
    }, []);

  return (
    <div className="flex bg-white p-4 rounded-lg border-2 border-black shadow-lg mt-15 w-full justify-between">
      <div className="flex items-center">
        {/* Logo Image beside Dashboard Title */}
        <img src="/consumer.png" alt="Logo" className="w-16 h-16 mr-2" />
        <div className="text-4xl font-semibold">Volunteer Dashboard</div>
      </div>

      {/* Links in the center */}
      <div className="flex items-center space-x-8">
        <div className="text-lg font-bold text-green-800 pb-1 border-b-4 border-green-800">
          Overview
        </div>
        <div className="text-lg font-bold text-black hover:text-green-800 pb-1 border-b-4 border-transparent hover:border-green-800">
          All Data
        </div>
        <div className="text-lg font-bold text-black hover:text-green-800 pb-1 border-b-4 border-transparent hover:border-green-800">
          Individual Data
        </div>
        <div className="text-lg font-bold text-black hover:text-green-800 pb-1 border-b-4 border-transparent hover:border-green-800">
          Network
        </div>
      </div>

      {/* User Icon with Username beside it on the right side */}
      <div className="flex items-center">
        <img src="/login.png" alt="Login" className="w-12 h-12 mr-2" />
        <div className="text-lg font-bold">{userName ? userName : "Guest"}</div>
        
      </div>
    </div>
  );
};

export default Navbar;