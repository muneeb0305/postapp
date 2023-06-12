const User = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SecretKey = 'MERNdeveloper'

//Add User
const addUser = (req) => {
    //Get name, email, password, type from req.body
    const { name, email, password, type } = req.body;
    //check body validations
    const validation = Object.keys(req.body).length
    if (validation === 5) {
        //find user with the given email
        return User.findOne({ email: email })
            .then((user) => {
                //if user found with same email then show error
                if (user) {
                    const error = new Error('User with this email already exists');
                    error.statusCode = 403;
                    throw error;
                }
                //check password length
                else if (password.length < 8) {
                    const error = new Error('Password should be atleast 8 digit');
                    error.statusCode = 403;
                    throw error;
                }
                //check name length
                else if (name.length < 8) {
                    const error = new Error('Name should be atleast 8 digit');
                    error.statusCode = 403;
                    throw error;
                }
                //hash password
                return bcrypt.genSalt(10)
                    .then((salt) => {
                        return bcrypt.hash(password, salt)
                            .then((secPass) => {
                                //token create
                                const userToken = jwt.sign(name, SecretKey);
                                //create user
                                const newUser = new User({
                                    name,
                                    email,
                                    password: secPass,
                                    type,
                                    token: userToken
                                });
                                //save user
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
//Login
const login = (req) => {
    //get email, password, type from req.body
    const { email, password, type } = req.body
    const validation = Object.keys(req.body).length
    //check body validations
    if (validation === 3) {
        //find user with given email and type
        return User.findOne({ email: email, type: type })
            .then((user) => {
                //if user not found
                if (!user) {
                    const error = new Error("Please try to login with correct Credentials");
                    error.statusCode = 400;
                    throw error;
                }
                //if user have not token
                else if (!user.token) {
                    const error = new Error("Not Authorized User");
                    error.statusCode = 400;
                    throw error;
                }
                else {
                    //varify password
                    try {
                        jwt.verify(user.token, SecretKey)
                        return bcrypt.compare(password, user.password)
                            .then((varify) => {
                                //if varification failed
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
//Check Token
const checkToken = (req) => {
    //get token from req.body
    const { token } = req.body
    //verify token
    try {
        jwt.verify(token, SecretKey)
        return { Authorization: `Bearer ${token}` }

    } catch (err) {
        const error = new Error("Not Authorized User");
        error.statusCode = 400;
        throw error;
    }
}
//Change Email
const changeEmail = (req) => {
    //Get email & new email from req.body
    const { email, newEmail } = req.body
    //Get token from req.header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    let userID;
    //verify token if verified successfully then decode it and get the userID
    jwt.verify(token, SecretKey, (err, decoded) => {
        if (err) {
            const error = new Error('Token is not valid');
            error.statusCode = 400;
            throw error;
        } else {
            userID = decoded.ID;
        }
    });
    //Find User by id
    return User.findById(userID)
        .then(data => {
            if (data.email === newEmail) {
                //if old and new email is same
                const error = new Error('Old and new email is Same');
                error.statusCode = 400;
                throw error;
            }
            else if (data.email !== email) {
                //if user entered incorrect old email
                const error = new Error('Enter Incorrect Email');
                error.statusCode = 400;
                throw error;
            }
            else if (data.email === email) {
                //if email is same as old email then find it and update
                return User.findOneAndUpdate(
                    {_id: userID},
                    { $set: { 'email': newEmail } },
                    { new: true }
                )
                    .then(() => {
                        console.log(userID)
                        console.log('Email updated successfully');
                    })
                    .catch((err) => {
                        const error = new Error('Error in Updating');
                        error.statusCode = 400;
                        throw error;
                    });
            }
        })
        .catch((err) => {
            throw err;
        })
}
//Change Password
const changePassword = (req) => {
    //Get password & new password from req.body
    const { password, newPassword } = req.body
    //Get token from req.header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    let userID;
    //verify token if verified successfully then decode it and get the userID
    jwt.verify(token, SecretKey, (err, decoded) => {
        if (err) {
            const error = new Error('Token is not valid');
            error.statusCode = 400;
            throw error;
        } else {
            userID = decoded.ID;
        }
    });
    //find user bu userID
    return User.findById(userID)
        .then((user) => {
            //Compare old password
            return bcrypt.compare(password, user.password)
                .then(data => {
                    //if password is incorrect
                    if (!data) {
                        const error = new Error("Incorrect Password");
                        error.statusCode = 400;
                        throw error;
                    }
                    //if password length is less than 8
                    else if (newPassword.length < 8) {
                        const error = new Error('Password should be atleast 8 digit');
                        error.statusCode = 403;
                        throw error;
                    }
                    //if old and new password is same
                    else if (password === newPassword) {
                        const error = new Error('Old & new Password is same');
                        error.statusCode = 403;
                        throw error;
                    }
                    //if there is no error in passwords then hash it and update the password
                    return bcrypt.genSalt(10)
                        .then((salt) => {
                            return bcrypt.hash(newPassword, salt)
                                .then((secPass) => {
                                    return User.findOneAndUpdate(
                                        {_id: userID},
                                        { $set: { 'password': secPass } },
                                        { new: true }
                                    )
                                        .then(() => {
                                            console.log('Password updated successfully');
                                        })
                                        .catch((err) => {
                                            throw err;
                                        });
                                }).catch((err) => { throw err });
                        }).catch((err) => { throw err });
                })
                .catch(err => {
                    throw err
                })
        })
        .catch(err => {
            throw err;
        })
}
//Delete Account
const deleteAccount = (req) => {
    //Get token from req.header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    let userID;
    //verify token if verified successfully then decode it and get the userID
    jwt.verify(token, SecretKey, (err, decoded) => {
        if (err) {
            const error = new Error('Token is not valid');
            error.statusCode = 400;
            throw error;
        } else {
            userID = decoded.ID;
        }
    });
    //find user bu userID and delete
    return User.findByIdAndDelete(userID)
        .then((user) => {
            //if user not found throw error
            if (!user) {
                const error = new Error('User not Found');
                error.statusCode = 403;
                throw error;
            }
            console.log("User Deleted")
        })
        .catch(err => {
            throw err;
        })
}

module.exports = { deleteAccount, checkToken, addUser, login, changeEmail, changePassword }