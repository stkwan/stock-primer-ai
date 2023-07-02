# PrimeStock (Backend)

[PrimeStock](https://primestock.vercel.app/) is a web application for paper trading. [Paper trading](https://en.wikipedia.org/wiki/Stock_market_simulator) is a way to practice trading stocks without having to use real money. It simulates the trading experience and serves to help both new and experienced traders become more disciplined and better traders.

You are currently viewing the backend code of this application. [The frontend code is available here](https://github.com/stkwan/frontend-stock-primer-ai).

## Description

My enthusiasm for coding and trading was the inspiration for writing this application. The backend of this application uses an Express/NodeJS framework in conjunction with a MongoDB database. It exposes a RESTful API which accepts and returns JSON. Notable implementations within the backend code include:

* Cross-Origin Resource Sharing in order to communicate with frontend hosted on a different domain.
* JSON Web Token in order to implement authentication.
* Validation of user input prior to saving data on database.
* Proper use of environment variables to ensure security of API keys, SECRETS, and database URI string.
* Calls to [finhubb.io](https://finnhub.io/) Stock API to fetch live stock quotes.

## Getting Started

### Dependencies

* Node v18.14.0
* See package.json for libraries and dependencies

### Installing

* In order to run the backend API locally, you must have the following environment variables configured:
* `Mongo_URI`(https://www.mongodb.com/)
* `finnhubAPIKey`(https://finnhub.io/)
* `SECRET` for your JSON Web Token

* To avoid these steps and use the UI you can simply visit the [production application](https://primestock.vercel.app/).

* To install, enter in the command line:

```
npm install
```

### Executing program
To run, enter in the command line:

```
npm run app
```

## Author

[Steven Kwan](https://github.com/stkwan)

