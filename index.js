const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use = cors();
app.use = express.json();
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected"))
  .catch((err) => {
    console.log("ERROR: ", err);
  });

// app.use((req, res) => {
//   return res.status(404).json({ response: "Endpoint not exist!" });
// });

app.listen(process.env.PORT, () => {
  console.log(`App started on port ${process.env.PORT}`);
});
