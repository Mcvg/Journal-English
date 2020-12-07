const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

// Validations
const { name } = require('../validations/general');
const { email, password } = require('../validations/user');

const validationsCreate = [
  name('first_name'),
  name('last_name'),
  email('email'),
  password('password'),
];

router.get('/', userController.getUserList);
router.get('/detail', userController.getUser);
router.post('/create', validationsCreate, userController.createUser);
router.delete('/:id/deactivate', userController.deactivateUser);

module.exports = router;
