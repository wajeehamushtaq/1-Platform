const { body, param } = require('express-validator');

class TicketPayloadValidation {

  ticketById = () => {
    return [
      param('id').isInt().withMessage('Ticket ID must be an integer'),
    ];
  }

  ticketCreate = () => {
    return [
      body('name').notEmpty().withMessage('Name is required'),
      body('status').notEmpty().withMessage('Status is required'),
      body('assigned_to').isInt().optional().withMessage('Assigned to must be a user ID'),
    ];
  }

  ticketUpdate = () => {
    return [
      body('name').notEmpty().withMessage('Name is required'),
      body('status').notEmpty().withMessage('Status is required'),
      body('assigned_to').isInt().optional().withMessage('Assigned to must be a user ID'),
    ];
  }

  ticketPatch = () => {
    return [
      body('name').optional().notEmpty().withMessage('Name is required if provided'),
      body('status').optional().notEmpty().withMessage('Status is required if provided'),
      body('assigned_to').isInt().optional().withMessage('Assigned to must be a user ID if provided'),
    ];
  }

  ticketDelete = () => {
    return [
      param('id').isInt().withMessage('Ticket ID must be an integer'),
    ];
  }
}

module.exports = new TicketPayloadValidation();
