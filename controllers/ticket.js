const ticketModel = require("../models/ticket");
const userModel = require("../models/user");

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

const BUY_TICKET = async (req, res) => {
  try {
    const ticket = await ticketModel.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket does not exist" });
    }
    const userId = req.body.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.moneyBalance >= ticket.ticketPrice) {
      user.moneyBalance -= ticket.ticketPrice;
      await user.save();
    } else {
      return res.status(404).json({ message: "No money" });
    }
    await userModel
      .updateOne({ _id: user }, { $push: { boughtTickets: req.params.id } })
      .exec();

    return res.status(200).json({ message: "The ticket has been purchased" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  ADD_TICKET,
  GET_TICKETS,
  GET_TICKET_BY_ID,
  UPDATE_TICKET,
  DELETE_TICKET,
  BUY_TICKET,
};
