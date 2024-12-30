// auth.js - Middleware for authentication
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ status: 401, message: "Unauthorized Access", error: "Invalid or missing token" });
    }
    next();
};

module.exports = authenticate;
