const express = require('express');
const bodyParser = require('body-parser');
const activityRoutes = require('./routes/activity');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');

const app = express();

// Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/activity', activityRoutes);
app.use('/user', userRoutes);

// Database configuration
let dev_db_url =
  'mongodb+srv://kath:kath123@clusterkath.ovwkv.mongodb.net/andromeda-journal?retryWrites=true&w=majority';

// Connect to mongodb
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Handle error
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message, data });
});

module.exports = app;
