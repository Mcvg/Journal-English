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

 // validateAudio();
  activity.save(function (err) {
    if (err) console.log(err);

    sendSuccessfullyResponse(res, 'Activity created successfully.');
  });
};
/*function validateAudio(){
  const FileType = require('file-type');
  const FS = require('fs')
(async () => {
    console.log(await FS.readFile('editar.png'));
    if ((await FileType.fromFile('editar.png')).ext != "mp3"){
      res.send('the file extension is wrong.');
    }
})();
}*/
exports.deactivateActivity = (req, res, next) => {
  User.findByIdAndDelete(req.params.id, function (err) {
    if (err) return err;
    res.send('Activity removed successfully.');
  });
};


exports.updateActivity= (req, res, next) => {
  Activity.findOneAndUpdate(req.body.id, req.body.data, function (err) {
    if (err) return err;
    res.send('Activity updated successfully.');
  });
  
  console.log(req.params);
  /*const activities = Activity.findAll({
    attributes: ['id', 'name', 'id_user', 'detail_text', 'detail_audio'],
    where:{
      id
    }
  });
  if(activities.length > 0){
    activities.forEach(activity =>{
      activity.update({
        name,
        id_user,
        detail_text,
        detail_audio
      })
    })
  }
  return res.json({
    message:'Activity Updated succesfully',
    data: activities
  })*/
}


const validateParams = (req) => {
  const errorList = validationResult(req);
  if (!errorList.isEmpty()) {
    validatorError(errorList);
  }
};

const sendSuccessfullyResponse = (res, message) =>
  res.status(201).json({ message });