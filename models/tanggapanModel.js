const Sequelize = require("sequelize");
const db = require("../config/db");

const { DataTypes } = Sequelize;

const Tanggapan = db.define(
  "tanggapan",
  {
    id_tanggapan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pengaduan: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    tgl_tanggapan: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    id_petugas: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    tanggapan: DataTypes.TEXT,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Tanggapan;

(async () => {
  try {
    await db.authenticate(); // Test the database connection

    // Sync the models with the database
    await db.sync();
    console.log("Data Tanggapan.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
