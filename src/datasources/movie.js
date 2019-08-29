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
      
      const isUserLogged = this.isUserLogged();     

      // TODO: eager loading
      const movies = await this.store.movies.findAll();

      return movies && movies.length > 0
        ? movies.map(movie => this.getMovieModel(movie, isUserLogged)) 
        : [];
    }

    getMovieModel(movie, isUserLogged) {     

      const actors = movie.getActors();

      return {
        title: movie.title,
        year: movie.year,
        rating: movie.rating,
        scoutbase_rating: isUserLogged ? this.generateRandomNumber() : null,
        actors: actors.map(actor => this.getActorModel(actor))
      };
    }

    generateRandomNumber() {
      var min = 5.0,
          max = 9.0,
          highlightedNumber = Math.random() * (max - min) + min;
  
      return highlightedNumber;
  };

    isUserLogged() {     
      console.log(this.context && this.context.userId);

      return this.context && this.context.userId;
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