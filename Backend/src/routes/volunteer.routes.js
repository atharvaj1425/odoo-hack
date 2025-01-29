import { Volunteer } from "../models/volunteer.models.js";
import { verifyVolunteerJWT } from "../middlewares/auth.middleware.js";
import { loginVolunteer, getAllFoodDonations, rejectFoodDonation, acceptFoodDonation } from "../controllers/volunteer.controller.js"
import { Router } from "express";

const router = Router();

router.route("/login").post(loginVolunteer)
router.route("/getDonations").get(verifyVolunteerJWT, getAllFoodDonations)
router.post("/:donationId/accept",verifyVolunteerJWT, acceptFoodDonation); // Accept a donation
router.post("/:donationId/reject",verifyVolunteerJWT, rejectFoodDonation); // Reject a donation (optional)
// Reject a food donation without status change


export default router;