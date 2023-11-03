const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  boughtTickets: { type: Array, require: true },
  moneyBalance: { type: Number, require: true },
});

module.exports = mongoose.model("user", userSchema);
