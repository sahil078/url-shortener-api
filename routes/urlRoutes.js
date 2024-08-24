const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const analyticsController = require('../controllers/analyticsController');
const rateLimiter = require('../middlewares/rateLimiter');

router.post('/shorten', rateLimiter, urlController.shortenUrl);
router.get('/:code', urlController.redirectUrl);
router.get('/analytics/:code', analyticsController.getAnalytics);

module.exports = router;
