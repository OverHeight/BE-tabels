// ini manggil sequelize lagi biar kita bisa pake syntax yang ada di sequelize
const Sequelize = require("sequelize");
// kita manggil databasenya
const db = require("../config/db");
// ini buat foregin key dari tabel tanggapan
const Tanggapan = require("./tanggapanModel");

// ini ngasih tau kalau kita pakenya function datatypes yang disediain sama sequelize
const { DataTypes } = Sequelize;

// ini ngejabarin di tabel pengaduan ada ada aja
const Pengaduan = db.define(
  // ini buat nama tabelnya (pengaduan)
  "pengaduan",
  {
    // ini buat ngasih tau di tabel ada kolom apa aja
    id_pengaduan: {
      // type ini buat ngasih tau tipe data yang kita pake di kolom id_pengaduan itu apa (disini konteksnya integer)
      type: DataTypes.INTEGER,
      // ini ngasih tau sequelize kalau id_pengaduan itu sebuah primary key
      primaryKey: true,
      // ini buat ngasih id secara otoma tis tanpa perlu kita ketik
      autoIncrement: true,
    },
    // ini juga buat ngasih tau kalau kita pakai kolom tgl_pengaduan
    tgl_pengaduan: {
      // ini ngasih tau tipe data tgl_pengaduan itu date
      type: DataTypes.DATE,
      // ini ngasih tau kalau kolom ini bisa kosong
      allowNull: true,
    },
    // ini ngasih tau kalau ada kolom nik
    nik: {
      // ngasih tau kalau tipe data nik itu integer
      type: DataTypes.INTEGER,
      // ini ngasih tau kalau nik itu diambil dari tabel yang lain (disini konteksnya dari tabel masyarakat)
      foreignKey: true,
    },
    // isi_laporan tipe datanya teks atau bisa juga disebut string aja dan berlaku untuk kolom lain dibawah ini
    isi_laporan: DataTypes.TEXT,
    foto: DataTypes.STRING,
    status: DataTypes.STRING,
  },
  {
    // ini biar si nama tabelnya ga berubah jadi plural (kalau disini konteksnya jadi pengaduans)
    freezeTableName: true,
  }
);

// ini ngasih tau kalau si tabel pengaduan bakal nge ekspor kolom id_pengaduan
Pengaduan.hasMany(Tanggapan, { foreignKey: "id_pengaduan" });

module.exports = Pengaduan;

//
(async () => {
  try {
    // ini ngasih tau kalau kita mau sync data yang di database sama disini
    await db.sync();
    console.log("Data Pengaduan");
    // try catch biar ngecek ini jalan atau enga
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
