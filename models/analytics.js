const mongoose = require('mongoose');
const analyticsSchema = new mongoose.Schema({
    shortCode: { type: String, required: true },
    visits: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    devices: {
        desktop: { type: Number, default: 0 },
        mobile: { type: Number, default: 0 },
    },
    visitData: [
        {
            timestamp: { type: Date, default: Date.now },
            userAgent: String,
            ipAddress: String,
            referrer: String,
        },
    ],
});
module.exports = mongoose.model('Analytics', analyticsSchema);
