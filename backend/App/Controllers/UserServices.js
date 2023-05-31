const User = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SecretKey = 'MERNdeveloper'

const addUser = (req) => {
    const { name, email, password, type } = req.body;
    const validation = Object.keys(req.body).length
    if (validation === 5) {
        return User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    const error = new Error('User with this email already exists');
                    error.statusCode = 403;
                    throw error;
                }
                else if (password.length < 8) {
                    const error = new Error('Password should be atleast 8 digit');
                    error.statusCode = 403;
                    throw error;
                }
                else if (name.length < 8) {
                    const error = new Error('Name should be atleast 8 digit');
                    error.statusCode = 403;
                    throw error;
                }
                return bcrypt.genSalt(10)
                    .then((salt) => {
                        return bcrypt.hash(password, salt)
                            .then((secPass) => {
                                const userToken = jwt.sign(name, SecretKey);
                                const newUser = new User({
                                    name,
                                    email,
                                    password: secPass,
                                    type,
                                    token: userToken
                                });
                                return newUser.save()
                                    .then(() => {
                                        console.log("User Created");
                                    }).catch((err) => { throw err });
                            }).catch((err) => { throw err });
                    }).catch((err) => { throw err });
            }).catch((err) => { throw err });
    }
    else {
        const error = new Error('Kindly send valid data');
        error.statusCode = 400;
        throw error;
    }
}
const login = (req) => {
    const { email, password, type } = req.body
    const validation = Object.keys(req.body).length
    if (validation === 3) {
        return User.findOne({ email: email, type: type })
            .then((user) => {
                if (!user) {
                    const error = new Error("Please try to login with correct Credentials");
                    error.statusCode = 400;
                    throw error;
                }
                else if (!user.token) {
                    const error = new Error("Not Authorized User");
                    error.statusCode = 400;
                    throw error;
                }
                else {
                    try {
                        jwt.verify(user.token, SecretKey)
                        return bcrypt.compare(password, user.password)
                            .then((varify) => {
                                if (!varify) {
                                    const error = new Error("Please try to login with correct Credentials");
                                    error.statusCode = 400;
                                    throw error;
                                }
                                else {
                                    const token = jwt.sign({ ID: user.id, Role: user.type }, SecretKey, { expiresIn: 1800 });
                                    return { Authorization: `Bearer ${token}` }
                                }
                            }).catch(err => { throw err })
                    } catch (err) {
                        const error = new Error("Not Authorized User");
                        error.statusCode = 400;
                        throw error;
                    }
                }
            })
            .catch(err => { throw err })
    }
    else {
        const error = new Error("kindly give valid data");
        error.statusCode = 400;
        throw error;
    }
}
const checkToken = (req) => {
    const { token } = req.body
    try {
        jwt.verify(token, SecretKey)
        return { Authorization: `Bearer ${token}` }

    } catch (err) {
        console.log(err)
        const error = new Error("Not Authorized User");
        error.statusCode = 400;
        throw error;
    }
}


module.exports = { checkToken, addUser, login }