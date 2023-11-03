const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  fromLocation: { type: String, required: true },
  toLocation: { type: String, require: true },
  toLocationPhotoUrl: { type: String, require: true },
});

module.exports = mongoose.model("ticket", ticketSchema);
