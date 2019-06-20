class Carts {
    constructor() {
        this.pool = require("../../databases/mysql-pool");
    }

    async getConnection() {
        return this.pool.getConnection()
    }

    async getUsers() {
        const connection = await this.getConnection()
        return connection.query("SELECT * FROM users_cart");
    }

    async getUsers(id) {
        const connection = await this.getConnection()
        return connection.query("SELECT * FROM users_cart where id = " + id);
    }

    async updateUsers() {
        const connection = await this.getConnection()
        connection.query("UPDATE ....")
    }

}

const CarsData = new Carts();
module.exports = CarsData;