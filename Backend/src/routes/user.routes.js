import { Router } from "express";
import { loginUser } from "../controllers/user.controller.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
import { addFoodItem,getFoodItems } from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(
    loginUser
)

router.route("/addFoodItem").post(verifyUserJWT, addFoodItem)
router.route("/getFoodItems").get(verifyUserJWT, getFoodItems)

export default router;