// server/controllers/authController.js
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Fungsi login yang sudah ada
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    // Tambahan validasi input dasar
    return res
      .status(400)
      .json({ message: "Username dan password diperlukan" });
  }

  try {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(400).json({ message: "Username tidak ditemukan" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ message: "Password salah" });
    }

    // Pastikan secret key diambil dari environment variable
    const token = jwt.sign({ id: admin.id }, "secret_key_aman", {
      expiresIn: "2h",
    });
    console.log("Login: Token baru dibuat:", token); // Pastikan token ini terlihat

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error); // Log error di server
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

// --- Fungsi register baru ---
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username dan password diperlukan" });
  }

  try {
    // Cek apakah username sudah ada
    const existingAdmin = await Admin.findOne({ where: { username } });
    if (existingAdmin) {
      return res.status(409).json({ message: "Username sudah digunakan" }); // 409 Conflict
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat admin baru
    const newAdmin = await Admin.create({
      username,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "Admin berhasil didaftarkan", adminId: newAdmin.id });
  } catch (error) {
    console.error("Registration error:", error); // Log error di server
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: error.message });
  }
};
