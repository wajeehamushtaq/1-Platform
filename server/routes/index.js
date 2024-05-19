const express = require('express');
const authRouter = require('./auth.router.js');
const ticketsRouter = require('./tickets.router.js');

const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/tickets', ticketsRouter);

module.exports =  indexRouter;
