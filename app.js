import express from 'express';
import { router as quoteRoutes } from './routes/api/quote/index.js';
import handlePreFlight from './config/handlePreFlight.js';

// Create express app
const app = express();

// Make env variables available
import dotenv from 'dotenv';
dotenv.config();

// Handle preflight request
app.use(handlePreFlight);

// API endpoint for getting stock quote
app.use('/api/quote', quoteRoutes);

// Start listening on specified port
app.listen(process.env.PORT, () => {
  console.log(`Now listening on port ${process.env.PORT}`);
});