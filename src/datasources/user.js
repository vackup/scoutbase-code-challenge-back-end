const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
    constructor({ store }) {
      super();
      this.store = store;
    }

    async findById(userId) {
        const users = await this.store.users.findAll({
            where: { id: userId }
        });        

        if (users && users.length === 1) {
            const user = users[0];

            return this.getUser(user);
        }

        return null;
    }

    async findByUserNameAndPassword(username, password) {
        const users = await this.store.users.findAll({
            where: { name: username, password: password }
        });

        if (users && users.length === 1) {
            const user = users[0];

            return this.getUser(user);
        }
        else if (users && users.length > 1) {
            throw "user integrity validation error";
        }

        return null;
    }

    async createUser(username, password) {

        // TODO: validate username doesn't exist

        const user = await this.store.users.create({ name: username, password: password });
        const token = this.getToken(user);

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name
            }
        };
    }

    getToken(user) {
        // TODO: implement stronger auth token please!!!

        return Buffer.from(user.id.toString()).toString('base64');
    }

    getUser(user){
        const token = this.getToken(user);        

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name
            }
        };
    }
};

module.exports = UserAPI;