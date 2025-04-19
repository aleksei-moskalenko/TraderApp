# BTC Trader

## Service requirements

### Business logic
Create a microservice that returns the current price of Bitcoin upon request.

The initial quote must be obtained from the Binance exchange API.
```
https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker
```

After obtaining the price, it is necessary to:
- Apply a 0.01% service commission to the bid and ask
- Calculate the mid price

These values should be returned by the microservice via an HTTP request.

### Infrastructure
The price needs to be updated every 10 seconds.

#### Configuration
Should be configurable through environment variables:
- Update frequency
- Service commission
- HTTP port

#### Run and deploy
The project should include a Dockerfile to run the application.

Upload the result to GitHub.

> _Source https://gist.github.com/Lokki7/059617a2187e3b189936ed2e72de1637_

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```