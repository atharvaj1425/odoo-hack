import { Router } from "express";
import { loginNgoUser, acceptDonation, rejectDonation, donationRequest } from "../controllers/ngo.controller.js";
import { getFoodDonations } from "../controllers/ngo.controller.js";
import { verifyNgoJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/login").post(loginNgoUser)

router.route("/getDonations").get(verifyNgoJWT, getFoodDonations)

router.route("/postDonationRequest").post(verifyNgoJWT, donationRequest)

router.post("/accept", verifyNgoJWT, acceptDonation);

// Reject a food donation (frontend-only handling)
router.post("/reject", verifyNgoJWT, rejectDonation);

export default router;