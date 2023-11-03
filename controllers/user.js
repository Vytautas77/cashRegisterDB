const userModel = require("../models/user.js");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*\d).{6,}$/;

const ADD_USER = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const userName = req.body.name;
    const userCorrectName =
      userName.charAt(0).toUpperCase() + userName.slice(1);
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

module.exports = { ADD_USER };
