const express = require('express')

// create server
const server = express()
// routers
const userRouter = require('../users/user-router.js');
// global middleware
server.use(express.json())
// introduce routes
server.use('/api/users', userRouter)
// endpoint
server.get('/', (req, res) => {
    res.status(200).json({status:'working...'})
})
// export the server to index.js
module.exports = server