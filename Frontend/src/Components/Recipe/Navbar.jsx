import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white text-gray-800 py-4 px-6 flex justify-between items-center shadow-md">
      {/* Left side: Logo with text */}
      <div className="flex items-center">
        <img
          src="/tasty.png" // Replace with your image name in the public folder
          alt="Delicious Logo"
          className="h-10 w-10 mr-2"
        />
        <h1 className="text-3xl font-bold">RecipeWhiz</h1>
      </div>

      {/* Right side: Chatbot button with icon */}
      <button className="flex items-center text-gray-800 focus:outline-none text-3xl font-bold">
        <img
          src="robot-assistant.png" // Replace with your chatbot icon image name in the public folder
          alt="Chatbot Icon"
          className="h-10 w-10 mr-2"
        />
        Chatbot
      </button>
    </nav>
  );
};

export default Navbar;
