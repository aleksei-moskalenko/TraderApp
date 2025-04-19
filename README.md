# BTC Trader

## Service business requirements

Create a microservice that returns the current price of Bitcoin upon request.

The initial quote must be obtained from the Binance exchange API.
```
https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker
```

After obtaining the price, it is necessary to apply a 0.01% service commission to the bid and ask, and calculate the mid price.
These values should be returned by the microservice via an HTTP request.

The price needs to be updated every 10 seconds.

The update frequency, service commission, and HTTP port should be configurable through environment variables.
The project should include a Dockerfile to run the application.

Upload the result to GitHub.

> Source https://gist.github.com/Lokki7/059617a2187e3b189936ed2e72de1637


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