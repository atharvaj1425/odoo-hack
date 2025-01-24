import React from "react";
import Sidebar from '../../Components/Restaurant/SideBar';
import Header from "../../Components/Restaurant/Header_1";
import FoodItemsTable from '../../Components/Restaurant/FoodItemsTable';
import AIRecipe from '../../Components/Restaurant/AIRecipe';
import NavBar from "../../Components/Restaurant/NavBar";
import Analytics from "../../Components/Restaurant/Analytics";

const RetailerPage = () => {
  return (
    <div className="animate-fadeIn">
      <NavBar />
      <div className="flex ">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <div className="flex-1 p-6 bg-green-100">
          <Header />
          
          {/* Main content section with food items and AI Recipe */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="col-span-2">
              <FoodItemsTable />
            </div>
            <AIRecipe />
          </div>

          {/* Analytics component */}
          <div className="mt-6">
            <Analytics />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetailerPage;
