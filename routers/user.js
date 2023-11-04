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
  USER_LOGIN,
  USER_LOGIN_REFRESH,
  GET_USERS,
  GET_USER_BY_ID,
  GET_USERS_TICKET,
  GET_USERS_BY_ID_TICKET,
} = require("../controllers/user.js");

router.post("/users", validation(userRegistrationSchema), ADD_USER);
router.post("/users/login", validation(userLoginSchema), USER_LOGIN);
router.post(
  "/users/loginRefresh",
  validation(userLoginSchema),
  USER_LOGIN_REFRESH
);
router.get("/users", auth, GET_USERS);
router.get("/users/tickets", auth, GET_USERS_TICKET);
router.get("/users/tickets/:id", auth, GET_USERS_BY_ID_TICKET);
router.get("/users/:id", auth, GET_USER_BY_ID);

module.exports = router;
