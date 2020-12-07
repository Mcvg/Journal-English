const { body } = require('express-validator');

const id_user = (parameter) => {
  return body(parameter)
    .exists()
    .withMessage(`The value ${parameter} is required`)
    .escape();
};

const detail_text = (parameter) => {
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

const detail_audio = (parameter) => {
  return body(parameter)
    .exists()
    .withMessage(`The value ${parameter} is required`)
    .matches(/[a-zA-Zá-úÁ-Úä-üÄ-ÜñÑ\s0-9.&\-();,"]*$/, 'g')
    .withMessage(`The value ${parameter} must be a valid audio`)
    .trim()
    .escape();
};

module.exports = { id_user, detail_text, detail_audio };
