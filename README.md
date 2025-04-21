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


## Install dependencies

- NVM and Node `lts/jod`
- Enable corepack
- Install dependencies with `pnpm`
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

## Or just...
```bash
docker compose --env-file .env up -d && pnpm dlx open-cli http://localhost:3002/api
```

## What can be done better:
- I use generic exceptions, to which all necessary parameters are passed. However, this system can be corrected and instances of exception classes can be created, where both basic categories and error codes and so on will be stored.
- The interceptor that validates the input and output DTO is not implemented. This could be a class-validator, but I prefer to create DTOs through a custom interceptor and through zod validation.
```typescript
class CreateUserDTO {
  
  static fromPojo(data:unknown){
    const validated = z.object({
      name: z.string(),
      age: z.number()
    }).parse(data)
    
    return new CreateUserDTO(validated)
  }
}
```
- It may be worthwhile to calculate a fresh quote in background mode, but this will add to the network load and the possible cost of requests.
