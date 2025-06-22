const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("Middleware: No Authorization header.");
    return res.status(401).json({ message: "Token dibutuhkan" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Middleware: Token diterima:", token);

  try {
    const decoded = jwt.verify(token, "secret_key_aman"); // ⬅ ganti ini
    console.log("Middleware: Token berhasil didekode:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Middleware: JWT Verification Error:", err.name, err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token kadaluarsa" });
    }
    return res.status(403).json({ message: "Token tidak valid" });
  }
};
