// import React from 'react'
// import Header from '../../Components/HomePage/Header'
// import Login from '../../Components/HomePage/Login'

// const HomePage = () => {
//   return (
//     <div className='bg-green-100'>
//       <Header />
//       <div className="mt-2"> {/* Reduce margin-top if there is extra space */}
//         <Login />
//       </div>
//     </div>
//   )
// }

// export default HomePage


import React, { useState, useEffect } from 'react';
import { LuLeaf } from 'react-icons/lu';
import Login from '../../Components/Homepage/Login';

const HomePage = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const carouselData = [
    {
      imgSrc: "/food-sharing.png", // Replace with your image
      title: "About Us",
      description: " NourishAI is dedicated to reducing food waste by connecting restaurants, NGOs, and volunteers. Our platform coordinatesfood donations and ensures that surplus food is shared with those in need,promoting sustainability and reducing food wastage. Through our collaborative efforts, we aim to create a more sustainable food ecosystem, where no food goes to waste and every meal makes a difference.."
    },
    {
      imgSrc: "/food (2).jpg",
    },
    {
      imgSrc: "/photo2.jpg", // Replace with your image
      title: "NGO Partnerships",
      description: "Our partner NGOs help distribute food to the most vulnerable communities."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prevCard) => (prevCard + 1) % carouselData.length); // Change card every 3 seconds
    }, 3000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  return (
    <div className="bg-green-100 min-h-screen flex flex-col relative">
      {/* Header Section */}
      <header className="flex justify-between items-center px-4 py-4">
        <div className="flex items-center">
          <LuLeaf className="text-green-500 text-5xl mr-2" />
          <h1 className="text-3xl md:text-5xl font-bold text-green-900">NourishAI</h1>
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 active:scale-95"
          onClick={toggleLoginPopup}
        >
          Join Us
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-12 bg-green-100">
        <h2 className="text-3xl md:text-5xl font-bold text-green-800 mb-4">
          Reducing Food Waste, One Meal at a Time
        </h2>
        <p className="text-lg md:text-xl text-green-600">
          Collaborating with restaurants, NGOs, and volunteers to ensure no food goes to waste.
        </p>
      </section>

      {/* Flowchart Section */}
      <section className="p-8 bg-green-50">
  <h3 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-6">
    How It Works
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
    {/* Restaurants Card */}
    <div className="flex flex-col items-center">
      <div className="bg-green-200 p-6 rounded-full shadow-md mb-4 transform transition duration-500 ease-in-out hover:scale-110 animate-bounce">
        <span className="text-4xl text-green-600">🏨</span>
      </div>
      <h4 className="text-lg md:text-xl font-semibold text-green-800">Restaurants</h4>
      <p className="text-green-600 mt-2">Provide surplus food data</p>
    </div>

    {/* Volunteers Card */}
    <div className="flex flex-col items-center">
      <div className="bg-green-200 p-6 rounded-full shadow-md mb-4 transform transition duration-500 ease-in-out hover:scale-110 animate-bounce">
        <span className="text-4xl text-green-600">🤝</span>
      </div>
      <h4 className="text-lg md:text-xl font-semibold text-green-800">Volunteers</h4>
      <p className="text-green-600 mt-2">Help with food collection</p>
    </div>

    {/* NGOs Card */}
    <div className="flex flex-col items-center">
      <div className="bg-green-200 p-6 rounded-full shadow-md mb-4 transform transition duration-500 ease-in-out hover:scale-110 animate-bounce">
        <span className="text-4xl text-green-600">🌟</span>
      </div>
      <h4 className="text-lg md:text-xl font-semibold text-green-800">NGOs</h4>
      <p className="text-green-600 mt-2">Distribute to those in need</p>
    </div>

    {/* People's Help Card */}
    <div className="flex flex-col items-center">
      <div className="bg-green-200 p-6 rounded-full shadow-md mb-4 transform transition duration-500 ease-in-out hover:scale-110 animate-bounce">
        <span className="text-4xl text-green-600">❤</span>
      </div>
      <h4 className="text-lg md:text-xl font-semibold text-green-800">People's Help</h4>
      <p className="text-green-600 mt-2">Support through donations</p>
    </div>
  </div>
</section>


      {/* Image and Carousel Section */}
      <section className="relative p-8 bg-green-200 rounded-lg flex flex-col md:flex-row">
        {/* Food Sharing Image (70% width) */}
        <div className="w-full md:w-7/12">
          <img
            src="/food-sharing2.png" // Replace with your image
            alt="Food Sharing"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

       {/* Carousel Card (30% width) */}
       <div className="w-full md:w-5/12 flex justify-center items-center h-96">
  {/* First Card - Text Only */}
  {currentCard === 0 && (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full h-96 p-6 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
      <h4 className="text-2xl md:text-3xl font-semibold text-green-800">
        {carouselData[currentCard].title}
      </h4>
      <p className="text-lg md:text-xl text-green-600 mt-2">
        {carouselData[currentCard].description}
      </p>
    </div>
  )}
  
  {/* Second Card - Image and Text */}
  {currentCard !== 0 && (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full h-96 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
      <img
        src={carouselData[currentCard].imgSrc}
        alt={carouselData[currentCard].title}
        className="w-full h-full object-cover"
      />
      <div className="p-4">
        <h4 className="text-xl font-semibold text-green-800">{carouselData[currentCard].title}</h4>
        <p className="text-green-600 mt-2">{carouselData[currentCard].description}</p>
      </div>
    </div>
  )}
</div>


      </section>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-full h-full md:rounded-lg shadow-lg relative overflow-y-auto">
            <button
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-lg transition"
              onClick={toggleLoginPopup}
            >
              ✖
            </button>
            <div className="p-8 mt[-800px]">
              <Login />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;