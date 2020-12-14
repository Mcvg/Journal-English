const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Model DB
const User = require('../models/user');

exports.getNewToken = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();

  if (!user) {
    res.status(401).send('No user found');
  }

  var passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) return res.status(401).send('Authentication filed');

  if (passwordIsValid) {
    const token = jwt.sign({ id: user.id }, process.env['API_KEY'], {
      expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  }
};
