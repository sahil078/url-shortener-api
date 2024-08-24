const { RateLimiterMemory } = require('rate-limiter-flexible');
require('dotenv').config();

const rateLimiter = new RateLimiterMemory({
    points: process.env.RATE_LIMIT_MAX,
    duration: process.env.RATE_LIMIT_WINDOW * 60,
});

module.exports = (req, res, next) => {
    rateLimiter.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).json({ message: 'Too many requests' });
        });
};
