const server = require('../api/server.js')
const request = require('supertest')
const db = require('../data/dbConfig.js')


describe('user router', function() {
    // (1) - POST '/' - add a user
    it('POST NEW USER: should return status 201 OK', () => {

        beforeEach(async () => {
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
            expect(response.body[0]).toEqual({id:1, username:'Nick1235464624545'})
        })
    })
    it('POST NEW USER: type of the response is correct', () => {
        return request(server).post('/api/users')
        .send({username:'tina', password:'password'})
        .then((response) => {
            expect(response.type).toBe('application/json')
        })
    })
    // (2) - DELETE '/:id' - delete a user
    it('DELETE USER: should return status 200 OK', () => {
        return request(server).post('/api/users')
            .send({username:"willby", password:"destoryed"})
            .then((response) => {
                expect(response.body[0].id).toEqual(1)
                // const id = response.body[0].id
                return request(server).delete('/api/users/1')
                    .then((response) => {
                        expect(response.status).toEqual(200)

                    })
            })
    })
    it('DELETE USER: should return a JSON object', () => {
        return request(server).post('/api/users')
            .send({username:"willby", password:"destoryed"})
            .then((response) => {
                expect(response.body[0].id).toEqual(1)
                // const id = response.body[0].id
                return request(server).delete('/api/users/1')
                    .then((response) => {
                        expect(response.type).toBe('application/json')
                    })
            })
    })
    it('DELETE USER: response message should include the phrase: "user has been deleted".', () => {
        return request(server).post('/api/users')
            .send({username:"willby", password:"destoryed"})
            .then((response) => {
                expect(response.body[0].id).toEqual(1)
                // const id = response.body[0].id
                return request(server).delete('/api/users/1')
                    .then((response) => {
                        expect(response.text).toContain('user has been deleted')
                    })
            })
    })
}) 

