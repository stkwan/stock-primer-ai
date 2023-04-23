// CORS preflight OPTIONS request
export default function handlePreFlight(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  // Set custom headers for CORS
  res.header("Access-Control-Allow-Headers", "Content-Type,Accept,X-Custom-Header");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return next();
};