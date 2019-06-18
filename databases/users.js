class Users {
    constructor() {
        this.pool = require("./mysql-pool")
    }

    async getConnection() {
        return this.pool.getConnection()
    }

    async getUsers() {
        const connection = await this.getConnection()
        return connection.query("SELECT * FROM users");
    }

    async getUser(id) {
        const connection = await this.getConnection()
        return connection.query("SELECT * FROM users where id = " + id);
    }

    async updateUser(giveName, surname, email){
        const connection = await this.getConnection()
        connection.query("UPDATE ....")        
    }


}

const UsersData = new Users();
module.exports = UsersData