# Backend - Round-Robin Coupon Distribution

## 📌 Project Overview
This is the backend service for the Round-Robin Coupon Distribution system, responsible for handling coupon assignments, user tracking, and admin management.

## 🌐 Live Deployment
- **Base URL:** `https://your-backend-url.com/api`
- **GitHub Repository:** [Backend Repo](https://github.com/shivamudipelly/adminpanel)

## 🚀 Features
- **Coupon Management:**
  - Assign coupons sequentially to guest users.
  - Prevent duplicate claims from the same IP/browser session.
  - Enable/disable specific coupons dynamically.
- **Admin Panel API:**
  - Secure authentication using JWT.
  - CRUD operations for coupons.
  - View user claim history (IP & browser session tracking).
- **Security & Abuse Prevention:**
  - Rate limiting to prevent excessive requests.
  - IP-based and cookie-based tracking.
  - Secure API endpoints with role-based authentication.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based authentication
- **Environment Variables:** dotenv for configuration management

## 🔧 Setup Instructions
### **Prerequisites**
Ensure you have the following installed:
- Node.js (v16 or later)
- MongoDB (local or cloud)
- Git

### **Installation Steps**
1. **Clone the Repository**
   ```bash
   git clone https://github.com/shivamudipelly/adminpanel.git
   cd adminpanel
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   COOKIE_EXPIRY=86400
   ```
4. **Run the Backend Server**
   ```bash
   npm run server
   ```

## 📄 API Documentation
### **Coupon Endpoints (User Side)**
- `GET /api/coupons` - Get available coupons.
- `POST /api/coupons/claim` - Claim a coupon.
- `PATCH /api/coupons/:couponId` - Toggle coupon availability by ID.

### **Admin Endpoints**
- `GET /api/admin` - Get admin details.
- `POST /api/admin` - Create a new admin.
- `POST /api/admin/add-coupons` - Add new coupons.
- `GET /api/admin/dashboard` - Admin dashboard data.
- `GET /api/admin/coupons` - Get all coupons.
- `POST /api/admin/login` - Admin login.
- `PUT /api/admin/:id` - Update coupon details.
- `DELETE /api/admin/:id` - Delete a coupon.

## 🔒 Security Measures
- **JWT Authentication** for admin endpoints.
- **Rate Limiting** to prevent abuse.
- **CORS Protection** to restrict unauthorized access.

## 📝 License
This project is for educational purposes and not intended for commercial use.

---
### 📧 Contact
For queries, reach out at [Your Email] or via [LinkedIn Profile].

