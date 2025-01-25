import React from 'react';

const MealList = ({ meals, onMealSelect }) => {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold text-center mb-4 flex justify-center items-center">
  <span className="mr-2">Your Search Results:</span>
  <img
    src="/search.png"
    alt="search"
    className="w-10 h-10 ml-1"
  />
</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {meals.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">Sorry, we didn't find any meals!</p>
        ) : (
          meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer transform"
              onClick={() => onMealSelect(meal.idMeal)}
            >
              <div className="w-full h-64 bg-gray-200">
                <img src={meal.strMealThumb} alt="food" className="w-full h-full object-cover rounded-t-lg" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{meal.strMeal}</h3>
                <div className="flex items-center mt-2">
                  <a
                    href="#"
                    className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-green-600 transition-colors duration-300"
                  >
                    <img
                      src="/recipe_1.png"
                      alt="recipe"
                      className="w-5 h-5 mr-2" // Adjust the size of the image
                    />
                    Get Recipe
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MealList;
