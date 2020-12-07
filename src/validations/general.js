const { body } = require('express-validator');

const name = (parameter) => {
  return body(parameter)
    .exists()
    .withMessage(`The value ${parameter} is required`)
    .matches(/^[a-zA-Zá-úÁ-Úä-üÄ-ÜñÑ\s0-9]*$/, 'i')
    .withMessage(`The value ${parameter} must be a valid name`)
    .escape();
};

module.exports = { name };
