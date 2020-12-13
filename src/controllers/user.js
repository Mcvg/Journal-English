const { validationResult } = require('express-validator');
const { validatorError, serverError } = require('../utils/errors');

const User = require('../models/user');

exports.getUserList = (req, res, next) => {
  try {
    User.find({}, (err, users) => {
      if (err) return err;

      res.send(users);
    });
  } catch (e) {
    serverError(e);
  }
};

exports.getUser = (req, res, next) => {
  try {
    const { id } = req.body;
    User.findOne({ _id: id }, (err, user) => {
      if (err) return err;

      res.send(user);
    });
  } catch (e) {
    serverError(e);
  }
};

exports.createUser = (req, res, next) => {
  validateParams(req);

  const { first_name, last_name, email, password, active } = req.body;
  let user = new User({
    first_name,
    last_name,
    email,
    password,
    active,
  });

  user.save(function (err) {
    if (err) console.log(err);

    sendSuccessfullyResponse(res, 'User created successfully.');
  });
};

exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) return err;
    res.send('User updated successfully.');
  });
};

const validateParams = (req) => {
  const errorList = validationResult(req);
  if (!errorList.isEmpty()) {
    validatorError(errorList);
  }
};

const sendSuccessfullyResponse = (res, message) =>
  res.status(201).json({ message });
