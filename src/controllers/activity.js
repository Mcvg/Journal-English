const { validationResult } = require('express-validator');
const { validatorError, serverError } = require('../utils/errors');
const Activity = require('../models/activity');
const activity = require('../models/activity');

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
      }
    }, (err, activities) => {
      if (err) return err;

      res.send(activities);
    });
  } catch (e) {
    serverError(e);
  }
};

exports.createActivity = (req, res, next) => {
  validateParams(req);
  validateAudio(req.body.detail_audio);
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
function validateAudio(nameFile) {
  const FileType = require('file-type');
  const FS = require('fs')

  FS.readFile(nameFile, 'utf8', (error, datos) => {
    if (error) throw error;
    var expresion = /<script>/g;
    if (datos.match(expresion) !== null || FileType.fromFile('nameFile').ext != "mp3") {
      const requestError = new Error('Validation file failed');
      requestError.statusCode = 422;
      throw requestError;
    }
  });
}
exports.deactivateActivity = (req, res, next) => {
  Activity.findByIdAndDelete(req.params.id, function (err) {
    if (err) return err;
    res.send('Activity removed successfully.');
  });
};


exports.updateActivity = (req, res, next) => {
  if(req.body.detail_audio != undefined){
    validateAudio(req.body.detail_audio);
  }
  
  let activity = new Activity ({
    name: req.body.name,
    id_user: req.body.id_user,
    detail_text: req.body.detail_text,
    detail_audio: req.body.detail_audio
  });
  Activity.findOneAndUpdate(req.body.id,activity, function (err) {
    if (err) return err;
    res.send('Activity updated successfully.');
  });
}


const validateParams = (req) => {
  const errorList = validationResult(req);
  if (!errorList.isEmpty()) {
    validatorError(errorList);
  }
};

const sendSuccessfullyResponse = (res, message) =>
  res.status(201).json({ message });