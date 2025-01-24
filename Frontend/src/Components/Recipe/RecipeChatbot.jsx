import React from 'react';
import { FaArrowRightToBracket } from "react-icons/fa6"; // Import the icon

const RecipeChatbot = () => {
  return (
    <div className="bg-white p-8 shadow-lg max-w-lg mx-auto mt-8 rounded-lg">
      {/* Title Section with Image */}
      <div className="flex items-center justify-center mb-4">
        <img
          src="/recipe.png" // Replace with the actual path to recipe.png
          alt="Recipe Icon"
          className="h-7 w-7 mr-2"
        />
        <h3 className="text-xl font-bold text-center">Recipe Chatbot</h3>
      </div>

      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Ingredients I have</label>
          <input
            type="text"
            placeholder="e.g., strawberry apple banana milk"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Preferences</label>
          <input
            type="text"
            placeholder="e.g., tasty"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit Button with Icon */}
        <div className="flex items-center justify-between mt-4">
          <button className="bg-green-600 text-white px-6 py-2 rounded-full flex items-center justify-center w-full">
            <span>Submit</span>
            <FaArrowRightToBracket className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeChatbot;
