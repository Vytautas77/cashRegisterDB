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

const GET_TICKETS = async (req, res) => {
  try {
    const response = await ticketModel.find();
    return res.send({ tickets: response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const GET_TICKET_BY_ID = async (req, res) => {
  try {
    const response = await ticketModel.findById(req.params.id);
    return res.status(200).json({ response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const UPDATE_TICKET = async (req, res) => {
  try {
    const response = await ticketModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    return res.status(200).json({ status: "Ticket was update", response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const DELETE_TICKET = async (req, res) => {
  try {
    const response = await ticketModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: "Ticket was deleted", response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

module.exports = {
  ADD_TICKET,
  GET_TICKETS,
  GET_TICKET_BY_ID,
  UPDATE_TICKET,
  DELETE_TICKET,
};
