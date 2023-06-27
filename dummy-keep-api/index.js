const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./src/db/config");
require("dotenv").config();

const env = process.env;
const app = express();

app.listen(env.PORT, () =>
  console.log(`Servidor corriendo en puerto ${env.PORT}`)
);

dbConnection();

app.use(express.static("./public"));
app.use(cors());
app.use(express.json());
app.use("/api/task", require("./src/routes/task"));
