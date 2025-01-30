import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/Homepage/HomePage'
import ConsumerPage from './pages/ConsumerPage/ConsumerPage';
import RetailerPage from './pages/RetailerPage/RetailerPage';
import VolunteerPage from './pages/VolunteerPage/VolunteerPage.jsx'
import DeliveryStatusPage from './pages/DeliveryStatusPage.jsx/DeliveryStatusPage.jsx';
import VolunteerCurrentPage from './pages/VolunteerPage/VolunteerCurrentDonation.jsx'
import VolunteerHistoryPage from './pages/VolunteerPage/VolunteerDonationHistory.jsx'
import AddItem from './pages/userAddItem/AddItem';
import DailyPrice from './pages/DailyPricePage/DailyPrice';
import FoodDetection from './pages/FoodDetection/FoodDetection';
import Recipe from './pages/Recipe/Recipe';
import FoodDonation from './pages/FoodDonation/FoodDonation';
import Ngo from './pages/NGO_Page/Ngo';
import { ChakraProvider } from '@chakra-ui/react';
import Donation_page from './pages/DonationPage/Donation_page.jsx';
import DonateSingleMeal from './pages/DonateSingleMeal/donate.jsx';
import GetSingleMeal from './pages/GetSingleMealPage/getSingleMeal.jsx';
import NgoCurrentDonationPage from './pages/NgoCurrentDonationPage/currentdonation.jsx'



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/consumer/getSingleMeal" element={<GetSingleMeal />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/consumer" element={<ConsumerPage />} />
          <Route path="/retailer" element={<RetailerPage />} />
          <Route path="/daily-price" element={<DailyPrice/>} />
          <Route path="/form" element={<FoodDetection/>} />
          <Route path="/single-meal" element={<DonateSingleMeal/>} />
          <Route path="/consumer-form" element={<AddItem/>} />
          <Route path="/recipe" element={<Recipe/>} />
          <Route path="/donation" element={<FoodDonation/>} />
          <Route path="/ngo" element={<Ngo/>} />
          <Route path="/donate" element={<Donation_page/>} />
          <Route path="/volunteer-current-donation" element={<VolunteerCurrentPage/>} />
          <Route path="/volunteer-donation-history" element={<VolunteerHistoryPage/>} />
          <Route path="/delivery-status" element={<DeliveryStatusPage />} />
          <Route path="/current-donation" element={<NgoCurrentDonationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
