import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { Restaurant } from "../models/restaurants.models.js"
import { Ngo } from "../models/ngo.models.js"

export const verifyUserJWT =  asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token) {
            throw new ApiError(401, "Unauthorized, token not found");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password");
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized, token not valid");
    }
});

export const verifyRestaurantJWT =  asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token) {
            throw new ApiError(401, "Unauthorized, token not found");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await Restaurant.findById(decodedToken?._id).select("-password");
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized, token not valid");
    }
});

export const verifyNgoJWT =  asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token) {
            throw new ApiError(401, "Unauthorized, token not found");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await Ngo.findById(decodedToken?._id).select("-password");
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized, token not valid");
    }
});