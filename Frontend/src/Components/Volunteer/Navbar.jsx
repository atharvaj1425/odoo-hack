import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHotel } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
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
        <div className="text-lg font-bold">{userDetails ? userDetails.username || userEmail : "Guest"}</div>
        {userDetails && (
          <button
            onClick={() => {
              localStorage.removeItem("userDetails");
              localStorage.removeItem("loginSuccess");
              window.location.reload();
            }}
            className="bg-red-500 px-4 py-2 rounded ml-4"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;