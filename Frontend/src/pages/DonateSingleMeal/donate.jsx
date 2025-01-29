import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DonateSingleMeal = () => {
    const [formData, setFormData] = useState({
        mealDescription: '',
        quantity: '',
        schedulePickUp: ''
    });
    const [meals, setMeals] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/users/addMeal', formData, {
            credentials: true
            });
            setMeals((prevMeals) => [...prevMeals, response.data.data]);
            setFormData({
                mealDescription: '',
                quantity: '',
                schedulePickUp: ''
            });
            toast.success('Meal donated successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to donate meal. Please try again later.');
        }
    };

    // useEffect(() => {
    //     const fetchMeals = async () => {
    //         try {
    //             const response = await axios.get('/api/v1/users/getMeal', {
    //                 headers: {
    //                     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //                 }
    //             });
    //             setMeals(response.data.data);
    //         } catch (error) {
    //             console.error('Error fetching meals:', error);
    //         }
    //     };

    //     fetchMeals();
    // }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">Donate a Single Meal</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="mealDescription" className="block text-gray-700 font-medium mb-2">Meal Description:</label>
                    <input
                        type="text"
                        id="mealDescription"
                        name="mealDescription"
                        value={formData.mealDescription}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">Quantity:</label>
                    <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="schedulePickUp" className="block text-gray-700 font-medium mb-2">Schedule Pick Up:</label>
                    <input
                        type="datetime-local"
                        id="schedulePickUp"
                        name="schedulePickUp"
                        value={formData.schedulePickUp}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 flex justify-center items-center text-xl"
                >
                    Donate
                </button>
            </form>

            {/* <h2 className="text-2xl font-bold text-center text-gray-800 mt-8">Donation History</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Meal Description</th>
                        <th className="py-2 px-4 border-b">Quantity</th>
                        <th className="py-2 px-4 border-b">Schedule Pick Up</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.map((meal) => (
                        <tr key={meal._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{meal.mealDescription}</td>
                            <td className="py-2 px-4 border-b">{meal.quantity}</td>
                            <td className="py-2 px-4 border-b">{new Date(meal.schedulePickUp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default DonateSingleMeal;