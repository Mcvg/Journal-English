const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization-token'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env['API_KEY'], (err, data) => {
    if (err) return res.sendStatus(403);
    req.data = data;
    next();
  });
};

module.exports = {
  authentication,
};
