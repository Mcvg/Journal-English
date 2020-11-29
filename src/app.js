const express = require('express');
const bodyParser = require('body-parser');
const activityRoutes = require('./routes/activity');
const userRoutes = require('./routes/user');

const app = express();

// Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/activity', activityRoutes);
app.use('/user', userRoutes);

// Handle error
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message, data });
});

module.exports = app;
