// server/routes/auth.js
const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController"); // <-- Pastikan 'register' ada di sini
const auth = require("../middleware/authMiddleware");
const Admin = require("../models/admin");

router.post("/login", login);
router.post("/register", register); // Rute baru untuk registrasi

// Route dashboard (hanya bisa diakses kalau login)
router.get("/status", auth, async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.user.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin tidak ditemukan" });
    }
    res.json({ username: admin.username });
  } catch (error) {
    console.error("Error fetching admin status:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: error.message });
  }
});

module.exports = router;
