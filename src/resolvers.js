// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        movies: (_, __, { dataSources }) =>
        dataSources.movieAPI.getMovies(),
    }
  };

module.exports = resolvers;