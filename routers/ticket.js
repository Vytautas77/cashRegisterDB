const express = require("express");
const router = express.Router();
const validation = require("../middlewares/validation.js");
const auth = require("../middlewares/auth.js");
const { ticketRegistrationSchema } = require("../validation/ticketSchema.js");
const {
  ADD_TICKET,
  GET_TICKETS,
  UPDATE_TICKET,
  DELETE_TICKET,
  GET_TICKET_BY_ID,
} = require("../controllers/ticket");

router.post("/tickets", validation(ticketRegistrationSchema), auth, ADD_TICKET);
router.get("/tickets", auth, GET_TICKETS);
router.get("/tickets/:id", auth, GET_TICKET_BY_ID);
router.put("/tickets/:id", auth, UPDATE_TICKET);
router.delete("/tickets/:id", auth, DELETE_TICKET);

module.exports = router;
