const Sequelize = require('sequelize');

module.exports.createStore = () => {
    
    //process.env.DATABASE,
    //process.env.DATABASE_USER,
    //process.env.DATABASE_PASSWORD,

    const sequelize = new Sequelize(
        'ScoutbaseDB',
        'postgres',
        '123456*',
        {
          dialect: 'postgres',
          host: "127.0.0.1"
        },
      );

    const movies = sequelize.define('movie', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },      
        title: Sequelize.STRING,
        year: Sequelize.INTEGER,
        rating: Sequelize.INTEGER,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

    const actors = sequelize.define('actor', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.STRING,
        birthday: Sequelize.DATE,
        country: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

    const directors = sequelize.define('director', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.STRING,
        birthday: Sequelize.DATE,
        country: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

    actors.belongsToMany(movies, {through: 'movies_actors'});
    movies.belongsToMany(actors, {through: 'movies_actors'});

    directors.belongsToMany(actors, {through: 'actors_directors'});
    actors.belongsToMany(directors, {through: 'actors_directors'});

    const users = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            unique: true 
        },
        password: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

    sequelize.sync();

    return { movies, actors, directors, users }; 
};