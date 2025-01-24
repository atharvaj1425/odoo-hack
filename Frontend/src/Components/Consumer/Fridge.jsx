import React from 'react';

const Fridge = () => {
  const handleView3D = () => {
    window.open(
      'https://clara.io/player/v2/a0624cee-831c-4ecc-ba48-12300c8ffbfa?wait=true',
      '_blank'
    );
  };

  return (
    <div>
      <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center border border-black relative h-60 overflow-hidden">
        {/* Fridge Image */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-lg"
          style={{
            backgroundImage: 'url(/fridge.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full w-full">
          <button
            onClick={handleView3D}
            className="bg-black bg-opacity-50 text-white font-bold text-lg px-4 py-2 rounded-lg shadow"
          >
            View in 3D
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fridge;
