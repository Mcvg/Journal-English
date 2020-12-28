const { validationResult } = require('express-validator');
const { validatorError, serverError } = require('../utils/errors');
const Commentary = require('../models/commentary');

exports.getCommentaryList = (req, res, next) => {
  try {
    Commentary.find({}, (err, commentaries) => {
      if (err) return err;

      res.send(commentaries);
    });
  } catch (e) {
    serverError(e);
  }
};


exports.getCommentary = (req, res, next) => {
  try {
    const { id_user, id_activity } = req.params;
    Commentary.findOne({
      where: {
        id_user: req.body.id_user,
        id_activity: req.body.id_activity
      }
    }, (err, commentaries) => {
      if (err) return err;

      res.send(commentaries);
    });
  } catch (e) {
    serverError(e);
  }
};

exports.createCommentary = (req, res, next) => {
  validateParams(req);
  let Commentary = new Commentary({
    id_user: req.body.id_user,
    detail: req.body.detail,
    id_activity: req.body.id_activity
  });

  Commentary.save(function (err) {
    if (err) console.log(err);

    sendSuccessfullyResponse(res, 'Commentary created successfully.');
  });
};

exports.deactivateCommentary = (req, res, next) => {
  Commentary.findByIdAndDelete(req.params.id, function (err) {
    if (err) return err;
    res.send('Commentary removed successfully.');
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