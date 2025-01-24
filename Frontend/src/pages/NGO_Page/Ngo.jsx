import React from 'react'
import NavBar from '../../Components/NGO/Navbar'
import Analytics from '../../Components/NGO/Analytics'
import Header from '../../Components/NGO/Header'
import Map from '../../Components/NGO/Map'

const Ngo = () => {
  return (
    <>
    <NavBar/>
    <div className='bg-green-100 h-screen animate-fadeIn'>
        <Header/>
        <Analytics/>
        <Map/>
   
    </div>
    </>
    
  )
}

export default Ngo
