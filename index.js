const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();
const port = 8000;
const masyarakatRoutes = require("./routes/masyarakatRoute");
const pengaduanRoutes = require("./routes/pengaduanRoute");
const petugasRoutes = require("./routes/petugasRoute");
const tanggapanRoutes = require("./routes/tanggapanRoute");

app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(masyarakatRoutes);
app.use(pengaduanRoutes);
app.use(petugasRoutes);
app.use(tanggapanRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
