const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const header = req.headers['authorization'] || req.headers['Authorization'];
    const token = header && header.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = decoded;
      next();
    });
  } catch (err) {
    res.status(500).json({ message: 'Authentication error', error: err.message });
  }
};
