import { Router } from "express";
import { loginNgoUser } from "../controllers/ngo.controller.js";
import { getFoodDonations } from "../controllers/ngo.controller.js";
import { verifyNgoJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/login").post(loginNgoUser)

router.route("/getDonations").get(verifyNgoJWT, getFoodDonations)

export default router;