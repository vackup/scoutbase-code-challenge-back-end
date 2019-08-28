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

        //const movies_actors = await this.store.movies_actors.findAll();
        
        return movies;
    }
};

module.exports = MovieAPI;