const userModel = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*\d).{6,}$/;
const mongoose = require("mongoose");

const authenticationUser = (req, res) => {
  const token = req.headers.authorization_refresh;
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: "Bad auth" });
    }
    return;
  });
};

const ADD_USER = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const userName = req.body.name;
    const userCorrectName =
      userName.charAt(0).toUpperCase() + userName.slice(1).trim();
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ status: "Email is not correct" });
    }
    if (!passwordRegex.test(req.body.password)) {
      return res.status(400).json({ status: "Password is not correct" });
    }

    const user = new userModel({
      name: userCorrectName,
      email: req.body.email,
      password: hash,
      boughtTickets: [],
      moneyBalance: req.body.moneyBalance,
    });
    user.id = user._id;
    const response = await user.save();
    return res
      .status(200)
      .json({ status: "User registered", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const USER_LOGIN = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Bad authentication" });
    }
    bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
      if (!isPasswordMatch || err) {
        return res.status(404).json({ message: "Bad authentication" });
      }
      const Token = jwt.sign(
        { email: user.email, userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        { algorithm: "RS256" }
      );
      return res.status(200).json({ Token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const USER_LOGIN_REFRESH = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Bad authentication" });
    }
    bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
      if (!isPasswordMatch || err) {
        return res.status(404).json({ message: "Bad authentication" });
      }
      if (authenticationUser) {
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.JWT_SECRET_REFRESH,
          { expiresIn: "2h" },
          { algorithm: "RS256" }
        );
        return res.status(200).json({ token });
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const GET_USERS = async (req, res) => {
  try {
    const response = await userModel.find();
    const sortedResponse = response.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    return res.send({ users: sortedResponse });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const GET_USER_BY_ID = async (req, res) => {
  try {
    const response = await userModel.findById(req.params.id);
    return res.status(200).json({ Event: response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const GET_USERS_TICKET = async (req, res) => {
  try {
    const response = await userModel.aggregate([
      {
        $lookup: {
          from: "tickets",
          localField: "boughtTickets",
          foreignField: "id",
          as: "Tickets",
        },
      },
      // { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    ]);

    return res.status(200).json({ response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const GET_USERS_BY_ID_TICKET = async (req, res) => {
  try {
    const response = await userModel.aggregate([
      {
        $lookup: {
          from: "tickets",
          localField: "boughtTickets",
          foreignField: "id",
          as: "Tickets",
        },
      },
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    ]);

    return res.status(200).json({ response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

module.exports = {
  ADD_USER,
  USER_LOGIN,
  USER_LOGIN_REFRESH,
  GET_USERS,
  GET_USER_BY_ID,
  GET_USERS_TICKET,
  GET_USERS_BY_ID_TICKET,
};
