const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity');

const  { name, id_user,  detail_text, detail_audio  } = require('../utils/activityValidation')

const validationsCreate= [name('name'),id_user('id_user'), detail_text('detail_text'), detail_audio('detail_audio') ]

router.get('/', activityController.getActivityList);
router.get('/:id', activityController.getActivity);
router.post('/create', validationsCreate, activityController.createActivity);
router.delete('/:id/deactivate', activityController.deactivateActivity);


module.exports = router;
