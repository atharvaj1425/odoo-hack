import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';

// Registering necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

const Analytics = () => {
  // Updated data for "up-down-up" pattern in Wasted Food (Line chart)
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // months
    datasets: [
      {
        label: 'Wasted Food (kg)',
        data: [10, 30, 20, 40, 25, 50, 35], // up-down-up pattern
        fill: false,
        borderColor: '#34D399', // Tailwind Green
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: '#34D399',
      },
    ],
  };

  // Function to generate dynamic color for each bar
  const generateDynamicColors = (data) => {
    return data.map((value) => {
      if (value < 10) return '#FF6347'; // Tomato color for low values
      if (value < 15) return '#FFA500'; // Orange for medium-low values
      if (value < 20) return '#FFD700'; // Gold for medium values
      return '#32CD32'; // Lime green for high values
    });
  };

  // Updated data for "up-down-up" pattern in Optimized Food (Bar chart)
  const barData = {
    labels: ['Rice', 'Wheat', 'Vegetables', 'Fruits', 'Meat', 'Dairy'], // food names
    datasets: [
      {
        label: 'Optimized Food (kg)',
        data: [12, 8, 15, 10, 18, 14], // up-down-up pattern
        backgroundColor: generateDynamicColors([12, 8, 15, 10, 18, 14]), // Dynamic colors
        borderColor: generateDynamicColors([12, 8, 15, 10, 18, 14]), // Matching border color
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
