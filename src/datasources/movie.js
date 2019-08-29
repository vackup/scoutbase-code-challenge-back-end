const { DataSource } = require('apollo-datasource');

class MovieAPI extends DataSource {
    constructor({ store }) {
      super();
      this.store = store;
    }

    initialize(config) {
      this.context = config.context;
    }

    async getMovies() {          
      const movies = await this.store.movies.findAll();

      return movies
        ? movies.map(movie => this.getMovieModel(movie)) 
        : [];
    }

    getMovieModel(movie) {
      return {
        title: movie.title,
        year: movie.year,
        rating: movie.rating,
        actors: movie.getActors()
      };
    }
};

module.exports = MovieAPI;