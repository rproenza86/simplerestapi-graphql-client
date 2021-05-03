// externals packages
const { gql } = require('apollo-server');

// internal library
const getProperties = require('./getProperties');

// I like to use `gql` to have a better development experience
module.exports.typeDefs = gql`
    type Query {
        properties(city: String): [Listing] @auth
    }
`;

module.exports.resolvers = {
    Query: {
        properties: (_, { city }, { dataSources }) => {
            return getProperties(city, dataSources);
        },
    },
};
