const { Router } = require("express");
const {
  getPetugas,
  getPetugasById,
  createPetugas,
  updatePetugas,
  deletePetugas,
} = require("../controllers/petugasController");

const routes = new Router();

// routes
routes.get("/petugas", getPetugas);
routes.get("/petugas/:id", getPetugasById);
routes.post("/petugas", createPetugas);
routes.put("/petugas/:id", updatePetugas);
routes.delete("/petugas/:id", deletePetugas);

module.exports = routes;
