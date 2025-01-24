import React from 'react';

const Header_1 = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {/* Expiring Soon Box */}
      <div className="bg-white shadow rounded-lg p-4 text-center border border-black">
        <h3 className="text-lg font-semibold flex items-center justify-center">
          <img src="/expiry.png" alt="Expiring Soon" className="mr-2 w-6 h-6" />
          Expiring Soon
        </h3>
        <p className="text-2xl font-bold">18</p>
        <span className="text-green-600 text-sm font-bold">+30% since yesterday</span>
      </div>

      {/* Waste Prevented Box */}
      <div className="bg-white shadow rounded-lg p-4 text-center border border-black">
        <h3 className="text-lg font-semibold flex items-center justify-center">
          <img src="/garbage.png" alt="Waste Prevented" className="mr-2 w-6 h-6" />
          Waste Prevented
        </h3>
        <p className="text-2xl font-bold">12 kg</p>
        <span className="text-green-600 text-sm font-bold">+8% since last week</span>
      </div>

      {/* Impact Box */}
      <div className="bg-white shadow rounded-lg p-4 text-center border border-black">
        <h3 className="text-lg font-semibold flex items-center justify-center">
          <img src="/target.png" alt="Impact" className="mr-2 w-6 h-6" />
          Impact
        </h3>
        <p className="text-2xl font-bold">100 kg</p>
        <span className="text-red-600 text-sm font-bold">-5% CO₂ emissions</span>
      </div>

      {/* Money Saved Box */}
      <div className="bg-white shadow rounded-lg p-4 text-center border border-black">
        <h3 className="text-lg font-semibold flex items-center justify-center">
          <img src="/money.png" alt="Money Saved" className="mr-2 w-6 h-6" />
          Money Saved
        </h3>
        <p className="text-2xl font-bold">₹5,000</p>
        <span className="text-green-600 text-sm font-bold">+10% than last month</span>
      </div>
    </div>
  );
};

export default Header_1;
