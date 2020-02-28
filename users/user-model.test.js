// const server = require('../api/server.js')
// const request = require('supertest')
const db = require('../data/dbConfig.js')
const Users = require('./user-model.js')

    // helper functions
    // - getUsers
    // - addUser
    // - remove
    // - findById

describe('users model', () => {

    // afterEach(async () => {
    //     await db('users').truncate()
    //       }) 

          it('should add a user', () => {
              Users.addUser({username:"test", password:"password"})
                .then((response) => {
                    expect(db('users').toHaveLength(1))
                })
          })

          it('should delete the user', () => {
              Users.remove(1)
                .then((response) => {
                    expect(db('users').toHaveLength(0))
                })
          })

})
