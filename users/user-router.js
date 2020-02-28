const express = require('express')

const Users = require('./user-model.js')

const router = express.Router()

// endpoints
router.get('/', (req, res) => {
    Users.getUsers()
    .then((users) => {
        res.status(200).json(users)
    })
    .catch(({name, message, stack}) => {
        res.status(500).json({name:name, message:message, stack:stack})
    })
})

router.post('/', (req, res) => {
    const user = req.body
    console.log('This is user:', user)
    if (user && user.username && user.password) {
        Users.addUser(user)
        .then((newUser) => {
            res.status(201).json(newUser)
        })
        .catch(({name, message, stack}) => {
            res.status(500).json({name:name, message:message, stack:stack})
        })
    } else {
        res.status(400).json({message:"Please provide a username and a password." })
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    Users.findById(id)
        .then((user) => {
            if (user === []) {
                res.status(400).json({message:"A user with this id does not exist"})
            } else {
                Users.remove(id)
                    .then((status) => {
                        res.status(200).json({message:"The user has been deleted."})
                    })
                    .catch(({name, message, stack}) => {
                        res.status(500).json({name:name, message:message, stack:stack})
                    })
            }
        })
        .catch(({name, message, stack}) => {
            res.status(500).json({name:name, message:message, stack:stack})
        })
})
// export
module.exports = router