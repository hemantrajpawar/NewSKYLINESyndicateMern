import ContactEnquiry from "../models/ContactEnquiry.js";
export async function createContact(req, res) {
  const { name, email = "", phone = "", interest = "", method = "", message, consent } = req.body;
  if (!String(name || "").trim() || String(message || "").trim().length < 10 || consent !== true || (!String(email).trim() && !String(phone).trim())) {
    return res.status(400).json({ message: "Please complete the required fields and accept the privacy notice" });
  }
  const enquiry = await ContactEnquiry.create({ name, email, phone, interest, method, message, consent });
  res.status(201).json({ message: "Enquiry saved", id: enquiry._id });
}
