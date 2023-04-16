// Get quote information using finnhub API

const getQuoteInfo = async function(req, res, next) {
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
      res.json({ data });
    }

  } catch (err) {
    res.json({ err });
  }
}

export default getQuoteInfo