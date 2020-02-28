const server = require('../api/server.js')
const request = require('supertest')
const db = require('../data/dbConfig.js')

describe('user router', function() {
    // (1) - POST '/' - add a user
    it('POST NEW USER: should return status 201 OK', () => {

        afterEach(async () => {
            await db('users').truncate()
        })

        return request(server).post('/api/users')
        .send({username: 'Nick123546462310', password:'password'})
        .then((response) => {
            console.log("this is response:", response.body)
            expect(response.status).toBe(201)
        })
    })  
    it('POST NEW USER: should return a JSON object', () => {
        return request(server).post('/api/users')
        .send({username:'Nick1235464624545', password:'password'})
        .then((response) => {
            expect(response.body[0]).toEqual({id:2, username:'Nick1235464624545'})
        })
    })
    it('POST NEW USER: type of the response is correct', () => {
        return request(server).post('/api/users')
        .send({username:'tina', password:'password'})
        .then((response) => {
            expect(response.type).toBe('application/json')
        })
    })
    // 
}) 