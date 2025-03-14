import Coupon from "../models/Coupon.js";

// Get available coupons
export const getCoupons = async (req, res) => {
  try {
    const availableCoupons = await Coupon.find({ isClaimed: false });
    res.json(availableCoupons);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Claim a coupon in a Round-Robin manner
export const claimCoupon = async (req, res) => {
  try {
    const userIP = req.ip; // Track user IP
    const availableCoupons = await Coupon.find({ isClaimed: false });

    if (availableCoupons.length === 0) {
      return res.status(400).json({ message: "No coupons available" });
    }

    const selectedCoupon = availableCoupons[0]; // Select first available coupon

    selectedCoupon.isClaimed = true;
    selectedCoupon.claimedBy = userIP; // Store IP for tracking
    selectedCoupon.claimedAt = new Date();
    await selectedCoupon.save();

    res.json({ message: "Coupon claimed", coupon: selectedCoupon });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

