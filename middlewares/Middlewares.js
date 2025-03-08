const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, 'secret-key', (err, decoded) => {
      if (err) return res.status(403).send('Invalid token');
      req.user = decoded;
      next();
  });
  };
  
const adminauthenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, 'secret-key', (err, decoded) => {
      if (err) return res.status(403).send('Invalid token');
      if (decoded.isAdmin == false) return res.status(403).send('Not an admin');
      req.user = decoded; r
      next();
  });
  };

  module.exports = {authenticate, adminauthenticate}