const { gql } = require('apollo-server-express');

// The GraphQL schema
const typeDefs = gql`
    scalar DateTime

    type Query {  
        movies: [Movie]
    }

    type Mutation {        
        createUser(username: String, password: String): UserAccessData

        login(username: String, password: String): UserAccessData
    }

    type UserAccessData {
        token: String,
        user: User
    }

    type User {
        id: ID,
        name: String
    }

    type Movie {
        title: String
        year: Int
        rating: Int
        scoutbase_rating: Float
        actors: [Actor]
    }

    type Actor {
        name: String
        birthday: DateTime
        country: String
        directors: [Director]
    }

    type Director {
        name: String
        birthday: DateTime
        country: String
    }
`;

module.exports = typeDefs;