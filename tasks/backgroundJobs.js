const { CronJob } = require('cron');
const Analytics = require('../models/analytics');

const aggregateAnalytics = new CronJob('0 * * * *', async () => {
    console.log('Running hourly analytics aggregation...');
    // Implement your aggregation logic here
});

module.exports = {
    aggregateAnalytics,
};
