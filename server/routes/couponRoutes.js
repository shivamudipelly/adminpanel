import express from "express";
import { getCoupons, claimCoupon } from "../controllers/couponController.js";
import { rateLimitMiddleware } from "../middlewares/rateLimitMiddleware.js";
import Coupon from "../models/Coupon.js";

const router = express.Router();

router.get("/", getCoupons); // Get available coupons
router.post("/claim", rateLimitMiddleware, claimCoupon); // Claim a coupon with abuse prevention
router.put('/:couponId', async (req, res) => {
    const { couponId } = req.params;
    const { isClaimed } = req.body; // isActive will toggle the availability of the coupon
console.log(couponId, isClaimed);

    try {
        // Find the coupon by ID
        const coupon = await Coupon.findById(couponId);

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        // Update the coupon's 'isClaimed' status based on `isActive`
        coupon.isClaimed = isClaimed;

        if (isClaimed) {
            // Only set claimedAt when the coupon is claimed
            coupon.claimedAt = new Date(); 
            // Assuming you are using authentication, the user's ID would be in req.user
            coupon.claimedBy = req.ip;  // Update with the user's ID, not req.ips
        } else {
            // Reset claimed fields when deactivating
            coupon.claimedAt = null; 
            coupon.claimedBy = null;
        }

        // Save the coupon with updated status
        await coupon.save();

        res.status(200).json({ message: 'Coupon availability updated successfully', coupon });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating coupon status' });
    }
});

export default router;
