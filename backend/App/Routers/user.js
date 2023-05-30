const express = require('express')
const { checkToken, addUser, login } = require('../Controllers/UserServices')
const router = express.Router()

router.put('/add', (req, res, next) => {
    addUser(req)
        .then(() => {
            res.status(201).send("User Created")
        })
        .catch(err => next(err))
})
router.post('/login', (req, res, next) => {
    login(req)
        .then((auth) => {
            res.status(201).send(auth)
        })
        .catch(err => next(err))
})
router.post('/checktoken', (req, res, next) => {
    try {
        const result = checkToken(req)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})


module.exports = router