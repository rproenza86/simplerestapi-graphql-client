// externals packages
const { gql } = require('apollo-server');

// internal library
const saveFavorite = require('./saveFavorite');

/**
 * In a real situation I would place this on properties,
 * on this challenge I prefer do showcase how to break down by
 * use cases the server schema into more manageable parts.
 */
module.exports.typeDefs = gql`
    type Mutation {
        addFavorite(mlsId: Int!): Favorite @auth
    }

    type Favorite {
        mlsId: Int
        amount: Int
    }
`;

module.exports.resolvers = {
    Mutation: {
        addFavorite: (_, { mlsId }, { dataSources }) => {
            return saveFavorite(mlsId, dataSources);
        },
    },
};
