import { Volunteer } from "../models/volunteer.models.js";
import { verifyVolunteerJWT } from "../middlewares/auth.middleware.js";
import { loginVolunteer, getDonations, acceptFoodDonation, rejectFoodDonation } from "../controllers/volunteer.controllers.js"
import { Router } from "express";

const router = Router();

router.route("/login").post(loginVolunteer)
router.route("/getDonations").get(verifyVolunteerJWT, getDonations)
router.post("/:donationId/accept",verifyVolunteerJWT, acceptFoodDonation); // Accept a donation
router.post("/:donationId/reject",verifyVolunteerJWT, rejectFoodDonation); // Reject a donation (optional)
// Reject a food donation without status change


export default router;