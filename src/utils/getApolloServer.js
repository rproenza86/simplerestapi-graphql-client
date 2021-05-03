// external packages
const { ApolloServer } = require('apollo-server-express');

// types
const types = require('../types');

// schemas and resolver
const properties = require('../properties/graphql.js');
const favorite = require('../favorite/graphql');

// directives
const AuthDirective = require('../directives/auth');

// dataSources
const { dbClient } = require('../datasources/dbClient');
const SimpleRESTAPI = require('../datasources/simpleRest');

// mocks
const { mockUser } = require('../__mocks__/database');

function getApolloServer(isTest = false) {
    const server = new ApolloServer({
        typeDefs: [types, properties.typeDefs, favorite.typeDefs, AuthDirective.TypeDef],
        resolvers: [properties.resolvers, favorite.resolvers],
        schemaDirectives: {
            auth: AuthDirective,
        },
        dataSources: () => ({
            simpleRESTAPI: new SimpleRESTAPI(),
            dbClient,
        }),
        /**
         * I could add the dbClient instance to the context but I really don't like this approach
         */
        context: async ({ req }) => {
            if (mockUser) {
                return { user: mockUser };
            }

            const rawToken = req.headers.authorization || '';
            const token = rawToken.split(' ')[1] || '';

            try {
                // Try to retrieve a user with the token
                const user = await dbClient.getUserByToken(token);

                // Add the user to the context
                return { user };
            } catch (error) {
                console.error(error);
                return {};
            }
        },
    });

    return server;
}

module.exports = getApolloServer;
