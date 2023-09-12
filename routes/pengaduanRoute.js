const { Router } = require("express");
const {
  getPengaduan,
  getPengaduanById,
  createPengaduan,
  updatePengaduan,
  deletePengaduan,
} = require("../controllers/pengaduanController");

const routes = new Router();

// routes
routes.get("/pengaduan", getPengaduan);
routes.get("/pengaduan/:id", getPengaduanById);
routes.post("/pengaduan", createPengaduan);
routes.put("/pengaduan/:id", updatePengaduan);
routes.delete("/pengaduan/:id", deletePengaduan);

module.exports = routes;
