const Petugas = require("../models/petugasModel");

const getPetugas = async (req, res) => {
  try {
    const response = await Petugas.findAll();
    res.json(response);
  } catch (error) {
    console.error(error.message);
  }
};

const getPetugasById = async (req, res) => {
  try {
    const response = await Petugas.findOne({
      where: {
        id_petugas: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.error(error.message);
  }
};

const createPetugas = async (req, res) => {
  try {
    const { ...petugasData } = req.body;

    const petugas = await Petugas.create(petugasData);
    await Petugas.addPetugas(petugas);

    console.log("petugas sukses dibuat", petugas.toJSON());
    res.status(201).json({ msg: "pembuatan petugas berhasil" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePetugas = async (req, res) => {
  const response = await Petugas.findOne({
    where: {
      id_petugas: req.params.id,
    },
  });
  try {
    if (!response) {
      return res.status(404).json({ error: "id_petugas tidak ditemukan" });
    } else {
      await response.update(req.body);
      res.status(201).json({ message: "sukses diubah" });
    }
  } catch (error) {
    res.status(500).json({ message: "tidak bisa diedit" });
  }
};

const deletePetugas = async (req, res) => {
  const response = await Petugas.findOne({
    where: {
      id_petugas: req.params.id,
    },
  });
  try {
    if (!response) {
      return res.status(404).json({ error: "id petugas tidak ditemukan" });
    } else {
      await response.destroy(req.body);
    }
  } catch (error) {
    res.status(500).json({ message: "tidak bisa dihapus" });
  }
};

module.exports = {
  getPetugas,
  getPetugasById,
  createPetugas,
  updatePetugas,
  deletePetugas,
};
