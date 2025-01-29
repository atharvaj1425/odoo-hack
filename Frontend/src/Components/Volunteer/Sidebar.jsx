import React from 'react';
import { RiComputerLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { IoAnalytics, IoFastFood } from "react-icons/io5";
import { GiTrophiesShelf } from "react-icons/gi";
import { BiLeaf } from "react-icons/bi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-1/5 bg-gray-900 text-white p-6 h-[120vh] flex flex-col">
      {/* Logo Section */}
      <div>
        <h2 className="text-3xl font-bold mb-12 flex items-center">
          <BiLeaf className="mr-3 text-green-500 text-4xl" /> Nourish AI
        </h2>

        {/* Navigation Menu */}
        <ul className="space-y-8 text-lg text-center mr-16">
          <li className="flex items-center hover:text-green-400 cursor-pointer transition duration-200">
            <RiComputerLine className="mr-3 text-2xl" />
            Dashboard
          </li>

          <Link to="/volunteer-current-donation">
            <li className="flex items-center hover:text-green-400 cursor-pointer transition duration-200 mt-7">
              <SlCalender className="mr-3 text-2xl" />
               Current Donation
            </li>
          </Link>
          <Link to="/volunteer-donation-history">
          <li className="flex items-center hover:text-green-400 cursor-pointer transition duration-200 mt-7">
            <IoAnalytics className="mr-3 text-2xl" />
            Donation History
          </li>
          </Link>
          
          


          
        </ul>

        {/* Donate Section (Moved Here) */}
        <div className="text-center mt-20">
          <p className="text-2xl font-semibold mb-2 whitespace-nowrap">
            Having Surplus Food?
          </p>
          <img
            src="/food-donation.png"
            alt="Donate Food"
            className="w-24 h-24 mb-4 mx-auto rounded-full shadow-md"
          />
          <Link to = "/">
                    <button className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition duration-300 shadow-lg">
                      Donate Food
                    </button>
                    </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
