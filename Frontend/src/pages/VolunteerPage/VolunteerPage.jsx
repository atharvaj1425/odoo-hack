import React, { useEffect } from 'react'
import Navbar from '../../Components/Volunteer/Navbar'
import Sidebar from '../../Components/Volunteer/Sidebar';
import Header_1 from "../../Components/Volunteer/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fridge from '../../Components/Volunteer/Fridge';

import Analytics from "../../Components/Volunteer/Analytics";
import Volunteer from '../../Components/Volunteer/Volunteer';

const VolunteerPage = () => {
  useEffect(() => {
    const successMessage = localStorage.getItem("loginSuccess");

    if (successMessage) {
      toast.success(successMessage);

      // Remove the message from localStorage so it doesn't show again on refresh
      localStorage.removeItem("loginSuccess");
    }
  }, []); 
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
             <Volunteer/>
            </div>
            {/* <Fridge /> */}
          </div>

          {/* Analytics component */}
          <div className="mt-6">
            <Analytics />
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default VolunteerPage;
