import { Router } from "express";
import { loginNgoUser, acceptFoodDonation, rejectFoodDonation, donationRequest, getDonationHistory, getActiveDonation, updateDonationStatus } from "../controllers/ngo.controller.js";
import { getAllFoodDonations } from "../controllers/ngo.controller.js";
import { verifyNgoJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/login").post(loginNgoUser)

router.route("/getDonations").get(verifyNgoJWT, getAllFoodDonations)

router.route("/postDonationRequest").post(verifyNgoJWT, donationRequest)

router.post("/:donationId/accept",verifyNgoJWT, acceptFoodDonation); // Accept a donation
router.post("/:donationId/reject",verifyNgoJWT, rejectFoodDonation); // Reject a donation (optional)
// Reject a food donation without status change
router.route("/donation-history").get(verifyNgoJWT, getDonationHistory);
router.route("/active-donation").get(verifyNgoJWT, getActiveDonation);
router.put('/update-status/:donationId',verifyNgoJWT, updateDonationStatus);
export default router;