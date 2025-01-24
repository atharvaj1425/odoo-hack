import React from 'react'
import Navbar from '../../Components/Consumer/Navbar'
import Sidebar from '../../Components/Consumer/Sidebar';
import Header_1 from "../../Components/Consumer/Header_1";

import Fridge from '../../Components/Consumer/Fridge';

import Analytics from "../../Components/Consumer/Analytics";
import Consumer from '../../Components/Consumer/Consumer';

const ConsumerPage = () => {
  return (
    <div className="animate-fadeIn">
      <Navbar />
      <div className="flex ">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <div className="flex-1 p-6 bg-green-100">
          <Header_1 />
          
          {/* Main content section with food items and AI Recipe */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="col-span-2">
             <Consumer/>
            </div>
            <Fridge />
          </div>

          {/* Analytics component */}
          <div className="mt-6">
            <Analytics />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsumerPage;
