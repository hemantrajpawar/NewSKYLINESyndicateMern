import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { hashToken, makeOtp, makeToken } from "../utils/crypto.js";
import { sendMail } from "../services/mailer.js";

const issueJwt = (user) => jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

const safeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  mfaEnabled: Boolean(user.mfaEnabled),
});

export async function register(req, res) {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: "Enter a valid email address" });
  if (password.length < 8) return res.status(400).json({ message: "Password must contain at least 8 characters" });
  if (await User.exists({ email })) return res.status(409).json({ message: "An account with this email already exists" });
  const otp = makeOtp();
  const user = await User.create({ email, passwordHash: await bcrypt.hash(password, 12), otpHash: hashToken(otp), otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000) });
  try {
    await sendMail({ to: email, subject: "Verify your Skyline Syndicate account", text: `Your verification code is ${otp}. It expires in 10 minutes.` });
  } catch (error) {
    await User.findByIdAndDelete(user._id);
    throw error;
  }
  res.status(201).json({ message: "Verification code sent to your email" });
}

export async function verifyOtp(req, res) {
  const email = String(req.body.email || "").trim().toLowerCase();
  const otpCode = String(req.body.otpCode || "");
  const user = await User.findOne({ email }).select("+otpHash +otpExpiresAt");
  if (!user || !user.otpHash || !user.otpExpiresAt || user.otpExpiresAt < new Date() || user.otpHash !== hashToken(otpCode)) {
    return res.status(400).json({ message: "Invalid or expired verification code" });
  }
  user.isVerified = true; user.otpHash = undefined; user.otpExpiresAt = undefined;
  await user.save();
  res.json({ token: issueJwt(user), user: safeUser(user) });
}

export async function resendOtp(req, res) {
  const email = String(req.body.email || "").trim().toLowerCase();
  const user = await User.findOne({ email });
  if (!user || user.isVerified) return res.json({ message: "If the account needs verification, a code has been sent" });
  const otp = makeOtp();
  user.otpHash = hashToken(otp); user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  await sendMail({ to: email, subject: "Your Skyline Syndicate verification code", text: `Your verification code is ${otp}. It expires in 10 minutes.` });
  res.json({ message: "Verification code sent" });
}


export async function login(req, res) {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  const user = await User.findOne({ email }).select("+passwordHash");

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  if (!user.isVerified) {
    return res.status(403).json({
      message: "Please verify your email before signing in",
    });
  }

  // Normal login when MFA is disabled
  if (!user.mfaEnabled) {
    return res.json({
      token: issueJwt(user),
      user: safeUser(user),
    });
  }

  // Prevent repeated code requests
  if (
    user.mfaOtpLastSentAt &&
    Date.now() - user.mfaOtpLastSentAt.getTime() < 60_000
  ) {
    return res.status(429).json({
      message: "Please wait before requesting another code",
    });
  }

  const otp = makeOtp();

  user.mfaOtpHash = hashToken(otp);
  user.mfaOtpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
  user.mfaOtpAttempts = 0;
  user.mfaOtpLastSentAt = new Date();

  await user.save();

  try {
    await sendMail({
      to: user.email,
      subject: "Your Skyline Syndicate login code",
      text: `Your login verification code is ${otp}. It expires in 5 minutes. Do not share this code.`,
    });
  } catch (error) {
    user.mfaOtpHash = undefined;
    user.mfaOtpExpiresAt = undefined;
    await user.save();
    throw error;
  }

  const challengeToken = jwt.sign(
    {
      sub: user._id.toString(),
      purpose: "email-mfa",
    },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );

  res.json({
    mfaRequired: true,
    challengeToken,
    message: "A verification code has been sent to your email",
  });
}


export async function me(req, res) { res.json({ user: safeUser(req.user) }); }
export async function logout(req, res) { res.json({ message: "Signed out" }); }

export async function forgotPassword(req, res) {
  const email = String(req.body.email || "").trim().toLowerCase();
  const user = await User.findOne({ email });
  if (user) {
    const token = makeToken();
    user.passwordResetHash = hashToken(token);
    user.passwordResetExpiresAt = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();
    const link = `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password?token=${token}`;
    await sendMail({ to: email, subject: "Reset your Skyline Syndicate password", text: `Use this link within 30 minutes: ${link}` });
  }
  res.json({ message: "If an account exists with that email, a reset link has been sent" });
}

export async function resetPassword(req, res) {
  const token = String(req.body.token || "");
  const password = String(req.body.password || "");
  if (password.length < 8) return res.status(400).json({ message: "Password must contain at least 8 characters" });
  const user = await User.findOne({ passwordResetHash: hashToken(token), passwordResetExpiresAt: { $gt: new Date() } }).select("+passwordResetHash +passwordResetExpiresAt");
  if (!user) return res.status(400).json({ message: "Reset link is invalid or expired" });
  user.passwordHash = await bcrypt.hash(password, 12);
  user.passwordResetHash = undefined; user.passwordResetExpiresAt = undefined;
  await user.save();
  res.json({ message: "Password updated" });
}

export function googleStart(req, res) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CALLBACK_URL, CLIENT_URL } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CALLBACK_URL) return res.status(501).send("Google sign-in is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CALLBACK_URL.");
  const returnTo = String(req.query.returnTo || "/").slice(0, 500);
  const state = jwt.sign({ returnTo }, process.env.JWT_SECRET, { expiresIn: "10m" });
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({ client_id: GOOGLE_CLIENT_ID, redirect_uri: GOOGLE_CALLBACK_URL, response_type: "code", scope: "openid email profile", state, prompt: "select_account" }).toString();
  res.redirect(url.toString());
}
export async function googleCallback(req, res) {
  const { code, state } = req.query;
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, CLIENT_URL } = process.env;
  if (!code || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) return res.redirect(`${CLIENT_URL || "http://localhost:5173"}/login?error=google_auth_failed`);
  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ code, client_id: GOOGLE_CLIENT_ID, client_secret: GOOGLE_CLIENT_SECRET, redirect_uri: GOOGLE_CALLBACK_URL, grant_type: "authorization_code" }) });
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) throw new Error("Google token exchange failed");
    const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", { headers: { Authorization: `Bearer ${tokenData.access_token}` } });
    const profile = await profileResponse.json();
    if (!profile.email || !profile.verified_email) throw new Error("Google account email is not verified");
    const user = await User.findOneAndUpdate({ email: profile.email.toLowerCase() }, { $set: { email: profile.email.toLowerCase(), name: profile.name || "", googleId: profile.id, isVerified: true }, $setOnInsert: { passwordHash: await bcrypt.hash(makeToken(), 12) } }, { upsert: true, new: true, setDefaultsOnInsert: true });
    const jwtToken = issueJwt(user);
    let returnTo = "/";
    try { returnTo = jwt.verify(String(state || ""), process.env.JWT_SECRET).returnTo || "/"; } catch {}
    const safeReturn = returnTo.startsWith("/") && !returnTo.startsWith("//") && !returnTo.includes("\\") ? returnTo : "/";
    res.redirect(`${CLIENT_URL || "http://localhost:5173"}/auth/callback?token=${encodeURIComponent(jwtToken)}&returnTo=${encodeURIComponent(safeReturn)}`);
  } catch (error) { res.redirect(`${CLIENT_URL || "http://localhost:5173"}/login?error=google_auth_failed`); }
}


export async function verifyMfaLogin(req, res) {
  const challengeToken = String(req.body.challengeToken || "");
  const otpCode = String(req.body.otpCode || "");

  if (!/^\d{6}$/.test(otpCode)) {
    return res.status(400).json({ message: "Enter a valid six-digit code" });
  }

  let payload;

  try {
    payload = jwt.verify(challengeToken, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({
      message: "Your verification session expired. Please log in again.",
    });
  }

  if (payload.purpose !== "email-mfa") {
    return res.status(401).json({ message: "Invalid verification session" });
  }

  const user = await User.findById(payload.sub).select(
    "+mfaOtpHash +mfaOtpExpiresAt +mfaOtpAttempts"
  );

  if (!user || !user.isVerified || !user.mfaEnabled) {
    return res.status(401).json({ message: "Invalid verification session" });
  }

  if (
    !user.mfaOtpHash ||
    !user.mfaOtpExpiresAt ||
    user.mfaOtpExpiresAt < new Date()
  ) {
    return res.status(400).json({
      message: "The code has expired. Please log in again.",
    });
  }

  if (user.mfaOtpAttempts >= 5) {
    user.mfaOtpHash = undefined;
    user.mfaOtpExpiresAt = undefined;
    user.mfaOtpAttempts = 0;
    await user.save();

    return res.status(429).json({
      message: "Too many incorrect attempts. Please log in again.",
    });
  }

  if (user.mfaOtpHash !== hashToken(otpCode)) {
    user.mfaOtpAttempts += 1;
    await user.save();

    return res.status(400).json({
      message: "Incorrect verification code",
    });
  }

  // Consume the OTP before issuing the access token
  user.mfaOtpHash = undefined;
  user.mfaOtpExpiresAt = undefined;
  user.mfaOtpAttempts = 0;
  user.mfaOtpLastSentAt = undefined;
  await user.save();

  res.json({
    token: issueJwt(user),
    user: safeUser(user),
  });
}


export async function startMfaChange(req, res) {
  const action = String(req.body.action || "");
  const password = String(req.body.password || "");

  if (!["enable", "disable"].includes(action)) {
    return res.status(400).json({ message: "Invalid MFA action" });
  }

  const user = await User.findById(req.user._id).select("+passwordHash");

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  if (action === "enable" && user.mfaEnabled) {
    return res.status(400).json({ message: "MFA is already enabled" });
  }

  if (action === "disable" && !user.mfaEnabled) {
    return res.status(400).json({ message: "MFA is already disabled" });
  }

  if (
    user.mfaOtpLastSentAt &&
    Date.now() - user.mfaOtpLastSentAt.getTime() < 60_000
  ) {
    return res.status(429).json({
      message: "Please wait before requesting another code",
    });
  }

  const otp = makeOtp();

  user.mfaOtpHash = hashToken(otp);
  user.mfaOtpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
  user.mfaOtpAttempts = 0;
  user.mfaOtpLastSentAt = new Date();

  await user.save();

  await sendMail({
    to: user.email,
    subject: "Confirm your Skyline Syndicate security change",
    text: `Your code to ${action} email MFA is ${otp}. It expires in 5 minutes.`,
  });

  res.json({
    message: `A confirmation code was sent to ${user.email}`,
  });
}

export async function confirmMfaChange(req, res) {
  const action = String(req.body.action || "");
  const otpCode = String(req.body.otpCode || "");

  if (!["enable", "disable"].includes(action)) {
    return res.status(400).json({ message: "Invalid MFA action" });
  }

  if (!/^\d{6}$/.test(otpCode)) {
    return res.status(400).json({ message: "Enter a valid six-digit code" });
  }

  const user = await User.findById(req.user._id).select(
    "+mfaOtpHash +mfaOtpExpiresAt +mfaOtpAttempts"
  );

  if (!user || !user.mfaOtpHash || !user.mfaOtpExpiresAt) {
    return res.status(400).json({ message: "Request a new code first" });
  }

  if (user.mfaOtpExpiresAt < new Date()) {
    return res.status(400).json({ message: "The code has expired" });
  }

  if (user.mfaOtpAttempts >= 5) {
    user.mfaOtpHash = undefined;
    user.mfaOtpExpiresAt = undefined;
    user.mfaOtpAttempts = 0;
    await user.save();

    return res.status(429).json({ message: "Too many incorrect attempts" });
  }

  if (user.mfaOtpHash !== hashToken(otpCode)) {
    user.mfaOtpAttempts += 1;
    await user.save();

    return res.status(400).json({ message: "Incorrect verification code" });
  }

  user.mfaEnabled = action === "enable";
  user.mfaOtpHash = undefined;
  user.mfaOtpExpiresAt = undefined;
  user.mfaOtpAttempts = 0;
  user.mfaOtpLastSentAt = undefined;

  await user.save();

  res.json({
    message: `Email MFA ${user.mfaEnabled ? "enabled" : "disabled"} successfully`,
    mfaEnabled: user.mfaEnabled,
  });
}
