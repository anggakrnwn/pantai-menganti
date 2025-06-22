// server/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth"); // Pastikan ini diimpor
const Admin = require("./models/admin"); // PERBAIKI: 'Admin' harus kapital sesuai nama file model

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Jalankan koneksi DB
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected.");
    // Pindahkan sinkronisasi ke sini
    return sequelize.sync({ alter: true }); // Menggunakan 'return' agar chained promise bisa menangani error sync
  })
  .then(() => {
    console.log("Database synced successfully."); // Opsional: pesan sukses sync
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ DB connection or sync error:", err); // Pesan error yang lebih umum
  });

// Routes
// Ini harus sudah ada
app.use("/api/auth", authRoutes); // Gunakan authRoutes yang sudah diimpor
