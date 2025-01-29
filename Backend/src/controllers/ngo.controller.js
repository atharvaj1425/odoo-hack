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

const getFoodDonations = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const ngo = await Ngo.findById(userId);
    console.log(ngo);
    const ngoPincode = ngo.pincode;
    console.log(ngoPincode);
    const minPincode = ngoPincode - 5;
    console.log(minPincode);
    const maxPincode = ngoPincode + 5;
    console.log(maxPincode);

    const donationsNearBy = await FoodDonation.find({
        restaurantPincode: { $gte: minPincode, $lte: maxPincode },
        status: "Pending"
    });
    console.log(donationsNearBy)

    return res.status(200).json(
        new ApiResponse(200, donationsNearBy, "Food donations fetched successfully")
    );
});

const acceptDonation = asyncHandler(async (req, res) => {
    const { donationId } = req.body;
    const ngoId = req.user._id;

    // Ensure donationId is provided
    if (!donationId) throw new ApiError(400, "Donation ID is required");

    // Find the donation
    const donation = await FoodDonation.findById(donationId);
    if (!donation) throw new ApiError(404, "Donation not found");

    // Ensure the donation is still pending
    if (donation.status !== "Pending") {
        throw new ApiError(400, "Only pending donations can be accepted");
    }

    // Update the donation's status and assign the NGO
    donation.status = "Accepted";
    donation.volunteer = ngoId;
    await donation.save();

    return res.status(200).json(
        new ApiResponse(200, donation, "Donation accepted successfully")
    );
});

const rejectDonation = asyncHandler(async (req, res) => {
    const { donationId } = req.body;

    // Ensure donationId is provided
    if (!donationId) throw new ApiError(400, "Donation ID is required");

    // Find the donation to confirm it exists
    const donation = await FoodDonation.findById(donationId);
    if (!donation) throw new ApiError(404, "Donation not found");

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Donation removed from your view"));
});

const donationRequest = asyncHandler(async(req,res) => {

})

export { loginNgoUser, getFoodDonations,  acceptDonation, rejectDonation, donationRequest } 