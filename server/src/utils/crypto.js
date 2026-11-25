import crypto from "node:crypto";
export const hashToken = (value) => crypto.createHash("sha256").update(value).digest("hex");
export const makeOtp = () => String(crypto.randomInt(100000, 1000000));
export const makeToken = () => crypto.randomBytes(32).toString("hex");
