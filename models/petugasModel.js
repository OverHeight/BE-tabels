const Sequelize = require("sequelize");
const Tanggapan = require("./tanggapanModel");
const db = require("../config/db");

const { DataTypes } = Sequelize;

const Petugas = db.define(
  "petugas",
  {
    id_petugas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    nama_petugas: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    telp: DataTypes.STRING,
    level: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
console.log(Petugas);

Petugas.hasMany(Tanggapan, { foreignKey: "id_petugas" });

module.exports = Petugas;

(async () => {
  try {
    await db.authenticate(); // Test the database connection

    // Sync the models with the database
    await db.sync();
    console.log("Data Petugas.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
