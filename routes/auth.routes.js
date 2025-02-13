import express from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import { validateSignup, validateSignin } from "../middlewares/validation.js";

const router = express.Router();

router.post("/signup", validateSignup, signUp);
router.post("/signin", validateSignin, signIn);

export default router;
