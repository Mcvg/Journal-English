const { body } = require('express-validator');

const id_user = (parameter) => {
  return body(parameter)
    .exists()
    .withMessage(`The value ${parameter} is required`)
    .escape();
};

const detail = (parameter) => {
  return body(parameter)
    .exists()
    .withMessage(`The value ${parameter} is required`)
    .matches(/[a-zA-Zá-úÁ-Úä-üÄ-ÜñÑ\s0-9.&\-();,"]*$/, 'g')
    .withMessage(
      `The value ${parameter} must be a valid text, can't have special characters`
    )
    .trim()
    .escape();
};

const id_activity = (parameter) => {
    return body(parameter)
      .exists()
      .withMessage(`The value ${parameter} is required`)
      .escape();
  };

module.exports = { id_user, detail, id_activity };
