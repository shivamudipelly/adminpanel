import express from "express";
import { loginAdmin, addCoupon, getAdminCoupons, getAdminDashboard } from "../controllers/adminController.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import Admin from "../models/Admin.js";


const router = express.Router();

router.post("/login", loginAdmin);
router.post("/add-coupon", authMiddleware, addCoupon);
router.get("/coupons", authMiddleware, getAdminCoupons);
router.get('/dashboard', authMiddleware, getAdminDashboard);
router.get('/', async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins); // Send admins data
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', authMiddleware, async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if an admin with the same email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin with this email already exists' });
        }

        // Create a new admin without hashing the password (not recommended for production)
        const newAdmin = new Admin({
            email,
            password, // Saving password as plain text (not recommended for production)
        });

        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ error: 'Error creating admin' });
    }
});


router.put('/:id', authMiddleware, async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Update the email and password if provided
        if (email) admin.email = email;
        // console.log(admin);
        // if (password) {
        //     const salt = await bcrypt.genSalt(10);
        //     admin.password = await bcrypt.hash(password, salt);
        // }

        // console.log(admin);
        await admin.save();
        res.json({ message: 'Admin updated successfully', admin });
    } catch (err) {
        res.status(500).json({ message: 'Error updating admin' });
    }
});

// 3. Delete an admin
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting admin' });
    }
});

export default router;
