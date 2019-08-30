const { GraphQLScalarType } = require('graphql');

// A map of functions which return data for the schema.
const resolvers = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A date and time, represented as an ISO-8601 string',
        serialize: (value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value)
    }),

    Query: {
        movies: async (_, __, context) =>
            await context.dataSources.movieAPI.getMovies(context.user),
    },

    Mutation: {
        login: async (_, { username, password }, context) => 
            await context.dataSources.userAPI.findByUserNameAndPassword(username, password),

        createUser: async (_, { username, password }, context) => 
            await context.dataSources.userAPI.createUser(username, password),
      },
  };

module.exports = resolvers;