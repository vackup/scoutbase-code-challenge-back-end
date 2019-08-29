const Sequelize = require('sequelize');

module.exports.createStore = () => {
    const Op = Sequelize.Op;
    const operatorsAliases = {
        $in: Op.in,
    };

    const sequelize = new Sequelize('database', 'username', 'password', {
        dialect: 'sqlite',
        storage: './store.sqlite',
        operatorsAliases,
        logging: false,
    });

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

    sequelize.sync();

    return { movies, actors, directors }; 
};