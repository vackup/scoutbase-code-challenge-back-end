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
      
      // TODO: eager loading
      const movies = await this.store.movies.findAll();

      return movies && movies.length > 0
        ? movies.map(movie => this.getMovieModel(movie)) 
        : [];
    }

    getMovieModel(movie) {

      const actors = movie.getActors();

      return {
        title: movie.title,
        year: movie.year,
        rating: movie.rating,
        actors: actors.map(actor => this.getActorModel(actor))
      };
    }

    getActorModel(actor){

      const directors = actor.getDirectors();

      return {
        name: actor.name,
        birthday: new Date(actor.birthday),
        country: actor.country,
        directors: directors.map(director => this.getDirectorModel(director))
      };     
    }

    getDirectorModel(director) {
      return {
        name: director.name,
        birthday: new Date(director.birthday),
        country: director.country
      };
    }
};

module.exports = MovieAPI;