const { body } = require('express-validator');

const password = (parameter) => {
  return body(parameter)
    .exists()
    .withMessage(`The value ${parameter} is required`)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'gm')
    .withMessage(
      `The value ${parameter} must be a valid password, with numbers, letters (Uppercase, Lowercase), special characters and at least 8 characters`
    )
    .trim()
    .escape();
};

const email = (parameter) => {
  return body(parameter)
    .exists()
    .withMessage(`The value ${parameter} is required`)
    .matches(/^(.+)@(.+)\.[A-Za-z]{2,}$/, 'gm')
    .withMessage(`The value ${parameter} must be a valid email`)
    .trim()
    .escape();
};

module.exports = {
  password,
  email,
};
