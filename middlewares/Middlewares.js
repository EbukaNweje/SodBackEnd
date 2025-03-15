const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, 'secret-key', (err, decoded) => {
  //  console.log(err)
      if (err) return res.status(403).send('Invalid token');
      req.user = decoded;
      // console.log(req.user)
      // console.log(decoded)
      next();
  });
  };
  
const adminauthenticate = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, 'secret', (err, decoded) => {
      if (err) return res.status(403).send('Invalid token');
      if (decoded.isAdmin == false) return res.status(403).send('Not an admin');
      req.user = decoded; 
      next();
  });
  };

  module.exports = {authenticate, adminauthenticate}