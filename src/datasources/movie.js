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
        const movies = await this.store.movies.findAll({raw: true});        
        
        console.log(movies);

            return movies;
    }
};

module.exports = MovieAPI;