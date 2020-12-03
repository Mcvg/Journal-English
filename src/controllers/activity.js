const { validationResult } = require('express-validator');
const { validatorError, serverError } = require('../utils/errors');
const Activity = require('../models/activity');

exports.getActivityList = (req, res, next) => {
  try {
    Activity.find({}, (err, activities) => {
      if (err) return err;

      res.send(activities);
    });
  } catch (e) {
    serverError(e);
  }
};


exports.getActivity = (req, res, next) => {
  try {
    const { id } = req.params;
    Activity.findOne({ 
      where: {
        id_user: req.body.id
      }}, (err, activities) => {
      if (err) return err;

      res.send(activities);
    });
  } catch (e) {
    serverError(e);
  }
};

exports.createActivity = (req, res, next) => {
  validateParams(req);

  let activity = new Activity({
    name: req.body.name,
    id_user: req.body.id_user,
    detail_text: req.body.detail_text,
    detail_audio: req.body.detail_audio
  });

  activity.save(function (err) {
    if (err) console.log(err);

    sendSuccessfullyResponse(res, 'Activity created successfully.');
  });
};

exports.deactivateActivity = (req, res, next) => {
  User.findByIdAndDelete(req.params.id, function (err) {
    if (err) return err;
    res.send('Activity removed successfully.');
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