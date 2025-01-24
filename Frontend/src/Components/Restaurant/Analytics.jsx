import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';

// Registering necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

const Analytics = () => {
  // Demo data for wasted food (Line chart)
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // months
    datasets: [
      {
        label: 'Wasted Food (kg)',
        data: [20, 25, 30, 35, 40, 45, 50], // demo data
        fill: false,
        borderColor: '#34D399', // Tailwind Green
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: '#34D399',
      },
    ],
  };

  // Function to generate dynamic color for each bar
  const getBarColor = (value) => {
    if (value < 10) return '#FF6347'; // Tomato color for low values
    if (value < 20) return '#FFA500'; // Orange for medium values
    return '#32CD32'; // Lime green for high values
  };

  // Demo data for food optimization (Bar chart)
  const barData = {
    labels: ['Rice', 'Wheat', 'Vegetables', 'Fruits', 'Meat', 'Dairy'], // food names
    datasets: [
      {
        label: 'Optimized Food (kg)',
        data: [15, 20, 10, 12, 8, 5], // demo data
        backgroundColor: [ // Dynamic color array
          getBarColor(15),
          getBarColor(20),
          getBarColor(10),
          getBarColor(12),
          getBarColor(8),
          getBarColor(5),
        ],
        borderColor: '#FF6347', // Border color
        borderWidth: 1,
      },
    ],
  };

  // Options for the charts
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Food Analytics',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month', // For the Line chart
        },
      },
      y: {
        title: {
          display: true,
          text: 'Wasted Food (kg)', // For the Line chart
        },
        beginAtZero: true,
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Food Optimized (kg)',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Food Name', // For the Bar chart
        },
      },
      y: {
        title: {
          display: true,
          text: 'Optimized Food (kg)', // For the Bar chart
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="flex justify-between space-x-8">
        {/* Separate white container for Line Chart for Wasted Food */}
        <div className="w-1/2 bg-white border-2 border-black p-4 rounded-lg shadow-lg">
          <h3 className="text-lg text-center mb-2">Wasted Food Over Time</h3>
          <Line data={lineData} options={options} />
        </div>

        {/* Separate white container for Bar Chart for Optimized Food */}
        <div className="w-1/2 bg-white border-2 border-black p-4 rounded-lg shadow-lg">
          <h3 className="text-lg text-center mb-2">Total Optimized Food (kg)</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </>
  );
};

export default Analytics;
