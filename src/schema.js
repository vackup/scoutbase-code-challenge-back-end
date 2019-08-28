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
    actors: [Actor]
  }

  type Actor {
    name: String
    birthday: String
    country: String
    directors: [Director]
  }

  type Director {
    name: String
    birthday: String
    country: String
  }
`;

module.exports = typeDefs;