const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') { // Assuming `role` is part of the user data
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next(); // Proceed if the user is an admin
};

module.exports = authorizeAdmin;
