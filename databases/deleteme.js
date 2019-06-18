const UsersData = require("./users")

async function printUsers() {
    const [allUsers] = await UsersData.getUsers()
    console.log({ allUsers })
}

module.exports = printUsers