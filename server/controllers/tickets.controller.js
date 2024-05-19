const db = require('../config/database.js');

class TicketsController {

  getAllTickets = async (req, res, next) => {
    try {
      const tickets = await db('tickets').select();
      res.json(tickets);
    } catch (error) {
      next(error);
    }
  }

  getTicketById = async (req, res, next) => {
    try {
      const ticket = await db('tickets').where({ ticketid: req.params.id }).first();
      if (!ticket) {
        return res.status(404).send({ message: 'Ticket not found' });
      }
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  }

  createTicket = async (req, res, next) => {
    try {
      const { name, status, assigned_to } = req.body;
      const response = await db('tickets').insert({ name, status, assigned_to });
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  updateTicket = async (req, res, next) => {
    try {
      const { name, status, assigned_to } = req.body;
      const ticket = await db('tickets').where({ ticketid: req.params.id }).update({ name, status, assigned_to });
      if (!ticket) {
        return res.status(404).send({ message: 'Ticket not found' });
      }
      res.json({ ticketid: req.params.id, name, status, assigned_to });
    } catch (error) {
      next(error);
    }
  }

  patchTicket = async (req, res, next) => {
    try {
      const updates = req.body;
      const ticket = await db('tickets').where({ ticketid: req.params.id }).update(updates);
      if (!ticket) {
        return res.status(404).send({ message: 'Ticket not found' });
      }
      res.json({ ticketid: req.params.id, ...updates });
    } catch (error) {
      next(error);
    }
  }

  deleteTicket = async (req, res, next) => {
    try {
      const ticket = await db('tickets').where({ ticketid: req.params.id }).del();
      if (!ticket) {
        return res.status(404).send({ message: 'Ticket not found' });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TicketsController();
