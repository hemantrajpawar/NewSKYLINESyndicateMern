import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new Error("JWT_SECRET must be set to at least 32 characters");
const PORT = Number(process.env.PORT || 5000);
await connectDatabase();
app.listen(PORT, () => console.log(`Skyline API listening on port ${PORT}`));
