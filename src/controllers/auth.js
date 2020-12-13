const jwt = require('jsonwebtoken');

// Model DB
const User = require('../models/user');

exports.getNewToken = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password }).exec();

  if (user) {
    const token = jwt.sign({ id: user.id }, process.env['API_KEY'], {
      expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  }
};
