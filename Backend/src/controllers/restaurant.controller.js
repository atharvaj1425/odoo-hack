import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Restaurant } from "../models/restaurants.models.js"
import { FoodDonation } from "../models/fooddonation.models.js";
import { RestaurantFoodItem } from "../models/restaurantFoodItems.models.js";
//import { uploadToCloudinary  } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const generateAccessToken = async(userId) => {
    try{
        const user  = await Restaurant.findById(userId);
        const accessToken = user.generateAccessToken();
        // const refreshToken = user.generateRefreshToken();
        // user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false});
        return { accessToken };
}   catch (error) {
        throw new ApiError(500, "Failed to generate tokens");
    }
}

const loginRestaurantUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email){
        throw new ApiError(400, "Email is required");
    }
    if(!password){
        throw new ApiError(400, "Password is required");
    }
    const user = await Restaurant.findOne({
        email
    })
    if(!user){
        throw new ApiError(404, "User not found, Unauthorised");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid password");
    }
    const {accessToken} = await generateAccessToken(user._id)
    const loggedInUser = await Restaurant.findById(user._id).select("-password");
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    // .cookie("refreshToken", refreshToken, options)  
    .json(
        new ApiResponse(200, 
            {
                user: loggedInUser, accessToken
            },
            "User logged in successfully")
    )
})

const getFoodItems = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Assuming `req.user` is populated by authentication middleware

    const foodItems = await RestaurantFoodItem.find({ restaurantUser: userId });


    // Update statuses for all food items
    const updatedFoodItems = await Promise.all(
        foodItems.map(async (item) => {
            const today = new Date();
            const expiry = new Date(item.expiryDate);
            const diffTime = expiry - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let newStatus = "";
            if (diffDays > 7) newStatus = "good";
            else if (diffDays <= 7 && diffDays >= 0) newStatus = "expiring soon";
            else newStatus = "expired";

            if (item.status !== newStatus) {
                await RestaurantFoodItem.findByIdAndUpdate(
                    item._id,
                    { $set: { status: newStatus } },
                    { new: true }
                );
            }

            return { ...item._doc, status: newStatus };
        })
    );

    return res.status(200).json(new ApiResponse(200, updatedFoodItems, "Food items fetched successfully"));
});

const addFoodItem = asyncHandler(async (req, res) => {
    const updateFoodItemStatus = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate); // Converts "YYYY-MM-DD" to a valid Date object
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 7) {
            return "good";
        } else if (diffDays <= 7 && diffDays >= 0) {
            return "expiring soon";
        } else {
            return "expired";
        }
    };

    const { name, quantity, manufacturingDate, expiryDate } = req.body;

    // Convert normal dates to ISO format
    const manufacturingDateISO = new Date(manufacturingDate).toISOString();
    const expiryDateISO = new Date(expiryDate).toISOString();

    // Validate input
    if (!(name && quantity && manufacturingDateISO && expiryDateISO)) {
        throw new ApiError(400, "All fields are required");
    }

    // Determine status
    const status = updateFoodItemStatus(expiryDate);

    // Create and save the new food item
    const newFoodItem = new RestaurantFoodItem({
        name,
        quantity,
        manufacturingDate: manufacturingDateISO,
        expiryDate: expiryDateISO,
        status,
        restaurantUser: req.user._id, // Attach user reference
    });

    await newFoodItem.save();

    res.status(201).json(newFoodItem);
});

const donateFoodItem = asyncHandler(async(req, res) => {
    const { foodName, quantity, expiryDate, schedulePickUp } = req.body;
    if(!(foodName && quantity && expiryDate && schedulePickUp )) {
        throw new ApiError(400, "All fields are required");
    }
    const currentDate = new Date();
    const inputExpiryDate = new Date(expiryDate);

    if (inputExpiryDate <= currentDate) {
        throw new ApiError(400, "Expiry date must be at least one day greater than the current date");
    }

    // Continue with the rest of the donation logic
    const restaurant = await Restaurant.findById(req.user._id).select("name pincode");

    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found");
    }

    const foodDonation = new FoodDonation({
        foodName,
        quantity,
        expiryDate: inputExpiryDate,
        schedulePickUp,
        restaurantUser: req.user._id,
        restaurantName: restaurant.name,
        restaurantPincode: restaurant.pincode
    });

    await foodDonation.save();

    return res.status(201).json(new ApiResponse(201, foodDonation, "Food item donated successfully"));
})

export { loginRestaurantUser, addFoodItem, getFoodItems, donateFoodItem } 