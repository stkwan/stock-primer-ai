// CORS preflight OPTIONS request
export default function handlePreFlight(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "https://primestock.vercel.app"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  // Set custom headers for CORS
  res.header("Access-Control-Allow-Headers", "Content-Type,Accept,X-Custom-Header,Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return next();
};