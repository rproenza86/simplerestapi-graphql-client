# simplerestapi-graphql-client

> GraphQL Workshop

This is service app to create a basic GraphQL server.

## Description

GraphQL server project built using Apollo Server and ExpressJS.

The service is using directives to enable security by checking user auth. Two data sources were created to support CRUDs ops.

The app is an orchestration of :

1. apollo-server
2. express
3. graphql
4. SimpleREST.com API

## API Requirements

1. Consumers of the service should be able of use the serve endpoint to:

    - Execute mutation to increment a property favorite counter by 1.
    - Fetching properties data from the SimplyRETS API and for each result, inject the “favorite counter” from MongoDB.
        - We should be able to filter properties by city.

Example:
query {
properties(city: "San Francisco") {
listingId
favoriteCount // coming from MongoDB, everything else comes from SimplyRETS
listPrice
property {
area
bedrooms
}
address
disclaimer
}
}

2. Unit tests and/or integration tests support
    > Added one test suite of each type. Added also un-implemented test cases to show other scenarios that need to be tested.

## How to Test

To perform the API operations you could use:

1. The `.rest` files placed on the [`docs/restFulCalls/`](https://github.com/rproenza86/taco-chef-service/tree/master/docs/restFulCalls) directory.
2. Postman collection shared on the [`docs/postman/`](https://github.com/rproenza86/taco-chef-service/tree/master/docs/postman/) directory.

> For more details check the below demo

### Tests Demo

1. With latest Node LTS installed, run the following commands in order:

```sh
npm ci
npm run start:db
npm run start:app
```

2. Use the [Insomnia requests collection](docs/serviceRequestsCollection/Insomnia_SimpleREST.json) exported on the `docs` directory
   to test the service running locally.
