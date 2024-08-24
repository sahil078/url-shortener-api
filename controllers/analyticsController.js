const Analytics = require('../models/analytics');

exports.getAnalytics = async (req, res) => {
    const { code } = req.params;
    try {
        const analytics = await Analytics.findOne({ shortCode: code });
        if (!analytics) return res.status(404).json({ message: 'Analytics not found' });

        const data = {
            originalUrl: analytics.originalUrl,
            totalVisits: analytics.visits,
            uniqueVisitors: analytics.uniqueVisitors,
            devices: analytics.devices,
            visitData: analytics.visitData,
        };

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
