/*
Tugas backend tambahan:
  - Revisi sebelumnya harus selesai.
  - Penggunaan CORS.
  - Hash password (di register user).
  - Compare hash password (di login).
  - Saat login terima JWT.
  - Client harus pakai token ketika akses post put delete.
*/

const express = require("express");
const app = express(); 

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const helmet = require("helmet");
app.use(helmet());

const cors = require("cors");
app.use(cors());

// Routes
const userAllRoutes = require("./routes/usersRoutes");
const recipesRoutes = require("./routes/recipesRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
app.use("/", userAllRoutes);
app.use("/", recipesRoutes);
app.use("/", commentsRoutes);

// Port listen
const port = 8000; // port database
app.listen(port, () => console.log(`[nodemen] running from port: '${port}'.`));