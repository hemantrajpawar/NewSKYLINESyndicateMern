import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true, trim: true, maxlength: 160 },
  clientName: { type: String, required: true, trim: true, maxlength: 120 },
  location: { type: String, required: true, trim: true, maxlength: 160 },
  service: { type: String, required: true, trim: true, maxlength: 100 },
  contact: { type: String, trim: true, maxlength: 160, default: "" },
  notes: { type: String, required: true, trim: true, maxlength: 5000 },
  status: { type: String, default: "Intake logged" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
}, { timestamps: true });
export default mongoose.model("Project", projectSchema);
