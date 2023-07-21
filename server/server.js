const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');

// initialize app
const app = express();
const PORT = process.env.PORT || 3001;

// create a new instance of ApolloServer,
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  persistedQueries: false, 
  cacheControl: {
    defaultMaxAge: 3600, 
    calculateHttpHeaders: false, 
  },
});


// body parser middlewares (require for Graphql to work)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


const startServer = async () => {
  await server.start();

  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};
// start the server and begin listening for incoming requests. 
startServer();

