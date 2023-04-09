const express = require('express');
const app = express();

// Make env variables available
const dotenv = require('dotenv').config();

app.get('/', (req, res, next) => {
  res.send('Hello world!');
});

app.listen(process.env.PORT, () => {
  console.log(`Now listening on port ${process.env.PORT}`);
});