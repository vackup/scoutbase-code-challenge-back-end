const SQL = require('sequelize');

module.exports.createStore = () => {
    const Op = SQL.Op;
    const operatorsAliases = {
      $in: Op.in,
    };
  
    const db = new SQL('database', 'username', 'password', {
      dialect: 'sqlite',
      storage: './store.sqlite',
      operatorsAliases,
      logging: false,
    });
  
    const movies = db.define('movie', {
      id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },      
      title: SQL.STRING,
      year: SQL.INTEGER,
      rating: SQL.INTEGER,
      createdAt: SQL.DATE,
      updatedAt: SQL.DATE,
    });
  
    const actors = db.define('actor', {
      id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: SQL.STRING,
      birthday: SQL.DATE,
      country: SQL.STRING,
      createdAt: SQL.DATE,
      updatedAt: SQL.DATE,
    });

    const directors = db.define('director', {
        id: {
          type: SQL.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: SQL.STRING,
        birthday: SQL.DATE,
        country: SQL.STRING,
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE,
      });

    const movie_actors = db.define('movie_actors', {
        id_movie: {
          type: SQL.INTEGER,
          primaryKey: true
        },
        id_actor: {
            type: SQL.INTEGER,
            primaryKey: true
          },
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE,
    });

    const actor_directors = db.define('actor_directors', {        
        id_actor: {
            type: SQL.INTEGER,
            primaryKey: true
          },
        id_director: {
            type: SQL.INTEGER,
            primaryKey: true
        },
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE,
    });
  
    return { movies, actors, movie_actors, actor_directors };
};