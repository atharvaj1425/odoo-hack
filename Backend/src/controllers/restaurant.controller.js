import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Restaurant } from "../models/restaurants.models.js"
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

export { loginRestaurantUser } 