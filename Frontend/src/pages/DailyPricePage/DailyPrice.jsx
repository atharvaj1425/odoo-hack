import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { SiMarketo } from "react-icons/si";  // Import the SiMarketo icon
import { FaHourglassEnd } from "react-icons/fa6";

const DailyPrice = () => {
  const [district, setDistrict] = useState('');
  const [market, setMarket] = useState('');
  const [commodity, setCommodity] = useState('');
  const [state, setState] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchData = () => {
    if (!district || !market || !commodity || !state) {
      toast.error('Please fill in all fields.'); 
      return;
    }

    setLoading(true);

    
    const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001941fd059a6204b09578c722339d3694d&format=json&filters%5Bstate.keyword%5D=${state}&filters%5Bdistrict%5D=${district}&filters%5Bmarket%5D=${market}&filters%5Bcommodity%5D=${commodity}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data.records && data.records.length > 0) {
            
            setData(data.records);
        } else {
           
            setData([]); 
            toast.error('No data found for the given criteria.'); 
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching data:', error);
        toast.error('Error fetching data. Please try again later.'); 
      });
  };

  
  const filteredData = data.filter((item) => {
    return (
      (district === '' || item.district.toLowerCase().includes(district.toLowerCase())) &&
      (market === '' || item.market.toLowerCase().includes(market.toLowerCase())) &&
      (commodity === '' || item.commodity.toLowerCase().includes(commodity.toLowerCase())) &&
      (state === '' || item.state.toLowerCase().includes(state.toLowerCase()))
    );
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 flex items-center">
          <SiMarketo className="mr-3 text-green-600" /> Daily Market Price Data
        </h2>
      </div>

      {/* Input Fields */}
      <div className="mb-6 space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter state"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">District:</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Enter district"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Market:</label>
          <input
            type="text"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            placeholder="Enter market"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Commodity:</label>
          <input
            type="text"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            placeholder="Enter commodity"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleFetchData}
          className="w-full p-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 flex justify-center items-center text-xl "
        >
          Get Data <FaHourglassEnd className="ml-2 text-white" />
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
        <img src="/load.gif" alt="Loading..." className="w-20 h-20" />
      </div>
      ) : (
        <div>
          {/* Display Data */}
          {filteredData.length > 0 ? (
            <ul className="space-y-4">
              {filteredData.map((item, index) => (
                <li key={index} className="bg-white p-5 border border-gray-200 rounded-lg shadow-lg">
                  <p className="font-semibold text-gray-800">State: {item.state}</p>
                  <p className="font-semibold text-gray-800">District: {item.district}</p>
                  <p className="text-gray-600">Market: {item.market}</p>
                  <p className="text-gray-600">Commodity: {item.commodity}</p>
                  <p className="text-gray-600">Min Price: {item.min_price}</p>
                  <p className="text-gray-600">Max Price: {item.max_price}</p>
                  <p className="text-gray-600">Modal Price: {item.modal_price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No matching data found.</p>
          )}
        </div>
      )}

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default DailyPrice;
