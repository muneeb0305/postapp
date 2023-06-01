const express = require('express')
const { deleteAccount, checkToken, addUser, login, changeEmail, changePassword } = require('../Controllers/UserServices')
const auth = require('../Middleware/auth')
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
router.post('/changeemail', auth, (req, res, next) => {
    changeEmail(req)
        .then(() => {
            res.status(201).send("Email Changed")
        })
        .catch(err => next(err))
})
router.post('/changepassword', auth, (req, res, next) => {
    changePassword(req)
        .then(() => {
            res.status(201).send("Password Changed")
        })
        .catch((error) => next(error));
})
router.delete('/deleteaccount', auth, (req, res, next) => {
    deleteAccount(req)
        .then(() => {
            res.status(201).send("Account Deleted")
        })
        .catch((error) => next(error));
})


module.exports = router