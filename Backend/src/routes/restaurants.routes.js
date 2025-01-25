import { Router } from "express";
import { loginRestaurantUser } from "../controllers/restaurant.controller.js";

const router = Router();

router.route("/login").post(
    loginRestaurantUser
)

export default router;