const Masyarkat = require("../models/masyarakatModel.js");
const Pengaduan = require("../models/pengaduanModel.js");
const path = require("path");

const getPengaduan = async (req, res) => {
  try {
    const response = await Pengaduan.findAll();
    res.json(response);
  } catch (error) {
    console.error(error.message);
  }
};

const getPengaduanById = async (req, res) => {
  try {
    const response = await Pengaduan.findOne({
      where: {
        id_pengaduan: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.error(error.message);
  }
};

const createPengaduan = async (req, res) => {
  try {
    const { nik, ...pengaduanData } = req.body;

    const masyarakat = await Masyarkat.findByPk(nik);

    if (!masyarakat) {
      return res.status(404).json({ msg: "nik tidak cocok" });
    }

    if (!req.files || !req.files.foto) {
      return res.status(400).json({ msg: "Please upload a file named 'foto'" });
    }
    const fotoFile = req.files.foto;
    const uploadPath = path.join("./", "public", "images", fotoFile.name);

    fotoFile.mv(uploadPath, async (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ msg: "Failed to upload the image" });
      }

      const pengaduan = await Pengaduan.create({
        ...pengaduanData,
        foto: uploadPath,
      });
      await masyarakat.addPengaduan(pengaduan);

      console.log("pengaduan telah dibuat:", pengaduan.toJSON());
      res.status(201).json({ msg: "pengaduan telah sukses dibuat." });
    });
  } catch (error) {
    res.status(500).json({ msg: "pengaduan tidak bisa dibuat" });
  }
};

const updatePengaduan = async (req, res) => {
  const response = await Pengaduan.findOne({
    where: {
      id_pengaduan: req.params.id,
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

const deletePengaduan = async (req, res) => {
  const response = await Pengaduan.findOne({
    where: {
      id_pengaduan: req.params.id,
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
  getPengaduan,
  getPengaduanById,
  createPengaduan,
  updatePengaduan,
  deletePengaduan,
};
