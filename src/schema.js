const { gql } = require('apollo-server-express');

// The GraphQL schema
const typeDefs = gql`
  type Query {  
    movies: [Movie]
  }

  type Movie {
    title: String
    year: Int
    rating: Int
  }
`;

module.exports = typeDefs;