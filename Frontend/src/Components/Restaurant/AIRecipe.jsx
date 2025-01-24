import React from 'react';

const AIRecipe = () => {
  return (
    <div>
      <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center border border-black relative h-60 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: 'url(/food.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} 
        ></div>
        <div className="relative z-10 p-4">
          {/* Content can go here */}
        </div>
      </div>
    </div>
  );
}

export default AIRecipe;
