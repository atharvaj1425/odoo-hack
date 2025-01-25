import { Router } from "express";
import { loginNgoUser } from "../controllers/ngo.controller.js";

const router = Router();

router.route("/login").post(
    loginNgoUser
)

export default router;