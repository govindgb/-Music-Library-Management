const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication token missing or invalid' });
    }
  
    // Extract the token (removing "Bearer ")
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user information to the request object
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = {authenticate};
