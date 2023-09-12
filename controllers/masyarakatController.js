const Masyarkat = require("../models/masyarakatModel");

const getMasyarakat = async (req, res) => {
  try {
    const response = await Masyarkat.findAll();
    res.json(response);
  } catch (error) {
    console.error(error.message);
  }
};

const getMasyarakatById = async (req, res) => {
  try {
    const response = await Masyarkat.findOne({
      where: {
        nik: req.params.nik,
      },
    });
    res.json(response);
  } catch (error) {
    console.error(error.message);
  }
};

const createMasyarakat = async (req, res) => {
  if (
    !req.body.nama ||
    !req.body.username ||
    !req.body.password ||
    !req.body.telp
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const nama = req.body.nama;
    const username = req.body.username;
    const password = req.body.password;
    const telp = req.body.telp;

    const newMasyarakat = await Masyarkat.create({
      nama: nama,
      username: username,
      password: password,
      telp: telp,
    });

    res
      .status(201)
      .json({ msg: "sukses register masyarakat", data: newMasyarakat });
    console.log(nama, username, password, telp);
  } catch (error) {
    res.json(error.message);
  }
};

const updateMasyarakat = async (req, res) => {
  const response = await Masyarkat.findOne({
    where: {
      nik: req.params.id,
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
    res.status(500).json({ message: "tidak bisa diedit" });
  }
};

const deleteMasyarakat = async (req, res) => {
  const response = await Masyarkat.findOne({
    where: {
      nik: req.params.id,
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
  getMasyarakat,
  getMasyarakatById,
  createMasyarakat,
  updateMasyarakat,
  deleteMasyarakat,
};
