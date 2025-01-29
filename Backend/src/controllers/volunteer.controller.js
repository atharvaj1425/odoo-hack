import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {FoodItem } from "../models/foodItems.models.js"
import { FoodDonation } from "../models/fooddonation.models.js";
import { Volunteer } from "../models/volunteer.models.js";

export const generateAccessToken = async(userId) => {
    try{
        const user = await Volunteer.findById(userId);
        const accessToken = user.generateAccessToken();
        // const refreshToken = user.generateRefreshToken();
        // user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false});
        return { accessToken };
}   catch (error) {
        throw new ApiError(500, "Failed to generate tokens");
    }
} 

const loginVolunteer = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) throw new ApiError(400, "Email is required");
    if (!password) throw new ApiError(400, "Password is required");

    const user = await Volunteer.findOne({ email });
    if (!user) throw new ApiError(404, "User not found, Unauthorized");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid password");

    const { accessToken } = await generateAccessToken(user._id);

    const foodItems = await FoodItem.find({ user: user._id });

    // Update status for all food items and include them in the response
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

            // Update the database only if the status has changed
            if (item.status !== newStatus) {
                await FoodItem.findByIdAndUpdate(
                    item._id,
                    { $set: { status: newStatus } },
                    { new: true }
                );
            }

            // Always return the food item with its updated status
            return { ...item._doc, status: newStatus };
        })
    );

    const loggedInUser = await Volunteer.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    loggedInUser,
                    accessToken,
                    updatedFoodItems, // Return all food items
                },
                "User logged in successfully"
            )
        );
});

// Get all food donations
const getAllFoodDonations = asyncHandler(async (req, res) => {
    const { volunteerId } = req.query;

    if (!volunteerId) {
        throw new ApiError(400, "Volunteer ID is required");
    }

    // Check if the volunteer exists
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
        throw new ApiError(404, "Volunteer not found");
    }

    // Fetch all food donations with "Pending" status
    const foodDonations = await FoodDonation.find({ status: "Pending" })
        .populate("restaurantUser", "name") // Always populate restaurantUser
        .populate("volunteer", "name email") // Populate volunteer if it's assigned
        .sort({ createdAt: -1 }); // Sort by latest

    return res.status(200).json(new ApiResponse(200, foodDonations, "Food donations fetched successfully"));
});


// Accept food donation by volunteer
const acceptFoodDonation = asyncHandler(async (req, res) => {
    const { donationId } = req.params; // Donation ID from URL
    const { volunteerId } = req.body; // Volunteer ID from request body

    if (!(donationId && volunteerId)) {
        throw new ApiError(400, "Donation ID and Volunteer ID are required");
    }

    // Check if the volunteer exists
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
        throw new ApiError(404, "Volunteer not found");
    }

    // Find the food donation
    const foodDonation = await FoodDonation.findById(donationId);

    if (!foodDonation) {
        throw new ApiError(404, "Food donation not found");
    }

    // Check if the donation is already accepted
    if (foodDonation.status !== "Pending") {
        throw new ApiError(400, "This food donation has already been accepted or is no longer pending");
    }

    // Update the donation with the volunteer ID and change the status to "Accepted"
    foodDonation.volunteer = volunteerId;
    foodDonation.status = "Accepted";
    await foodDonation.save();

    return res.status(200).json(new ApiResponse(200, foodDonation, "Food donation accepted successfully"));
});

// Reject food donation by volunteer (optional)
const rejectFoodDonation = asyncHandler(async (req, res) => {
    const { donationId } = req.params; // Donation ID from URL

    if (!donationId) {
        throw new ApiError(400, "Donation ID is required");
    }

    // Find the food donation to ensure it exists
    const foodDonation = await FoodDonation.findById(donationId);

    if (!foodDonation) {
        throw new ApiError(404, "Food donation not found");
    }

    // Do not update the status; just confirm the donation exists
    return res.status(200).json(
        new ApiResponse(200, null, "Food donation removed from your view")
    );
});

export { loginVolunteer, getAllFoodDonations, rejectFoodDonation, acceptFoodDonation }