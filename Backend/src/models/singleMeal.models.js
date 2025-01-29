import mongoose, {model, Schema} from "mongoose";

const singleMealSchema = new mongoose.Schema({
    mealDescription: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    schedulePickUp: {
        type: Date,
        required: true,
    },
    donor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true});

export const SingleMeal = new mongoose.model("SingleMeal", singleMealSchema)