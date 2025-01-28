import mongoose, { Schema } from 'mongoose';

const restaurantFoodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    manufacturingDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['good', 'expiring soon', 'expired'],
        required: true
    },
    restaurantUser: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    }
}, {
    timestamps: true
});

export const RestaurantFoodItem = mongoose.model('RestaurantFoodItem', restaurantFoodItemSchema);