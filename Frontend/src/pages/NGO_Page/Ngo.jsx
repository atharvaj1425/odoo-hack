import React, { useEffect } from 'react'
import NavBar from '../../Components/NGO/Navbar'
import Analytics from '../../Components/NGO/Analytics'
import Header from '../../Components/NGO/Header'
import Map from '../../Components/NGO/Map'
import Ngo_donations from '../../Components/NGO/ngo_donations'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Ngo = () => {
  useEffect(() => {
      const successMessage = localStorage.getItem("loginSuccess");
  
      if (successMessage) {
        toast.success(successMessage);
  
        // Remove the message from localStorage so it doesn't show again on refresh
        localStorage.removeItem("loginSuccess");
      }
    }, []); 
  return (
    <>
    <NavBar/>
    <div className='bg-green-100 h-screen animate-fadeIn'>
        <Header/>
        <Analytics/>
        {/* <Map/> */}
        <Ngo_donations />
   <ToastContainer/>
    </div>
    </>
    
  )
}

export default Ngo
