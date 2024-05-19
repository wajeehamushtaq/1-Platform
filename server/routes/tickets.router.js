const express = require('express');
const ticketsController = require('../controllers/tickets.controller.js');
const validatePayload = require('../validations/ticket.validation.js');
const checkValidationErrors = require('../middlewares/checkErrors.middleware.js');

const ticketRouter = express.Router();

ticketRouter.get(
  '/',
  ticketsController.getAllTickets,
);

ticketRouter.get(
  '/:id',
  validatePayload.ticketById(),
  checkValidationErrors,
  ticketsController.getTicketById,
);

ticketRouter.post(
  '/',
  validatePayload.ticketCreate(),
  checkValidationErrors,
  ticketsController.createTicket,
);

ticketRouter.put(
  '/:id',
  validatePayload.ticketUpdate(),
  checkValidationErrors,
  ticketsController.updateTicket,
);

ticketRouter.patch(
  '/:id',
  validatePayload.ticketPatch(),
  checkValidationErrors,
  ticketsController.patchTicket,
);

ticketRouter.delete(
  '/:id',
  validatePayload.ticketDelete(),
  checkValidationErrors,
  ticketsController.deleteTicket,
);

module.exports = ticketRouter;
