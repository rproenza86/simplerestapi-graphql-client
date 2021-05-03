// external packages
const express = require('express');

// internal libraries
const createApolloServer = require('./utils/getApolloServer');

async function startApolloServer() {
    const app = express();
    const server = createApolloServer();
    await server.start();

    server.applyMiddleware({ app });

    app.use((req, res) => {
        res.status(200);
        res.send('Hello!');
        res.end();
    });

    await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    return { server, app };
}

startApolloServer();
