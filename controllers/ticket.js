const ticketModel = require("../models/ticket");

const ADD_TICKET = async (req, res) => {
  try {
    const ticket = new ticketModel({
      title: req.body.title,
      ticketPrice: req.body.ticketPrice,
      fromLocation: req.body.fromLocation,
      toLocation: req.body.toLocation,
      toLocationPhotoUrl: req.body.toLocationPhotoUrl,
    });
    ticket.id = ticket._id;
    const response = await ticket.save();
    return res
      .status(200)
      .json({ status: "User registered", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { ADD_TICKET };
