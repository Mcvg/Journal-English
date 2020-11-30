const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity');

router.get('/', activityController.getActivityList);


module.exports = router;
