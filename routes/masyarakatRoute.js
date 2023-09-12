const { Router } = require("express");
const {
  getMasyarakat,
  getMasyarakatById,
  createMasyarakat,
  updateMasyarakat,
  deleteMasyarakat,
} = require("../controllers/masyarakatController");

const routes = new Router();

// routes
routes.get("/masyarakat", getMasyarakat);
routes.get("/masyarakat/:id", getMasyarakatById);
routes.post("/masyarakat", createMasyarakat);
routes.put("/masyarakat/:id", updateMasyarakat);
routes.delete("/masyarakat/:id", deleteMasyarakat);

module.exports = routes;
