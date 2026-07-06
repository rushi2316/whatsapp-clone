const express = require("express");

const router = express.Router();

const {
    signup,
    login,
    getProfile,
    getUsers
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// ===============================
// Authentication
// ===============================

router.post("/signup", signup);

router.post("/login", login);

// ===============================
// User Profile
// ===============================

router.get("/profile", authMiddleware, getProfile);

// ===============================
// Get All Users
// ===============================

router.get("/users", authMiddleware, getUsers);

module.exports = router;