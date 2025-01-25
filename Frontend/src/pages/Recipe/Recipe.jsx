import React, { useState } from 'react';
import Navbar from '../../Components/Recipe/Navbar';

import SearchBar from '../../Components/Recipe/SearchBar';
import MealList from '../../Components/Recipe/MealList';
import MealDetails from '../../Components/Recipe/MealDetails';

const Recipe = () => {
  const [mealList, setMealList] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const searchMeals = (ingredient) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          setMealList(data.meals);
        } else {
          setMealList([]);
        }
      });
  };

  const getMealRecipe = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => response.json())
      .then(data => setSelectedMeal(data.meals[0]));
  };

  const closeRecipe = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="bg-green-100 min-h-screen">
      <Navbar />
      <SearchBar onSearch={searchMeals} />
      <MealList meals={mealList} onMealSelect={getMealRecipe} />
      {selectedMeal && <MealDetails meal={selectedMeal} onClose={closeRecipe} />}
     
    </div>
  );
};

export default Recipe;
