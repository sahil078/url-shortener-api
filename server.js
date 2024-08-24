const express = require('express');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const { aggregateAnalytics } = require('./tasks/backgroundJobs');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

connectDB();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));
app.use(compression());

// Routes
app.use('/api', urlRoutes);

// Error handling
app.use(errorHandler);

// Start Background Jobs
aggregateAnalytics.start();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
