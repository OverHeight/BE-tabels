const Sequelize = require("sequelize");
const db = require("../config/db");
const Pengaduan = require("./pengaduanModel");

const { DataTypes } = Sequelize;

const Masyarkat = db.define(
  "masyarkat",
  {
    nik: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    nama: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    telp: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

Masyarkat.hasMany(Pengaduan, { foreignKey: "nik" });

module.exports = Masyarkat;

(async () => {
  try {
    await db.authenticate(); // Test the database connection

    // Sync the models with the database
    await db.sync();
    console.log("Data Masyarakat.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
