var express = require('express');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./store');
const MovieAPI = require('./datasources/movie');
const UserAPI = require('./datasources/user');

const store = createStore();

const dataSources = () => ({
  movieAPI: new MovieAPI({ store }),
  userAPI: new UserAPI({ store }),
});

const context = async ({ req }) => {
  const auth = (req.headers && req.headers.authorization) || '';
  const userId = new Buffer(auth, 'base64').toString('ascii');
  
  // const userAPI = new UserAPI({ store });
  // const user = await userAPI.findById(userId);
  
  return { 
    user: userId,
    dataSources: dataSources()
   };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

const app = express();

server.applyMiddleware({ app }); // app is from an existing express app

app.listen(3000, () =>
  console.log('App listening on port 3000!'),
);