const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    // Get the token from the request header
    const authHeader = req.headers['authorization'];
    let token;
    if (authHeader) {
        token = authHeader.split(' ')[1];
    }

    // If no token is found, return an error
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify the token and extract the user ID
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.userId;

        // Find the user in the database
        const user = await User.findById(userId);

        // If user is not found, return an error
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Add the user object to the request object
        req.user = user;

        // Call the next middleware function
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    authenticate
};