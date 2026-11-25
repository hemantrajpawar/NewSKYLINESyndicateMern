
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, maxlength: 100, default: "" },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isVerified: { type: Boolean, default: false },

  // Registration email verification
  otpHash: { type: String, select: false },
  otpExpiresAt: { type: Date, select: false },

  // Optional email MFA
  mfaEnabled: { type: Boolean, default: false },
  mfaOtpHash: { type: String, select: false },
  mfaOtpExpiresAt: { type: Date, select: false },
  mfaOtpAttempts: { type: Number, default: 0, select: false },
  mfaOtpLastSentAt: { type: Date, select: false },

  // Password reset
  passwordResetHash: { type: String, select: false },
  passwordResetExpiresAt: { type: Date, select: false },

  googleId: { type: String, sparse: true },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
