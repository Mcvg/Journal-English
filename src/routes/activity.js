const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity');
const { authentication } = require('../middleware/auth');

const {
  id_user,
  detail_text,
  detail_audio,
} = require('../validations/activity');

const { name } = require('../validations/general');

const validationsCreate = [
  name('name'),
  id_user('id_user'),
  detail_text('detail_text'),
  detail_audio('detail_audio'),
];

router.get('/', authentication, activityController.getActivityList);
router.get('/:id', authentication, activityController.getActivity);
router.post('/create', authentication,  validationsCreate, activityController.createActivity);
router.post('/update/:id', authentication,  activityController.updateActivity);
router.delete('/:id/deactivate', authentication, activityController.deactivateActivity);

module.exports = router;
