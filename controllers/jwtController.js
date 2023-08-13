const UserJWT = require('../models/userJWT');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate a JWT for the user with the specified ID and return it
async function generateJWT(userId) {
    const token = jwt.sign({ userId, timestamp: Date.now() }, process.env.SECRET_KEY, { expiresIn: '1h' }); // set expiration to 1 hour
    const creationDate = new Date();
    const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // expiry date is 1 hour from now
    await UserJWT.create({ userId, token, creationDate, expiryDate }); // save to database
    return token;
}

exports.apiReg = async (req, res) => {
    const { email, password, userName } = req.body;

    // Check if email already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user in the database
    const user = new User({ email, password, userName});
    await user.save();

    // Generate a JWT for the user
    const token = await generateJWT(user._id);

    // Send the JWT to the client
    res.status(200).json({ 'token': token });
};

exports.apiLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (user) {
        if (user.password === password) {
            const token = await generateJWT(user._id);
            res.status(200).json({ 'token': token });
        } else {
            return res.status(401).json({ message: 'Invalid login credentials' });
        }
    } else {
        res.status(400).json({ 'massage': 'invalid login info' });
    }
}

exports.token = async (req, res) => {
    // get the token from the req header
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ 'massage': 'authentication required' });
    }

    const headerToken = authHeader.split(' ')[1];

    try {
        // check if the token is valid and not expired
        const decoded = jwt.verify(headerToken, process.env.SECRET_KEY);
        const { userId } = decoded;
        const user = await UserJWT.findOne({ userId, token: headerToken });
        if (!user) return res.status(403).json({ 'massage': 'invalid token' });
        if (user.expiryDate < new Date()) return res.status(401).json({ 'massage': 'token expired' });

        return res.status(200).json({ 'massage': 'welcome to home' });
    } catch (err) {
        return res.status(403).json({ 'massage': 'invalid token ' });
    }
};
