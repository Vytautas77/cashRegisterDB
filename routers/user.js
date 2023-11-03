const express = require("express");
const router = express.Router();
const validation = require("../middlewares/validation.js");
const { userRegistrationSchema } = require("../validation/userSchema.js");
const auth = require("../middlewares/auth.js");
const {
  ADD_USER,
  REFRESH_USER_LOGIN,
  USER_LOGIN,
  GET_USERS,
} = require("../controllers/user.js");

router.post("/users", validation(userRegistrationSchema), ADD_USER);
router.post("/users/refreshLogin", REFRESH_USER_LOGIN);
router.post("/users/login", USER_LOGIN);
router.get("/users", auth, GET_USERS);

module.exports = router;
