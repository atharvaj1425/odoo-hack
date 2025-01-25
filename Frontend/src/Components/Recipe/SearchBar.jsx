import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  return (
    <div
      className="flex justify-center items-center py-8 bg-cover bg-center h-80"
      style={{ backgroundImage: 'url(/bg.jpg)' }}
    >
      <div className="text-center">
        <div className="text-white text-3xl font-semibold mb-11 mt-2">
        Let’s Chat, Cook, and Savor – Your Recipe Adventure Starts Here!
        </div>
        
        <div className="flex items-center rounded-lg shadow-lg w-full max-w-3xl">
          <input
            type="text"
            className="p-3 w-full rounded-l-lg focus:outline-none text-gray-700"
            placeholder="Enter an ingredient"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="button"
            className="p-3 bg-green-500 text-white rounded-r-lg hover:bg-green-600 focus:outline-none"
            onClick={handleSearch}
          >
            <img src="/code.png" alt="Search" className="w-6 h-6 object-contain" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
