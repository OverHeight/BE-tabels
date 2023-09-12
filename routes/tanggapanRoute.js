const { Router } = require("express");
const {
  getTanggapan,
  getTanggapanById,
  createTanggapan,
  updateTanggapan,
  deleteTanggapan,
} = require("../controllers/tanggapanController");

const routes = new Router();

// routes
routes.get("/tanggapan", getTanggapan);
routes.get("/tanggapan/:id", getTanggapanById);
routes.post("/tanggapan", createTanggapan);
routes.put("/tanggapan/:id", updateTanggapan);
routes.delete("/tanggapan/:id", deleteTanggapan);

module.exports = routes;
