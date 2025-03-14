import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  isClaimed: { type: Boolean, default: false },
  claimedBy: { type: String, default: null }, // Stores IP or Session ID
  createdAt: { type: Date, default: Date.now }, // Timestamp when coupon is created
  claimedAt: { type: Date, default: null }, // Timestamp when coupon is claimed, initially null
});

export default mongoose.model("Coupon", couponSchema);
