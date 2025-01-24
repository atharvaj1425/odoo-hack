import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

// Registering necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

const Analytics = () => {
  // Dynamic Chart Data
  const monthlyDonationsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Donations (kg)",
        data: [100, 350, 60, 250, 100, 180, 80],
        backgroundColor: "#1E3A8A",
        borderColor: "#1E3A8A",
        borderWidth: 1,
      },
    ],
  };

  const foodTypesData = {
    labels: ["Dal", "Rice", "Wheat", "Fruits", "Vegetables"],
    datasets: [
      {
        label: "Food Donated (kg)",
        data: [50, 80, 60, 40, 70],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#FFC107", "#F44336"],
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };

  const wasteReductionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Waste Reduced (kg)",
        data: [10, 60, 20, 50, 30, 70, 30],
        fill: false,
        borderColor: "#34D399",
        tension: 0.4,
      },
    ],
  };

  const profitData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Profit (₹)",
        data: [4000, 2000, 5000, 1000, 5000, 3000, 7000],
        fill: false,
        borderColor: "#F59E0B",
        tension: 0.4,
      },
    ],
  };

  // Shared Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow the graph to expand with the container
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
    scales: {
      x: { title: { display: true } },
      y: { title: { display: true }, beginAtZero: true },
    },
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Monthly Donations */}
        <div className="bg-white p-6 border-2 border-black rounded-lg shadow-lg h-96 w-full">
          <h3 className="text-lg text-center mb-4 flex items-center justify-center">
            <img src="/donation.png" alt="Donation Icon" className="w-6 h-6 mr-2" />
            Monthly Donations (kg)
          </h3>
          <Bar data={monthlyDonationsData} options={{ ...chartOptions, plugins: { title: { text: "Monthly Donations", display: true } } }} />
        </div>

        {/* Food Types Donated */}
        <div className="bg-white p-6 border-2 border-black rounded-lg shadow-lg h-96 w-full">
          <h3 className="text-lg text-center mb-4 flex items-center justify-center">
            <img src="/diet_1.png" alt="Diet Icon" className="w-6 h-6 mr-2" />
            Food Types Donated
          </h3>
          <Bar data={foodTypesData} options={{ ...chartOptions, plugins: { title: { text: "Food Types", display: true } } }} />
        </div>

        {/* Waste Reduction */}
        <div className="bg-white p-6 border-2 border-black rounded-lg shadow-lg h-96 w-full">
          <h3 className="text-lg text-center mb-4 flex items-center justify-center">
            <img src="/recycle-bin.png" alt="Recycle Icon" className="w-6 h-6 mr-2" />
            Waste Reduction (kg)
          </h3>
          <Line data={wasteReductionData} options={{ ...chartOptions, plugins: { title: { text: "Waste Reduction", display: true } } }} />
        </div>

        {/* Profit Trend */}
        <div className="bg-white p-6 border-2 border-black rounded-lg shadow-lg h-96 w-full">
          <h3 className="text-lg text-center mb-4 flex items-center justify-center">
            <img src="/profits.png" alt="Profit Icon" className="w-6 h-6 mr-2" />
            Profit from Food Received (₹)
          </h3>
          <Line data={profitData} options={{ ...chartOptions, plugins: { title: { text: "Profit Trend", display: true } } }} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
