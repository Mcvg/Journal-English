const express = require('express');
const router = express.Router();
const commentaryController = require('../controllers/commentary');
const { authentication } = require('../middleware/auth');

const {
  id_user,
  detail,
  id_activity,
} = require('../validations/commentary');

const validationsCreate = [
  id_user('id_user'),
  detail('detail'),
  id_activity('id_activity'),
];

router.get('/', authentication, commentaryController.getCommentaryList);
router.get('/detail', authentication, commentaryController.getCommentary);
router.post('/create', authentication,  validationsCreate, commentaryController.createCommentary);
router.delete('/:id/deactivate', authentication, commentaryController.deactivateCommentary);

module.exports = router;