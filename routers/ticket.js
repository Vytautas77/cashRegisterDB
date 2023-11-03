const express = require("express");
const router = express.Router();
const validation = require("../middlewares/validation.js");
const { ticketRegistrationSchema } = require("../validation/ticketSchema.js");
const { ADD_TICKET } = require("../controllers/ticket");
router.post("/tickets", validation(ticketRegistrationSchema), ADD_TICKET);
module.exports = router;
