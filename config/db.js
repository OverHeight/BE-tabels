// ini manggil sequelize ke file database
const { Sequelize } = require("sequelize");

// ini function buat ngasih tau sequelize dimana sih kita nyimpen databasenya (template)
const db = new Sequelize("keluhan", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// ini buat nge export si function db nya
module.exports = db;
