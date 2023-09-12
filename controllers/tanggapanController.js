const Petugas = require("../models/petugasModel.js");
const Tanggapan = require("../models/tanggapanModel.js");

const getTanggapan = async (req, res) => {
  try {
    const response = await Tanggapan.findAll();
    res.json(response);
  } catch (error) {
    console.error(error.message);
  }
};

const getTanggapanById = async (req, res) => {
  try {
    const response = await Tanggapan.findOne({
      where: {
        id_tanggapan: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.error(error.message);
  }
};

const createTanggapan = async (req, res) => {
  try {
    const { id_petugas, ...TanggapanData } = req.body;

    const petugas = await Petugas.findByPk(id_petugas);

    if (!petugas) {
      return res.status(404).json({ msg: "id petugas tidak cocok" });
    }

    const tanggapan = await Tanggapan.create(TanggapanData);
    await petugas.addTanggapan(tanggapan);

    console.log("Tanggapan telah dibuat:", tanggapan.toJSON());
    res.status(201).json({ msg: "Tanggapan telah sukses dibuat." });
  } catch (error) {
    res.status(500).json({ msg: "Tanggapan tidak bisa dibuat" });
  }
};

const updateTanggapan = async (req, res) => {
  const response = await Tanggapan.findOne({
    where: {
      id_tanggapan: req.params.id,
    },
  });
  try {
    if (!response) {
      return res.status(404).json({ error: "nik tidak ditemukan" });
    } else {
      await response.update(req.body);
      res.status(201).json({ message: "sukses diubah" });
    }
  } catch (error) {
    res.status(500).json({ message: "tidak bisa diubah" });
  }
};

const deleteTanggapan = async (req, res) => {
  const response = await Tanggapan.findOne({
    where: {
      id_tanggapan: req.params.id,
    },
  });
  try {
    if (!response) {
      return res.status(404).json({ error: "nik tidak ditemukan" });
    } else {
      await response.destroy(req.body);
    }
  } catch (error) {
    res.status(500).json({ message: "tidak bisa dihapus" });
  }
};

module.exports = {
  getTanggapan,
  getTanggapanById,
  createTanggapan,
  updateTanggapan,
  deleteTanggapan,
};
