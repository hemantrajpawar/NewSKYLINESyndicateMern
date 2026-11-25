
import { Router } from "express";

import {
  forgotPassword,
  googleCallback,
  googleStart,
  login,
  logout,
  me,
  register,
  resendOtp,
  resetPassword,
  verifyOtp,
  verifyMfaLogin,
  startMfaChange,
  confirmMfaChange,
} from "../controllers/authController.js";

import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

router.post("/login", login);
router.post("/verify-mfa", verifyMfaLogin);

router.get("/me", requireAuth, me);
router.post("/logout", requireAuth, logout);

router.post("/mfa/start-change", requireAuth, startMfaChange);
router.post("/mfa/confirm-change", requireAuth, confirmMfaChange);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/google", googleStart);
router.get("/google/callback", googleCallback);

export default router;
