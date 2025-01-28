import { Router } from "express";
import { loginRestaurantUser, donateFoodItem, addFoodItem, getFoodItems } from "../controllers/restaurant.controller.js";
import { verifyRestaurantJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/login").post(loginRestaurantUser)
router.route("/addFoodItem").post(verifyRestaurantJWT, addFoodItem)
router.route("/getfoodItems").get(verifyRestaurantJWT, getFoodItems)
router.route("/donateFood").post(verifyRestaurantJWT, donateFoodItem)

export default router;