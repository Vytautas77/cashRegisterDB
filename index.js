const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routers/user.js");
const ticketRouter = require("./routers/ticket.js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected"))
  .catch((err) => {
    console.log("ERROR: ", err);
  });

app.use(userRouter);
app.use(ticketRouter);

// app.use((req, res) => {
//   return res.status(404).json({ response: "Endpoint not exist!" });
// });

app.listen(process.env.PORT, () => {
  console.log(`App started on port ${process.env.PORT}`);
});
