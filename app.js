import express from 'express';
import quoteRouter from './routes/api/quote/index.js';
import profileRouter from './routes/api/profile/index.js';
import handlePreFlight from './config/handlePreFlight.js';
import connectMongo from './config/connectMongo.js';

// Create express app
const app = express();

// Parse request body as JSON
app.use(express.json());

// Make env variables available
import dotenv from 'dotenv';
dotenv.config();

// Handle preflight request
app.use(handlePreFlight);

// API endpoint for getting stock quote
app.use('/api/quote', quoteRouter);

// API endpoints for CRUD operations on a profile
app.use('/api/profile', profileRouter);

// Connect to MongoDB & listen on specified port
connectMongo()
  .then((res) => {
    app.listen(process.env.PORT, () => {
      console.log(`${res} & listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
