# Introduction

Hi there 👋,

Thanks for taking the time to complete this brief take-home assignment. Please timebox your effort to a maximum of 5 hours.

The goal of this exercise is to evaluate your backend skills (Node.js, GraphQL, 3rd-party integration, and testing). Feel free to make any assumptions, simplifications, or other changes to the problems - though please state those in your write up when you submit this assignment. Please use as many libraries as is reasonable - there is no sense in rebuilding what has been built.

Using Apollo Server and Express.js, you will create a GraphQL endpoint to retrieve a list of properties for sale in a city. SimplyRETS is an API commonly used in the real estate world and you will need to use it to retrieve the properties data.

Before getting started, please read this document carefully.

**Good luck 🙃**

# Getting started

With latest Node LTS installed, run the following commands in order:

```sh
yarn install
yarn start:db
yarn start:app
```  

Navigate to `http://localhost:4000/graphql`.

## What will you find inside this boilerplate

In this boilerplate, you will find:
- The main entry file: `index.js`
- The mongodb in-memory server file: `database.js`
  - You shouldn't have to touch this file.
  - It's important to start the DB first before running your app
  - The database uri: *mongodb://127.0.0.1:27017/properties?*
  - This is a mongod istance that spawns on the side of your application. **NOTE**: the data does not persist when you shut down the server. We seed two users with access tokens on database start. Please read Acceptance Criteria below for more details
- All the types from the SimplyRETS API ready to use with GraphQL: `types/index.js`
- A `README.md` file to document your comments and design decisions
- Inside the `package.json`, we added the following packages:
  - `express`,
  - `apollo-server-express`,
  - `jest`
- We have also included mongodb as the driver to seed initial data but please feel free to use any mongo driver you wish

## SimplyRETS API

SimplyRETS is a platform for developers and agents to build real estate applications and websites.

Their API uses Basic Authentication, which most HTTP libraries will handle for you. To use the test data (which is what this pages uses), you can use the api key `simplyrets` and secret `simplyrets`. Note that these test listings are not live RETS listings but the data, query parameters, and response bodies will all work the same.

Please use the following endpoint: `https://api.simplyrets.com/properties`

# Acceptance criteria

- Use  [Express.js](https://github.com/expressjs/express) as a Node.js HTTP framework
- Use [Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/) as your graphql framework. You can use GraphiQL to interact with your endpoints, you **do not** have to build a client interface. We have included both express & apollo server in package.json for you.
- Add Bearer HTTP Authentication to restrict access to all GraphQL endpoints. We have seeded the following two users into the users collection for you. No need to add, edit, or delete users.
```
    [{
      "email": "user1@sideinc.com",
      "token": "676cfd34-e706-4cce-87ca-97f947c43bd4",
    }, {
      "email": "user2@sideinc.com",
      "token": "2f403433-ba0b-4ce9-be02-d1cf4ad6f453",
    }]
```
- Store and maintain a “favorite counter” in MongoDB for each property listing. The favorite counter tracks how many people marked a listing as favorite.
- Add the following GraphQL functionality:
  - A GraphQL mutation to increment the favorite counter by 1. This endpoint would be called when someone clicks on the “Mark as favorite” button for a listing. But you do not need to implement a frontend interface.
  - A GraphQL query that is fetching data from the SimplyRETS API endpoint ([documentation here](https://docs.simplyrets.com/api/index.html#/Listings/get_properties)). For each result, you need to inject the “favorite counter” from MongoDB.
    - We should be able to filter properties by city.
    - You do not need to add pagination support.
    - SimplyRETS endpoint: [https://api.simplyrets.com/properties](https://api.simplyrets.com/properties)    (API login: “simplyrets” / API token: “simplyrets”)
    - Example:
```
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
```

- Add unit tests and/or integration tests
- Explain some of your design decisions in the README.md file.


# What you will be assessed on?

- All functional requirements must be satisfied
- Production-like code that must be well coded, clean, and commented
- Tests must be passing and meaningful
- General Node.js knowledge

# Submission

Once you are satisfied with your assignment, please publish your code (ignore the `node_modules` folder) to a Git repository and send the repository link to `eng.assignment@sideinc.com`.  

