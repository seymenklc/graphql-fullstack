const jwt = require('jsonwebtoken');

function generateToken({ id, email, username }) {
    return jwt.sign(
        {
            id,
            email,
            username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1hr'
        }
    );
};

module.exports = generateToken;