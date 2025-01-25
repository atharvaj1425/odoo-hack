import React from 'react';

const MealDetails = ({ meal, onClose }) => {
  const instructionsList = meal.strInstructions.split('\n').filter((instruction) => instruction.trim() !== "");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 sm:w-1/2 lg:w-1/3 rounded-lg shadow-xl p-6 overflow-y-auto max-h-[90vh] relative">
        {/* Exit Button */}
        <button
          type="button"
          className="absolute top-1 right-1 p-2 bg-transparent border-none cursor-pointer"
          onClick={onClose}
        >
          <img
            src="/decline.png"
            alt="Close"
            className="w-12 h-12 object-contain" // Adjust the size of the button
          />
        </button>

        <h2 className="text-3xl font-semibold text-center mb-4">{meal.strMeal}</h2>
        <p className="text-lg text-center text-gray-600 mb-4">{meal.strCategory}</p>

        {/* Instructions without bullet points */}
        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">Instructions:</h3>
          <div className="text-gray-700 space-y-2">
            {instructionsList.map((instruction, index) => (
              <p key={index} className="text-gray-700">{instruction.trim()}</p>
            ))}
          </div>
        </div>

        {/* Meal Thumbnail */}
        <div className="mb-4">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Watch Video Button */}
        <div className="text-center">
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Watch Video
          </a>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
