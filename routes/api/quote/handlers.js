// Get quote information using finnhub API

const getQuoteInfo = async function(req, res, next) {
  const symbol = req.params.sym;
  if (symbol.length < 1) {
    return res.status(404).json({error: 'Not a valid symbol'});
  }

  try {
    let response = await fetch('https://finnhub.io/api/v1/quote?symbol=' + symbol, {
      method: 'GET',
      headers: {
        "X-Finnhub-Token": process.env.finnhubAPIKey
      }
    });

    let data = await response.json();

    if (response.ok) {
      res.json({ data });
    } else {
      console.log(data);
      throw Error(data.error);
    }

  } catch (error) {
    res.status(429).json({ error: error.message });
  }
}

export default getQuoteInfo