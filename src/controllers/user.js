const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { validatorError, serverError } = require('../utils/errors');

// Model DB
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

exports.createUser = async (req, res, next) => {
  validateParams(req);
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const { first_name, last_name, email, active } = req.body;
  const userExists = await User.findOne({ email }).exec();

  if (userExists) {
    res.send(`This user with the email: ${email}, already exists.`);
  }

  let user = new User({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    active,
  });

  user.save(function (err) {
    if (err) console.log(err);

    sendSuccessfullyResponse(res, 'User created successfully.');
  });
};

exports.updateUser = (req, res, next) => {
  User.findOneAndUpdate(req.body.id, req.body.data, function (err) {
    if (err) return err;
    res.send('User updated successfully.');
  });
};

exports.deactivateUser = (req, res, next) => {
  User.findOneAndUpdate(
    req.body.id,
    { active: req.body.active },
    function (err) {
      if (err) return err;
      res.send('User deactivated successfully.');
    }
  );
};

const validateParams = (req) => {
  const errorList = validationResult(req);
  if (!errorList.isEmpty()) {
    validatorError(errorList);
  }
};

const sendSuccessfullyResponse = (res, message) =>
  res.status(201).json({ message });
