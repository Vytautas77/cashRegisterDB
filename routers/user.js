const express = require("express");
const router = express.Router();
const validation = require("../middlewares/validation.js");
const {
  userRegistrationSchema,
  userLoginSchema,
} = require("../validation/userSchema.js");
const auth = require("../middlewares/auth.js");
const {
  ADD_USER,
  REFRESH_USER_LOGIN,
  USER_LOGIN,
  GET_USERS,
  GET_USER_BY_ID,
} = require("../controllers/user.js");

router.post("/users", validation(userRegistrationSchema), ADD_USER);
router.post(
  "/users/refreshLogin",
  validation(userLoginSchema),
  REFRESH_USER_LOGIN
);
router.post("/users/login", validation(userLoginSchema), USER_LOGIN);
router.get("/users", auth, GET_USERS);
router.get("/users/:id", auth, GET_USER_BY_ID);

module.exports = router;
