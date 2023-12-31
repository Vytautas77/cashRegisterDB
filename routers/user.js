const express = require("express");
const router = express.Router();
const validation = require("../middlewares/validation.js");
const { userSchema, userLoginSchema } = require("../validation/userSchema.js");
const auth = require("../middlewares/auth.js");
const {
  ADD_USER,
  USER_LOGIN,
  USER_LOGIN_REFRESH,
  GET_USERS,
  GET_USER_BY_ID,
  GET_USERS_TICKET,
  GET_USER_BY_ID_TICKET,
  UPDATE_USER,
  DELETE_USER,
} = require("../controllers/user.js");

router.post("/users", validation(userSchema), ADD_USER);
router.post("/users/login", validation(userLoginSchema), USER_LOGIN);
router.post(
  "/users/loginRefresh",
  validation(userLoginSchema),
  USER_LOGIN_REFRESH
);
router.get("/users", auth, GET_USERS);
router.get("/users/tickets", auth, GET_USERS_TICKET);
router.get("/users/tickets/:id", auth, GET_USER_BY_ID_TICKET);
router.get("/users/:id", auth, GET_USER_BY_ID);
router.put("./users/:id", validation(userSchema), auth, UPDATE_USER);
router.delete("./users/:id", auth, DELETE_USER);

module.exports = router;
