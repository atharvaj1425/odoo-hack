import mongoose, { Schema } from "mongoose";

const foodDonationSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    schedulePickUp: {
        type: Date,
        required: true,
    },
    restaurantPincode: {
        type: Number,
        requiured: true
    },
    restaurantName: {
        type: String,
        required: true,
    },
    restaurantUser: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    }
}, {
    timestamps: true
})

export const FoodDonation = mongoose.model("FoodDonation", foodDonationSchema)