const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  fromLocation: { type: String, required: true },
  toLocation: { type: Array, require: true },
  toLocationPhotoUrl: { type: Number, require: true },
});

module.exports = mongoose.model("ticket", ticketSchema);
