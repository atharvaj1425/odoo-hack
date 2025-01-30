import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Ngo } from "../models/ngo.models.js"
import { FoodDonation } from "../models/fooddonation.models.js";
//import { uploadToCloudinary  } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessToken = async(userId) => {
    try{
        const user  = await Ngo.findById(userId);
        const accessToken = user.generateAccessToken();
        // const refreshToken = user.generateRefreshToken();
        // user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false});
        return { accessToken };
}   catch (error) { 
        throw new ApiError(500, "Failed to generate tokens");
    }
} 

const loginNgoUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email){
        throw new ApiError(400, "Email is required");
    }
    if(!password){
        throw new ApiError(400, "Password is required");
    }
    const user = await Ngo.findOne({
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
    const loggedInUser = await Ngo.findById(user._id).select("-password");
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

// const getFoodDonations = asyncHandler(async(req, res) => {
//     const userId = req.user._id;
//     const ngo = await Ngo.findById(userId);
//     console.log(ngo);
//     const ngoPincode = ngo.pincode;
//     console.log(ngoPincode);
//     const minPincode = ngoPincode - 5;
//     console.log(minPincode);
//     const maxPincode = ngoPincode + 5;
//     console.log(maxPincode);

//     const donationsNearBy = await FoodDonation.find({
//         restaurantPincode: { $gte: minPincode, $lte: maxPincode },
//         status: "Pending"
//     });
//     console.log(donationsNearBy)

//     return res.status(200).json(
//         new ApiResponse(200, donationsNearBy, "Food donations fetched successfully")
//     );
// });

// const acceptDonation = asyncHandler(async (req, res) => {
//     const { donationId } = req.body;
//     const ngoId = req.user._id;

//     // Ensure donationId is provided
//     if (!donationId) throw new ApiError(400, "Donation ID is required");

//     // Find the donation
//     const donation = await FoodDonation.findById(donationId);
//     if (!donation) throw new ApiError(404, "Donation not found");

//     // Ensure the donation is still pending
//     if (donation.status !== "Pending") {
//         throw new ApiError(400, "Only pending donations can be accepted");
//     }

//     // Update the donation's status and assign the NGO
//     donation.status = "Accepted";
//     donation.volunteer = ngoId;
//     await donation.save();

//     return res.status(200).json(
//         new ApiResponse(200, donation, "Donation accepted successfully")
//     );
// });

// const rejectDonation = asyncHandler(async (req, res) => {
//     const { donationId } = req.body;

//     // Ensure donationId is provided
//     if (!donationId) throw new ApiError(400, "Donation ID is required");

//     // Find the donation to confirm it exists
//     const donation = await FoodDonation.findById(donationId);
//     if (!donation) throw new ApiError(404, "Donation not found");

//     return res
//         .status(200)
//         .json(new ApiResponse(200, null, "Donation removed from your view"));
// });

const donationRequest = asyncHandler(async(req,res) => {
})

// Get all food donations
const getAllFoodDonations = asyncHandler(async (req, res) => {
    const { ngoId } = req.query;

    if (!ngoId) {
        throw new ApiError(400, "Ngo ID is required");
    }

    // Check if the volunteer exists
    const ngo = await Ngo.findById(ngoId);
    if (!ngo) {
        throw new ApiError(404, "Ngo not found");
    }

    // Fetch all food donations with "Pending" status
    const foodDonations = await FoodDonation.find({ status: "Pending" })
        .populate("restaurantUser", "name") // Always populate restaurantUser
        // .populate("volunteer", "name email") // Populate volunteer if it's assigned
        .sort({ createdAt: -1 }); // Sort by latest

    return res.status(200).json(new ApiResponse(200, foodDonations, "Food donations fetched successfully"));
});

// Accept food donation by volunteer
const acceptFoodDonation = asyncHandler(async (req, res) => {
    const { donationId } = req.params; // Donation ID from URL
    const { ngoId } = req.body; // Volunteer ID from request body

    if (!(donationId && ngoId)) {
        throw new ApiError(400, "Donation ID and ngoId ID are required");
    }

    // Check if the volunteer exists
    const ngo = await Ngo.findById(ngoId);
    if (!ngo) {
        throw new ApiError(404, "ngo not found");
    }

    // Check if the volunteer already has an active donation (i.e., "Accepted" or "Out for Delivery")
    const existingDonation = await FoodDonation.findOne({
        acceptedById: ngoId,
        status: { $in: ["Accepted", "Out for Delivery"] }, // Ongoing donations
    });

    if (existingDonation) {
        throw new ApiError(400, "You can only accept one donation at a time. Complete the current donation first.");
    }

    // Find the food donation
    const foodDonation = await FoodDonation.findById(donationId);

    if (!foodDonation) {
        throw new ApiError(404, "Food donation not found");
    }

    // Check if the donation is already accepted
    if (foodDonation.status !== "Pending") {
        throw new ApiError(400, "This food donation has already been accepted or is no longer pending.");
    }

    // Assign the volunteer and update status
    foodDonation.status = "Accepted";
    foodDonation.acceptedById = ngoId;
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

const getDonationHistory = asyncHandler(async(req, res) => {
    const ngoId  = req.user._id;

    if (!ngoId) {
        throw new ApiError(400, "ngoId ID is required");
    }

    // Check if the volunteer exists
    const ngo = await Ngo.findById(ngoId);
    if (!ngo) {
        throw new ApiError(404, "ngo not found");
    }

    // Fetch all donations accepted by the volunteer
    const donationHistory = await FoodDonation.find({ acceptedById: ngoId })
        .populate("restaurantUser", "name")
        .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, donationHistory, "Donation history fetched successfully"));
})

const getActiveDonation = asyncHandler(async(req, res) => {
    const ngoId  = req.user._id;

    if (!ngoId) {
        throw new ApiError(400, "ngo ID is required");
    }

    // Check if the volunteer exists
    const ngo = await Ngo.findById(ngoId);
    if (!ngo) {
        throw new ApiError(404, "ngo not found");
    }
    // Fetch the active donation for the volunteer
    const activeDonation = await FoodDonation.findOne({
        acceptedById: ngoId,
        status: { $in: ["Accepted", "Out for Delivery"] },
    })
    // .populate("restaurantUser", "name");

    if (!activeDonation) {
        throw new ApiError(404, "No active donation found");
    }
    // // Fetch all donations accepted by the volunteer
    // const donationHistory = await FoodDonation.find({ acceptedById: volunteerId, })
    //     .populate("restaurantUser", "name")
    //     .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, activeDonation, "Donation history fetched successfully"));
})

const updateDonationStatus = async (req, res) => {
    const { donationId } = req.params; // Get the donation ID from the URL parameters
    const { status } = req.body; // Get the new status from the request body
  
    try {
      // Find the donation by its ID
      const donation = await FoodDonation.findById(donationId);
  
      if (!donation) {
        return res.status(404).json({ message: 'Donation not found' });
      }
  
      // Update the donation's status
      donation.status = status;
  
      // Save the updated donation to the database
      await donation.save();
  
      // Return the updated donation
      res.status(200).json({
        message: 'Donation status updated successfully',
        data: donation,
      });
    } catch (error) {
      console.error('Error updating donation status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
export { loginNgoUser, getAllFoodDonations, rejectFoodDonation, acceptFoodDonation, getDonationHistory, getActiveDonation, donationRequest, updateDonationStatus } 