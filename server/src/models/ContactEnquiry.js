import mongoose from "mongoose";
const contactEnquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, trim: true, lowercase: true, maxlength: 160, default: "" },
  phone: { type: String, trim: true, maxlength: 40, default: "" },
  interest: { type: String, trim: true, maxlength: 120, default: "" },
  method: { type: String, trim: true, maxlength: 80, default: "" },
  message: { type: String, required: true, trim: true, maxlength: 5000 },
  consent: { type: Boolean, required: true },
  status: { type: String, default: "new" },
}, { timestamps: true });
export default mongoose.model("ContactEnquiry", contactEnquirySchema);
