const express = require('express');
const app = express();

// Make env variables available
const dotenv = require('dotenv').config();

// CORS preflight OPTIONS request
const handlePreflight = function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header("Access-Control-Allow-Headers", "Content-Type,Accept,X-Custom-Header");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return next();
};

app.use(handlePreflight);

app.get('/', (req, res, next) => {
  res.send('Hello world!');
});

app.get('/api/quote/:sym', async (req, res, next) => {
  const symbol = req.params.sym;
  try {
    let response = await fetch('https://finnhub.io/api/v1/quote?symbol=' + symbol, {
      method: 'GET',
      headers: {
        "X-Finnhub-Token": process.env.finnhubAPIKey
      }
    });

    if (response.ok) {
      let data = await response.json();
      res.json({data});
    }

  } catch (err) {
    res.json({err});
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Now listening on port ${process.env.PORT}`);
});