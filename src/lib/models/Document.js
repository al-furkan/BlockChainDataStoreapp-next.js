import mongoose from "mongoose";
const docSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  description: String,
  fileUrl: String,
  visibility: { type: String, enum: ["private","public"], default: "private" }
}, { timestamps:true });
export default mongoose.models.Document || mongoose.model("Document", docSchema);
