const express = require("express");
const router = express.Router();
const validation = require("../middlewares/validation.js");
const { userRegistrationSchema } = require("../validation/userSchema.js");
const { ADD_USER } = require("../controllers/user.js");
router.post("/users", validation(userRegistrationSchema), ADD_USER);
module.exports = router;
