const db = require('../data/dbConfig.js')

module.exports = {
    // helper functions
    getUsers,
    addUser,
    remove,
    findById
}

function getUsers() {
    return db('users').select('id', 'username')
}

function addUser(user) {
    return db('users')
            .insert(user, 'id')
            .then((ids) => {
                const [id] = ids
                return findById(id)
            })
}

function remove(id) {
    return db('users')
        .delete()
        .where({ id })
}

function findById(id) {
    return db('users')
        .select('id', 'username')
        .where({ id })
}

