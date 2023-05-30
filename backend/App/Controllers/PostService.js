const Posts = require('../Models/PostModel')
const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken')
const SecretKey = 'MERNdeveloper'

const deletePost = (id) => {
    return Posts.findById(id)
        .then((idFound) => {
            if (!idFound) {
                const error = new Error('Post not found');
                error.statusCode = 404;
                throw error;
            }
            else {
                return Posts.deleteOne({ _id: id })
                    .then(() => { console.log("Post Deleted") })
                    .catch((error) => { throw error })
            }
        }).catch((error) => { throw error })
};

const addPost = (req) => {
    const { post } = req.body;
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    let userID;
    jwt.verify(token, SecretKey, (err, decoded) => {
        if (err) {
            throw err
        } else {
            userID = decoded.ID;
        }
    });
    return User.findById(userID)
        .then((user) => {
            const newPost = new Posts({
                user_id: userID,
                user_Name: user.name,
                post: post
            })
            return newPost.save()
                .then(() => console.log("Post Added"))
                .catch((error) => { throw error })
        })
        .catch(() => {
            const error = new Error('User Not Found');
            error.statusCode = 400;
            throw error;
        })
}
const updatePost = (req) => {
    const id = req.params.id
    const update = req.body
    const bodyValidation = Object.keys(req.body).length
    if (bodyValidation === 1) {
        return Posts.findById(id)
            .then((idFound) => {
                console.log(idFound)
                if (!idFound) {
                    const error = new Error('Post Not Found');
                    error.statusCode = 404;
                    throw error;
                }
                else {
                    update.date = Date.now()
                    return Posts.findByIdAndUpdate(id, update)
                        .then(() => console.log("Post Updated"))
                        .catch(err => { throw err })
                }

            }).catch((err) => { throw err; })
    }
}

const getPost = () => {
    return Posts.find().select(['_id', 'user_Name', 'post', 'comments'])
        .then((items) => {
            return items
        })
        .catch((err) => { throw err })
};


module.exports = { deletePost, addPost, updatePost, getPost };