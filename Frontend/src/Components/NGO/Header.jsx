import React from "react";
import { TrendingUp, Users, Home, Leaf } from "lucide-react";

const Header = () => {
  const stats = [
    {
      title: "Total Meals Served",
      metric: "25,000 ",
      icon: <TrendingUp className="h-10 w-10 text-blue-600" />,
      color: "border-blue-600",
    },
    {
      title: "People Impacted",
      metric: "5,000",
      icon: <Users className="h-10 w-10 text-green-600" />,
      color: "border-green-600",
    },
    {
      title: "Active Donors",
      metric: "150",
      icon: <Home className="h-10 w-10 text-purple-600" />,
      color: "border-purple-600",
    },
    {
      title: "Waste Reduced (kg)",
      metric: "2,650",
      icon: <Leaf className="h-10 w-10 text-emerald-600" />,
      color: "border-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`bg-white shadow rounded-lg p-4 text-center border ${stat.color}`}
        >
          <h3 className="text-lg font-semibold flex items-center justify-center mb-2">
            {stat.icon}
            <span className="ml-2">{stat.title}</span>
          </h3>
          <p className="text-2xl font-bold text-gray-700">{stat.metric}</p>
        </div>
      ))}
    </div>
  );
};

export default Header;
