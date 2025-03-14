import Admin from "../models/Admin.js";
import Coupon from "../models/Coupon.js";
import jwt from "jsonwebtoken";


// Admin Login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Admin not found" });

    // Direct password comparison (not recommended for production)
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new coupon
export const addCoupon = async (req, res) => {
  const { code } = req.body;
  try {
    const newCoupon = new Coupon({ code });
    await newCoupon.save();
    res.status(201).json({ message: "Coupon added" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all coupons
export const getAdminCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    // Fetch total coupons, active coupons, total admins (users of the admin system)
    const totalCoupons = await Coupon.countDocuments();
    const totalAdmins = await Admin.countDocuments();  // Assuming Admin model exists for admin data
    const activeCoupons = await Coupon.countDocuments({ isClaimed: true });
    const latestActivity = await Coupon.find();
    

    res.json({
      totalCoupons,
      totalAdmins,
      activeCoupons,
      latestActivity,
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};