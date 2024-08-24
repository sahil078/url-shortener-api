const Url = require('../models/url');
const Analytics = require('../models/analytics');
const { nanoid } = require('nanoid');
const shortid = require('shortid');

exports.shortenUrl = async (req, res) => {
    const { originalUrl, customCode, expirationDate } = req.body;
    const shortCode = customCode ? customCode : nanoid(7);
    try {
        let url = await Url.findOne({ shortCode });
        if (url) return res.status(400).json({ message: 'Short code already exists' });

        url = new Url({ originalUrl, shortCode, expirationDate });
        await url.save();

        res.status(201).json({ shortCode, shortUrl: `${process.env.BASE_URL}/${shortCode}` });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.redirectUrl = async (req, res) => {
    const { code } = req.params;
    try {
        const url = await Url.findOne({ shortCode: code });
        if (!url) return res.status(404).json({ message: 'URL not found' });

        // Check if URL has expired
        if (url.expirationDate && url.expirationDate < Date.now()) {
            return res.status(410).json({ message: 'URL has expired' });
        }

        // Track visit
        await trackVisit(req, code);

        res.redirect(302, url.originalUrl);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const trackVisit = async (req, code) => {
    const analytics = await Analytics.findOne({ shortCode: code }) || new Analytics({ shortCode: code });
    analytics.visits += 1;

    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'];

    // Track unique visitor using IP and User-Agent
    const uniqueHash = bcryptjs.hashSync(ipAddress + userAgent, 10);
    const isUnique = !analytics.visitData.some(v => v.uniqueHash === uniqueHash);
    if (isUnique) {
        analytics.uniqueVisitors += 1;
    }

    // Track by device type
    if (userAgent.includes('Mobile')) {
        analytics.devices.mobile += 1;
    } else {
        analytics.devices.desktop += 1;
    }

    analytics.visitData.push({ timestamp: new Date(), userAgent, ipAddress, uniqueHash });

    await analytics.save();
};
