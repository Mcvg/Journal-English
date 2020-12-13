const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const userController = require('../controllers/user');
const { authentication } = require('../middleware/auth');
// Validations
const { name } = require('../validations/general');
const { email, password } = require('../validations/user');

const validationsCreate = [
  name('first_name'),
  name('last_name'),
  email('email'),
  password('password'),
];

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', authentication, userController.getUserList);
router.get('/detail', authentication, userController.getUser);
router.post(
  '/create',
  authentication,
  validationsCreate,
  userController.createUser
);
router.post('/update', authentication, userController.updateUser);
router.post('/deactivate', authentication, userController.deactivateUser);

module.exports = router;
