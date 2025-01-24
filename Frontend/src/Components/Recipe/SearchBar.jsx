import React from 'react';

const SearchBar = () => {
  return (
    <div
      className="bg-cover bg-center h-64 flex flex-col justify-center items-center text-center"
      style={{ backgroundImage: 'url("/bg.jpg")' }} 
    >
      <h2 className="text-white text-3xl font-bold mb-4">
        Discover Deliciousness, One Recipe at a Time!
      </h2>
      <div className="flex">
        <input
          type="text"
          placeholder="Search recipes here ..."
          className="w-64 p-2 rounded-l-lg border border-gray-300 focus:outline-none"
        />
        <button className="bg-green-600 px-4 py-2 rounded-r-lg flex items-center justify-center">
          <img
            src="/code.png" 
            alt="Search"
            className="h-6 w-6"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
