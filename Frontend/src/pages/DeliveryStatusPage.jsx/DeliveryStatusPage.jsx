import React, { useEffect, useState } from "react";
import axios from "axios";

const DeliveryStatusPage = () => {
    const [deliveryStatus, setDeliveryStatus] = useState([]);

    useEffect(() => {
        const fetchDeliveryStatus = async () => {
            try {
                const response = await axios.get("/api/v1/restaurants/deliveryStatus", {
                    withCredentials: true,
                });
                if (response.data.success) {
                    setDeliveryStatus(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching delivery status:", error);
            }
        };

        fetchDeliveryStatus();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "Accepted": return "text-green-600 font-bold";
            case "Out for Delivery": return "text-yellow-600 font-bold";
            case "Completed": return "text-blue-600 font-bold";
            case "Expired": return "text-red-600 font-bold";
            default: return "text-gray-600";
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Delivery Status</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-3">Food Name</th>
                            <th className="border border-gray-300 p-3">Quantity</th>
                            <th className="border border-gray-300 p-3">Food Type</th>
                            <th className="border border-gray-300 p-3">Expiry Date</th>
                            <th className="border border-gray-300 p-3">Pick-up Date</th>
                            <th className="border border-gray-300 p-3">Accepted By</th>
                            <th className="border border-gray-300 p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveryStatus.length > 0 ? (
                            deliveryStatus.map((item) => (
                                <tr key={item._id} className="border border-gray-300">
                                    <td className="border border-gray-300 p-3">{item.foodName}</td>
                                    <td className="border border-gray-300 p-3">{item.quantity}</td>
                                    <td className="border border-gray-300 p-3">{item.foodType}</td>
                                    <td className="border border-gray-300 p-3">{new Date(item.expiryDate).toLocaleDateString()}</td>
                                    <td className="border border-gray-300 p-3">{new Date(item.schedulePickUp).toLocaleDateString()}</td>
                                    <td className="border border-gray-300 p-3">{item.acceptedBy || "N/A"}</td>
                                    <td className={`border border-gray-300 p-3 ${getStatusColor(item.status)}`}>{item.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center p-4">No delivery status available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeliveryStatusPage;
