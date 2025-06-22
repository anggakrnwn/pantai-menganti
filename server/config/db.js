const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "menganti_db", // Nama database kamu
  "root", // Username MySQL
  "", // Password MySQL (kosong jika default XAMPP)
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
